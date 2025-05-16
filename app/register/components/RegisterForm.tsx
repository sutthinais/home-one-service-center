"use client";

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import React, { useState, useEffect, useTransition, FocusEvent } from "react";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Loading from "./Loading";
import { set } from "date-fns";
import { toast } from "react-toastify";
import liff from "@line/liff";
import { CONFIG } from "@/config/dotenv";
import {
  findUserByIdService,
  registerUserByTaxId,
  useLiff,
} from "../services/regisger_service";

import { ShieldCheck } from "@phosphor-icons/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { OTP } from "@/components/Otp";
import { green } from "@mui/material/colors";

const RegisterForm = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPending, startTrangition] = useTransition();

  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn } = useLiff(liffid);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  useEffect(() => {
    const hasEnteredAllDigits = otp.length === 6;
    if (hasEnteredAllDigits) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    startTrangition(async () => {
      setError("");
      if (!confirmationResult) {
        setError("please request OTP first");
        return;
      }
      try {
        await confirmationResult.confirm(otp);
        if (!profile) throw "กรุณาเข้าระบบผ่านแอปพลิเคชั่นไลน์";
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
          throw new Error("ลงทะเบียนไม่สำเร็จกรุณาลองใหม่อีกครั้ง");
        }
      } catch (e: any) {
        setSuccess("");
        setOtp("");
        setError("OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  const requestOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountdown(60);
    startTrangition(async () => {
      setError("");
      setOtp("");
      setSuccess("");
      if (!recaptchaVerifier) {
        return setError("Recaptcha not initialized");
      }
      try {
        const user = await findUserById();
        if (!user) throw new Error("ไม่พบข้อมูลผู้ใช้ กรุณาลองใหม่อีกครั้ง");

        const formattedPhoneNumber = phoneNumber.startsWith("0")
          ? phoneNumber.slice(1)
          : phoneNumber;
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          `+66${formattedPhoneNumber}`,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("ส่ง OTP สำเร็จ กรุณาตรวจสอบ SMS");
      } catch (e: any) {
        // setError(e.message);
        setSuccess("");
        setResendCountdown(0);
        let errorMessage = "";
        if (e.code === "auth/invalid-phone-number") {
          errorMessage = "หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
        } else if (e.code === "auth/missing-phone-number") {
          errorMessage = "กรุณากรอกหมายเลขโทรศัพท์";
        } else if (e.code === "auth/too-many-requests") {
          errorMessage =
            "คุณทำรายการบ่อยเกินไป กรุณาลองใหม่อีกครั้งในอีก 5 นาที";
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
        } else {
          errorMessage = "เกิดข้อผิดพลาดในการส่ง OTP กรุณาลองใหม่อีกครั้ง";
        }
        // alert(e.message);
        setError(errorMessage);
      }
    });
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

  const handleOTPChange = (e: React.SetStateAction<string>) => {
    setOtp(e);
    setError(null); // ล้าง error เมื่อผู้ใช้พิมพ์ OTP
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: { sm: 1000, md: 800 },
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <CardHeader
          avatar={<ShieldCheck size={40} color={green[500]} />}
          title={
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              กรุณาระบุหมายเลขโทรศัพท์ของคุณ (ที่ลงทะเบียนไว้กับ บริษัท
              ศิริมหาชัย โฮมเซ็นเตอร์ จำกัด)
            </Typography>
          }
          // subheader={
          //   <Typography
          //     variant="body2"
          //     color="text.secondary"
          //     textAlign="center"
          //   >
          //     กรุณากรอกหมายเลขโทรศัพท์ที่ลงทะเบียนกับ HomeOne <br />
          //     เราจะส่งรหัสยืนยันไปยังหมายเลขโทรศัพท์ของคุณ
          //   </Typography>
          // }
          sx={{
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            paddingBottom: 0,
          }}
        />
        <CardContent
          sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 3 }}
        >
          {!confirmationResult ? (
            <Box
              component="form"
              onSubmit={requestOtp}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                type="tel"
                label="หมายเลขโทรศัพท์ (10 หลัก)"
                value={phoneNumber}
                inputProps={{ maxLength: 10 }}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                variant="outlined"
                error={phoneNumber.length > 0 && phoneNumber.length < 10}
                helperText={
                  phoneNumber.length > 0 && phoneNumber.length < 10
                    ? "กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก"
                    : ""
                }
              />
              <Button
                type="submit"
                disabled={!phoneNumber || isPending || phoneNumber.length < 10}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: 50,
                  fontSize: "1.1rem",
                  borderRadius: 1,
                  backgroundColor: "teal",
                  "&:hover": { backgroundColor: "#00695c" },
                }}
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "ขอรหัส OTP"
                )}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                กรุณากรอกรหัส OTP ที่ส่งไปยัง{"  "}
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {phoneNumber}
                </Typography>
                {/* <Typography typography={span}>{phoneNumber}</Typography> */}
              </Typography>
              <OTP
                value={otp}
                onChange={handleOTPChange}
                separator=""
                length={6}
              />
              <Button
                disabled={isPending || resendCountdown > 0}
                onClick={() => requestOtp()}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: 50,
                  fontSize: "1.1rem",
                  borderRadius: 1,
                  backgroundColor: "teal",
                  "&:hover": { backgroundColor: "#00695c" },
                }}
              >
                {resendCountdown > 0 ? (
                  `ส่ง OTP อีกครั้งใน ${resendCountdown} วินาที`
                ) : isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "ส่ง OTP อีกครั้ง"
                )}
              </Button>
            </Box>
          )}
          {error && (
            <Typography variant="body2" color="error" textAlign="center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="success.main" textAlign="center">
              {success}
            </Typography>
          )}
          <div id="recaptcha-container" />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
