"use client";
import React, { useState, useEffect, useRef, useTransition } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "../../../config";
import { useRouter } from "next/navigation";
import { findUserByIdService, useLiff } from "../services/regisger_service";
import { CONFIG } from "@/config/dotenv";
import { OTP } from "@/components/Otp";
import Grid from "@mui/material/Grid2";
import { grey, red, teal } from "@mui/material/colors";
import Loading from "./Loading";
import { ShieldCheck } from "@phosphor-icons/react";

const RegisterForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const [resendContdown, setResendCountdown] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const router = useRouter();
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn } = useLiff(liffid);

  useEffect(() => {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
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
        setResendCountdown((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      setOtpExpired(true);
    }
    return () => clearTimeout(timer);
  }, [resendContdown]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await findUserById();
      if (!user) throw new Error("User not found");
      let formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      if (formattedPhoneNumber.startsWith("0")) {
        formattedPhoneNumber = formattedPhoneNumber.replace("0", "+66");
      }

      if (!formattedPhoneNumber.match(/^\+\d{10,15}$/)) {
        alert("Please enter  phone number 0123456789");
        return;
      }
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaVerifierRef.current!
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error: any) {
      console.error(error);
      alert(`Failed to send OTP: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        setOtp("");
        alert("OTP confirmed successfully");
        // router.push("/dashboard");
      } else {
        alert("OTP confirmation is not available. Please request a new OTP.");
      }
    } catch (e: any) {
      setResendCountdown(0);
      if (e.code === "auth/invalid-phone-number") {
        setError("หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
      } else if (e.code === "auth/missing-phone-number") {
        setError("กรุณากรอกหมายเลขโทรศัพท์");
      } else if (e.code === "auth/too-many-requests") {
        setError("คุณทำรายการบ่อยเกินไป กรุณาลองใหม่อีกครั้งในอีก 5 นาที");
      } else if (e.code === "auth/quota-exceeded") {
        setError("มีการส่ง OTP เกินจำนวนที่กำหนด กรุณาลองใหม่ในภายหลัง");
      } else if (e.code === "auth/code-expired") {
        setError("รหัส OTP หมดอายุ กรุณาขอรหัสใหม่");
      } else if (e.code === "auth/invalid-verification-code") {
        setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      } else if (e.code === "auth/missing-verification-code") {
        setError("กรุณากรอกรหัส OTP");
      } else if (e.code === "auth/missing-verification-id") {
        setError("ไม่พบข้อมูลการยืนยัน กรุณาทำรายการใหม่อีกครั้ง");
      } else if (e.code === "auth/app-not-authorized") {
        setError(
          "แอปนี้ยังไม่ได้รับอนุญาตใช้งานเบอร์โทร กรุณาติดต่อผู้ดูแลระบบ"
        );
      } else if (e.code === "auth/network-request-failed") {
        setError(
          "ไม่สามารถเชื่อมต่อเครือข่ายได้ กรุณาตรวจสอบอินเทอร์เน็ตของคุณ"
        );
      } else if (e.code === "auth/captcha-check-failed") {
        setError("การตรวจสอบความปลอดภัยล้มเหลว กรุณาลองใหม่อีกครั้งในภายหลัง");
      } else if (e.message === "User not found") {
        setError("ท่านไม่ได้เป็นสมาชิก กรุณาติดต่อโฮมวันใกล้บ้านคุณ");
      } else if (e.code === "auth/invalid-app-credential") {
        setError("กรอกหมายเลขท์ไม่ถูกต้อง");
      } else {
        setError(
          `ส่ง OTP ไม่สำเร็จ กรุณาลองอีกครั้งในภายหลัง (${e} ${e.code})`
        );
      }
      alert(`Failed to verify OTP: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const findUserById = async (): Promise<string | null> => {
    let userId = null;

    try {
      var response = await findUserByIdService(phoneNumber);
      if (response.status === 200) {
        if (response.data.status === 1)
          throw new Error(`${response.data.message}`);
        userId = response.data.data;
        return userId;
      } else {
        throw "error";
      }
    } catch (e: any) {
      return null;
    }
  };

  useEffect(() => {
    const hashEnterAllDigits = otp.length === 6;
    if (hashEnterAllDigits) {
      handleOTPSubmit();
    }
  }, [otp]);

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
              sx={{
                alignContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box flex={1}>
                <Typography
                  align="left"
                  sx={{ fontSize: "1rem", textAlign: "left" }}
                >
                  หมายเลขโทรศัพท์
                </Typography>
              </Box>
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
                <TextField
                  type="tel"
                  variant="outlined"
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  sx={{
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  required
                  disabled={true}
                  value="+66 "
                ></TextField>
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

                  // backgroundColor: "blue",
                }}
              >
                <TextField
                  type="tel"
                  variant="outlined"
                  required
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                  }
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

        {confirmationResult && (
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
              <OTP value={otp} onChange={setOtp} separator="" length={6} />
            </Stack>
          </Stack>
        )}
        {error && (
          <Typography variant="body2" mt={3} color={red[700]}>
            {" "}
            {error}
          </Typography>
        )}
        {/* size={{ xs: 11, md: 7 }} */}
        <Button
          onClick={handleSendOtp}
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 0 }}
          type="button"
          disabled={
            !phoneNumber || phoneNumber.length !== 10 || resendContdown > 0
          }
        >
          {resendContdown > 0
            ? `ขอรหัส OTP อีกครั้งใน ${resendContdown} วินาที`
            : otpSent
            ? "กำลังขอรหัส OTP..."
            : `ขอรหัส OTP`}
        </Button>
        <div id="recaptcha-container" />
      </Grid>
    </Grid>
  );

  // return (
  //   <div className="flex flex-col items-center justify-center space-y-4">
  //     {!otpSent && <div id="recaptcha-container" className="w-full"></div>}

  //     <input
  //       type="tel"
  //       value={phoneNumber}
  //       onChange={handlePhoneNumberChange}
  //       placeholder="Enter Phone Number with Country Code"
  //       className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
  //     />

  //     {otpSent && (
  //       <input
  //         type="text"
  //         value={otp}
  //         onChange={handleOTPChange}
  //         placeholder="Enter OTP"
  //         className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
  //       />
  //     )}

  //     <button
  //       onClick={otpSent ? handleOTPSubmit : handleSendOtp}
  //       className={`w-full text-white py-3 rounded-md ${
  //         otpSent ? "bg-green-500" : "bg-blue-500"
  //       } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
  //       disabled={isLoading}
  //     >
  //       {isLoading ? "Processing..." : otpSent ? "Submit OTP" : "Send OTP"}
  //     </button>
  //   </div>
  // );
};
export default RegisterForm;
