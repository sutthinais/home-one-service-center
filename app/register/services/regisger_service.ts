"use client";
import liff from "@line/liff";
import axios from "axios";
// const baseURL = "http://192.168.64.92:4004";
const baseURL = "https://api-line-bot.homeone.co.th";
import { useEffect, useState } from "react";

export const useLiff = (liffId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          // liff.login();
          throw "not support external browser";
        } else {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    initializeLiff();
  }, [liffId]);

  return { profile, isLoggedIn };
};

export const registerUserByTaxId = async (taxId: string, user_id: string) => {
  try {
    return await axios.post(
      `${baseURL}/api/line/registerRichMenuToUser?tax_id=${taxId}&user_id=${user_id}`
    );
  } catch (error) {
    throw error;
  }
};

export const findUserByIdService = async (phone_number: string) => {
  try {
    return await axios.get(
      `${baseURL}/api/line/findUserByIdController?phone_number=${phone_number}`
    );
  } catch (error) {
    throw error;
  }
};

// export const getEnvironmentLine = async (): Promise<string> => {
//     try {
//         if (await liff.isLoggedIn()) {
//             var user = await liff.getProfile();
//             if (!user) throw 'e';
//             return user.userId;
//         } else {
//             throw 'e';
//         }

//     } catch (error) {
//         throw "is not login";
//     }
// }
