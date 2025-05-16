"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "../../../config";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const auth = getAuth(app);
  const router = useRouter();

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
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      if (!formattedPhoneNumber.match(/^\+\d{10,15}$/)) {
        alert(
          "Please enter a valid phone number with country code (e.g., +1234567890)"
        );
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
        router.push("/dashboard");
      } else {
        alert("OTP confirmation is not available. Please request a new OTP.");
      }
    } catch (error: any) {
      console.error(error);
      alert(`Failed to verify OTP: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!otpSent && <div id="recaptcha-container" className="w-full"></div>}

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter Phone Number with Country Code"
        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
      />

      {otpSent && (
        <input
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
        />
      )}

      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`w-full text-white py-3 rounded-md ${
          otpSent ? "bg-green-500" : "bg-blue-500"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
};

export default Login;
