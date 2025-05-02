"use client";

import { useEffect, useState, useTransition } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/firebase";
import { OTP } from "@/components/Otp";
import Grid from "@mui/material/Grid2";
import { grey, red, teal } from "@mui/material/colors";
import Loading from "./Loading";
import { ShieldCheck } from "@phosphor-icons/react";

import React from "react";
import {
  findUserByIdService,
  registerUserByTaxId,
  useLiff,
} from "../services/regisger_service";
import liff from "@line/liff";
import { CONFIG } from "@/config/dotenv";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const routeer = useRouter();
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn } = useLiff(liffid);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendContdown, setResendCountdown] = useState(0);

  const [recapchVerifier, setRecapchVerifier] =
    useState<RecaptchaVerifier | null>(null);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendContdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendContdown]);

  useEffect(() => {
    const recapchVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    setRecapchVerifier(recapchVerifier);
  }, []);

  useEffect(() => {
    const hashEnterAllDigits = otp.length === 6;
    if (hashEnterAllDigits) {
      verifyOtp();
    }
  }, [otp]);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const requestOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      if (phoneNumber.length !== 10) throw new Error("Invalid phone number");
      await delay(2000);
      const user = await findUserById();
      if (!user) throw new Error("User not found");

      if (!recapchVerifier) {
        throw new Error("recapchVerifier is not initialized");
      } else {
        recapchVerifier.clear();
      }

      // ตรวจสอบหมายเลขโทรศัพท์และปรับรูปแบบ
      const formattedPhoneNumber = phoneNumber.startsWith("0")
        ? phoneNumber.slice(1)
        : phoneNumber;

      const newRecapchVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      await newRecapchVerifier.render();
      setRecapchVerifier(newRecapchVerifier);

      // ส่ง OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+66${formattedPhoneNumber}`,
        newRecapchVerifier
      );

      setConfirmationResult(confirmationResult);
      setResendCountdown(60);
    } catch (e: any) {
      setResendCountdown(0);
      if (e.code === "auth/invalid-phone-number") {
        setError("หมายเลขโทรศัพท์ไม่ถูกต้อง");
      } else if (e.code === "auth/too-many-requests") {
        setError("Too many requests");
      } else if (e.message === "User not found") {
        setError("ท่านไม่ได้เป็นสมาชิก กรุณาติดต่อโฮมวันใกล้บ้านคุณ");
      } else {
        setError("ส่ง OTP ไม่สำเร็จ กรุณาลองอีกครั้งในภายหลัง");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    setLoading(true);
    startTransition(async () => {
      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }
    });

    try {
      await confirmationResult?.confirm(otp);
      routeer.refresh();
      var response = await registerUserByTaxId(
        phoneNumber,
        profile?.userId ?? ""
      );
      if (response.status === 200) {
        if (response.data.status === 1)
          throw new Error(`${response.data.message}`);
        toast.success("ลงทะเบียนสำเร็จ");
        liff.closeWindow();
      } else {
        throw response;
      }
    } catch (error) {
      setError(`ยืนยันรหัส OTP ไม่สำเร็จ กรุณาลองอีกครั้ง. ${error}`);
    } finally {
      setLoading(false);
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
      <Loading open={loading} />
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
                  // borderRadius: 2,
                  // border: `1px solid ${grey[400]}`,
                }}
              >
                {/* <Typography color={`${grey[700]}`}>+66 </Typography> */}
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
              ข้อความพร้อมรหัส 6 หลักได้ถูกส่งไปยัง 0{phoneNumber}
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
          onClick={requestOtp}
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
            : isPending
            ? "กำลังขอรหัส OTP..."
            : `ขอรหัส OTP`}
        </Button>
        <div id="recaptcha-container" />
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
