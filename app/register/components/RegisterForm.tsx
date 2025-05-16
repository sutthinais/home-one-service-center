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

  const requestOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountdown(60);
    startTrangition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError("Recaptcha not initialized");
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully");
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

        setError(errorMessage);
      }
    });
  };

  return (
    <div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            type="tel"
            placeholder="เบอร์โทรศัพท์ "
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </form>
      )}

      <Button
        disabled={!phoneNumber || isPending || resendCountdown > 0}
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
