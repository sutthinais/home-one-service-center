import { useEffect, useState } from "react";
import liff from "@line/liff";
import { toast } from "react-toastify";

const useLiffProfile = (liffId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          setIsReady(false);
          liff.login();
          throw new Error("not support external browser");
        }
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
        setIsReady(true);
        toast.success(`ยินดีต้อนรับคุณ ${userProfile.displayName}!`);
      } catch (err) {
        toast.error(`${err}`);
        console.error("LIFF error:", err);
        setIsReady(false);
      }
    };

    initLiff();
  }, [liffId]);

  return { profile, isReady };
};

export default useLiffProfile;
