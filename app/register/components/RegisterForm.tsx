"use client";

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import React, { useState, useEffect, useTransition, FocusEvent } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        setError("OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  const requestOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountdown(60);
    startTrangition(async () => {
      setError("");
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

  return (
    <div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            type="tel"
            placeholder="เบอร์โทรศัพท์ "
            value={phoneNumber}
            maxLength={10}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </form>
      )}

      {confirmationResult && (
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value: string) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            {/* <InputOTPSeparator /> */}
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
      <Button
        disabled={
          !phoneNumber ||
          isPending ||
          resendCountdown > 0 ||
          phoneNumber.length < 10
        }
        onClick={() => requestOtp()}
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}s`
          : isPending
          ? `Sending OTP...`
          : `Request OTP`}
      </Button>
      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <Loading open={isPending} />
      <div id="recaptcha-container" />
    </div>
  );
};

export default RegisterForm;
