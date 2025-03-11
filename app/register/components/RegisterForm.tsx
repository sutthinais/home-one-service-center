"use client";

import React from "react";

import useLiff from "../services/regisger_service";
import { CONFIG } from "@/config/dotenv";

const RegisterForm = () => {
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn, error } = useLiff(liffid);

  if (error)
    return (
      <div>
        <p>liffid: {liffid}</p>
        <p>Error: {error}</p>
      </div>
    );
  if (!isLoggedIn)
    return (
      <div>
        <p>liffid: {liffid}</p>
        <p>Logging in...</p>
      </div>
    );

  return (
    <div>
      <h1>Welcome, {profile?.displayName}!</h1>
      <img src={profile?.pictureUrl} alt="Profile" width={100} />
    </div>
  );
};

export default RegisterForm;
