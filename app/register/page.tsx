"use client";

import { CONFIG } from "@/config/dotenv";
import RegisterForm from "./components/RegisterForm";
import NotSupportDevice from "@/components/NotSupportDevice";
import { useLiff } from "./services/regisger_service";

const RegisterPage = () => {
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn } = useLiff(liffid);
  if (isLoggedIn === false) {
    return <NotSupportDevice />;
  } else {
    <RegisterForm prop={profile} />;
  }
};
export default RegisterPage;
