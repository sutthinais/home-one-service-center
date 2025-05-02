"use client";
import { Tracking, TrackingSchema } from "@/schemas/TrackingSchema";
import liff from "@line/liff";
import axios from "axios";
// const baseURL = "http://192.168.64.92:4004";
const baseURL = "https://api-line-bot.homeone.co.th";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLiff = (
  liffId: string,
  setData: React.Dispatch<React.SetStateAction<Tracking[] | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
          if (!userProfile) throw "user is null";
          const response = await handleTrackShipment(
            "x",
            userProfile?.userId ?? ""
          );
          setData(response);
          // toast.success('เข้าสู่ระบบสำเร็จ');
        }
      } catch (err) {
        toast.success(`${err}`);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);

      }
    };

    initializeLiff();
  }, [liffId]);

  return { profile, isLoggedIn };
};

export const handleTrackShipment = async (
  billNumber: string,
  userId: string
): Promise<Tracking[]> => {
  var response_from_json: Tracking[] = [];
  if (!billNumber) {
    billNumber = "x";
  }

  try {
    const response = await fetch(
      `${baseURL}/api/line/getCurrentTruck?text=${billNumber}&userId=${userId}`
    );

    const data = await response.json();

    if (data.status !== 0) {
      throw `ไม่พบข้อมูล ${billNumber}`;
    }

    response_from_json = (data.data as []).map((e: any) =>
      TrackingSchema.parse(e)
    );
    if (response_from_json.length === 0) throw `ไม่พบข้อมูล ${billNumber}`;

    return response_from_json;
  } catch (error) {
    return [];
  }
};
