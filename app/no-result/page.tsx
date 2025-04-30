import NoResult from "@/components/NoResult";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Homeone | เราไม่พบผลลัพธ์ของคุณ",
  description: "เว็บไซต์สำหรับบริการลูกค้า",
  keywords: "เว็บไซต์สำหรับบริการลูกค้า",
};

export default function Page() {
  return (
    <div>
      <NoResult />
    </div>
  );
}
