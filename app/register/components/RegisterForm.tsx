"use client";

import React from "react";

import useLiff from "../services/regisger_service";
import { CONFIG } from "@/config/dotenv";

const RegisterForm = () => {
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn, error } = useLiff(liffid);

  if (error) return <p>Error: {error}</p>;
  if (!isLoggedIn) return <p>Logging in...</p>;

  return (
    <div>
      <h1>Welcome, {profile?.displayName}!</h1>
      <img src={profile?.pictureUrl} alt="Profile" width={100} />
    </div>
  );
};

export default RegisterForm;
