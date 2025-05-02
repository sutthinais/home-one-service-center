import { useEffect, useState } from "react";
import liff from "@line/liff";
import { toast } from "react-toastify";

const useLiffProfile = (liffId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          // liff.login();
          throw "not support external browser";
        } else {
          const userProfile = await liff.getProfile();
          if (!userProfile) throw "user is null";
          setProfile(userProfile);
          setIsReady(true);
          toast.success(`ยินดีตอนรับ คุณ ${userProfile?.displayName}`);
        }
      } catch (err) {
        // toast.error(`${err}`);
        setIsReady(false);
      }
    };

    initializeLiff();

  }, [liffId]);

  return { profile, isReady };
};

export default useLiffProfile;
