import { useEffect, useState } from "react";
import liff from "@line/liff";
import { toast } from "react-toastify";

const useLiffProfile = (liffId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        toast.success(liffId);
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          setIsReady(false);
          throw new Error("not support external browser");
        }
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
        setIsReady(true);
        toast.success("เข้าสู่ระบบสำเร็จ");
      } catch (err) {
        console.error("LIFF error:", err);
        toast.error(`${err}`);
        setIsReady(false);
      }
    };

    initLiff();
  }, [liffId]);

  return { profile, isReady };
};

export default useLiffProfile;
