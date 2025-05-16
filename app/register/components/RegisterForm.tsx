"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  findUserByIdService,
  registerUserByTaxId,
  useLiff,
} from "../services/regisger_service";
import { CONFIG } from "@/config/dotenv";
import { OTP } from "@/components/Otp";
import Grid from "@mui/material/Grid2";
import { grey, red, teal } from "@mui/material/colors";
import Loading from "./Loading";
import { ShieldCheck } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import liff from "@line/liff";

const RegisterForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendContdown, setResendCountdown] = useState<number>(0);
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const auth = getAuth(app);
  auth.languageCode = "th";
  const router = useRouter();
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn } = useLiff(liffid);

  useEffect(() => {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          toast.info("ผ่านการตรวจสอบความปลอดภัย");
        },
        "expired-callback": () => {},
      }
    );

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [auth]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendContdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setOtpExpired(true);
    }
    return () => clearInterval(timer);
  }, [resendContdown]);

  useEffect(() => {
    const hasEnteredAllDigits = otp.length === 6;
    if (hasEnteredAllDigits && confirmationResult && !isLoading) {
      handleOTPSubmit();
    }
  }, [otp, confirmationResult, isLoading]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""));
    setError(null); // ล้าง error เมื่อผู้ใช้พิมพ์
  };

  const handleOTPChange = (e: React.SetStateAction<string>) => {
    setOtp(e);
    setError(null); // ล้าง error เมื่อผู้ใช้พิมพ์ OTP
  };

  const findUserById = async (): Promise<string | null> => {
    try {
      const response = await findUserByIdService(phoneNumber);
      console.log("findUserByIdService response:", response);
      if (response.status === 200) {
        if (response.data.status === 1) {
          throw new Error(`${response.data.message}`);
        }
        const userId = response.data.data;
        return userId;
      } else {
        throw new Error("Invalid response status");
      }
    } catch (e: any) {
      console.error("findUserById error:", e);
      return null;
    }
  };

  const handleSendOtp = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const user = await findUserById();
      if (!user) throw new Error("User not found");

      const formattedPhoneNumber = phoneNumber.startsWith("0")
        ? phoneNumber.slice(1)
        : phoneNumber;

      const verifier = recaptchaVerifierRef.current;
      if (!verifier) throw new Error("Recaptcha verifier not initialized");

      await verifier.render().catch((error) => {
        throw new Error(`reCAPTCHA failed to load: ${error.message}`);
      });

      toast.success(`send otp to +66${formattedPhoneNumber}`);
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+66${formattedPhoneNumber}`,
        verifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      setResendCountdown(300);
    } catch (e: any) {
      setResendCountdown(0);
      let errorMessage = "เกิดข้อผิดพลาดในการส่ง OTP";
      if (e.code === "auth/invalid-phone-number") {
        errorMessage = "หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
      } else if (e.code === "auth/missing-phone-number") {
        errorMessage = "กรุณากรอกหมายเลขโทรศัพท์";
      } else if (e.code === "auth/too-many-requests") {
        errorMessage = "คุณทำรายการบ่อยเกินไป กรุณาลองใหม่อีกครั้งในอีก 5 นาที";
      } else if (e.code === "auth/quota-exceeded") {
        errorMessage = "มีการส่ง OTP เกินจำนวนที่กำหนด กรุณาลองใหม่ในภายหลัง";
      } else if (e.code === "auth/code-expired") {
        errorMessage = "รหัส OTP หมดอายุ กรุณาขอรหัสใหม่";
      } else if (e.code === "auth/invalid-verification-code") {
        errorMessage = "รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง";
      } else if (e.code === "auth/missing-verification-code") {
        errorMessage = "กรุณากรอกรหัส OTP";
      } else if (e.code === "auth/missing-verification-id") {
        errorMessage = "ไม่พบข้อมูลการยืนยัน กรุณาทำรายการใหม่อีกครั้ง";
      } else if (e.code === "auth/app-not-authorized") {
        errorMessage =
          "แอปนี้ยังไม่ได้รับอนุญาตใช้งานเบอร์โทร กรุณาติดต่อผู้ดูแลระบบ";
      } else if (e.code === "auth/network-request-failed") {
        errorMessage =
          "ไม่สามารถเชื่อมต่อเครือข่ายได้ กรุณาตรวจสอบอินเทอร์เน็ตของคุณ";
      } else if (e.code === "auth/captcha-check-failed") {
        errorMessage =
          "การตรวจสอบความปลอดภัยล้มเหลว กรุณาลองใหม่อีกครั้งในภายหลัง";
      } else if (e.code === "auth/invalid-app-credential") {
        errorMessage =
          "การกำหนดค่าแอปไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า Firebase";
      } else if (e.message === "User not found") {
        errorMessage = "ท่านไม่ได้เป็นสมาชิก กรุณาติดต่อโฮมวันใกล้บ้านคุณ";
      }
      setError(errorMessage);
      console.error("Send OTP error:", e);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        setOtp("");

        try {
          const response = await registerUserByTaxId(
            phoneNumber,
            profile?.userId ?? ""
          );
          if (response.status === 200) {
            if (response.data.status === 1) {
              throw new Error(`${response.data.message}`);
            }
            toast.success("ลงทะเบียนสำเร็จ");
            liff.closeWindow();
          } else {
            throw new Error("Registration failed");
          }
        } catch (error: any) {
          setError(`ยืนยันรหัส OTP ไม่สำเร็จ: ${error.message}`);
          toast.error(`Registration failed: ${error.message}`);
        }
      } else {
        setError(
          "OTP confirmation is not available. Please request a new OTP."
        );
        toast.error("OTP confirmation is not available.");
      }
    } catch (e: any) {
      setResendCountdown(0);
      let errorMessage = "เกิดข้อผิดพลาดในการยืนยัน OTP";
      if (e.code === "auth/invalid-verification-code") {
        errorMessage = "รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง";
      } else if (e.code === "auth/code-expired") {
        errorMessage = "รหัส OTP หมดอายุ กรุณาขอรหัสใหม่";
      } else if (e.code === "auth/invalid-app-credential") {
        errorMessage =
          "การกำหนดค่าแอปไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า Firebase";
      }
      setError(errorMessage);
      console.error("Verify OTP error:", e);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid
      container
      size={{ xs: 11, md: 7 }}
      sx={{
        backgroundColor: grey[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loading open={isLoading} />
      <Grid
        size={{ xs: 11, md: 7 }}
        p={4}
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        flexDirection={"column"}
      >
        {!confirmationResult && (
          <Stack
            sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            spacing={1}
          >
            <Box
              sx={{
                height: "50px",
                width: "50px",
                backgroundColor: `${teal[100]}`,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <ShieldCheck size={25} color={teal[600]} />
            </Box>
            <Typography align="left" sx={{ fontSize: "1.3rem" }}>
              กรุณาระบุหมายเลขโทรศัพท์ของคุณ (ที่ลงทะเบียนไว้กับโฮมวัน)
            </Typography>
            <Typography
              py={1}
              align="left"
              sx={{ fontSize: "0.95rem", color: grey[600] }}
            >
              กรุณากรอกหมายเลขโทรศัพท์ที่เชื่อมโยงกับอุปกรณ์ของคุณ
              เราจะส่งรหัสยืนยันไปยังหมายเลขโทรศัพท์มือถือของคุณเมื่อคุณเข้าสู่ระบบ
            </Typography>
            <Stack
              display={"flex"}
              direction={"row"}
              sx={{ alignContent: "space-between", alignItems: "center" }}
            >
              {/* <Box flex={1}>
                <Typography align="left" sx={{ fontSize: '1rem', textAlign: 'left' }}>
                  หมายเลขโทรศัพท์
                </Typography>
              </Box> */}
            </Stack>
            <Stack
              display={"flex"}
              direction={"row"}
              alignItems={"center"}
              height={"55px"}
            >
              <Box
                flex={1}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: 55, textAlign: "center" }}
                >
                  +66
                </Button>
              </Box>
              <Box sx={{ width: 5 }}></Box>
              <Box
                flex={4}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  type="tel"
                  variant="outlined"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="000-000-0000"
                  fullWidth
                  inputProps={{
                    maxLength: 10,
                    pattern: "[0-9]*",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        )}

        {otpSent && (
          <Stack
            sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            spacing={1}
            pt={4}
          >
            <Box
              sx={{
                height: "50px",
                width: "50px",
                backgroundColor: `${teal[100]}`,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <ShieldCheck size={25} color={teal[600]} />
            </Box>
            <Typography align="left" sx={{ fontSize: "1.3rem" }}>
              ป้อนรหัสยืนยัน
            </Typography>
            <Typography
              py={1}
              align="left"
              sx={{ fontSize: "1rem", color: grey[600] }}
            >
              ข้อความพร้อมรหัส 6 หลักได้ถูกส่งไปยัง{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                {phoneNumber}
              </Typography>
              การดำเนินการดังกล่าว
              ช่วยให้เราสามารถรักษาความปลอดภัยของบัญชีของคุณได้โดยการยืนยันว่าเป็นคุณจริงๆ
            </Typography>
            <Stack
              display={"flex"}
              direction={"row"}
              alignContent={"center"}
              alignItems={"center"}
              justifyContent={"center"}
              py={3}
            >
              <OTP
                value={otp}
                onChange={handleOTPChange}
                separator=""
                length={6}
              />
            </Stack>
          </Stack>
        )}
        {error && (
          <Typography variant="body2" mt={3} color={red[700]}>
            {error}
          </Typography>
        )}
        <Button
          onClick={handleSendOtp}
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 0, height: 55 }}
          type="button"
          disabled={
            !phoneNumber || phoneNumber.length !== 10 || resendContdown > 0
          }
        >
          {resendContdown > 0
            ? `ขอรหัส OTP อีกครั้งใน ${resendContdown} วินาที`
            : otpSent
            ? "กำลังขอรหัส OTP..."
            : "ขอรหัส OTP"}
        </Button>
        {!otpSent && <Box id="recaptcha-container"></Box>}
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
