import React from "react";
import ContentInvoice from "./components/ContentInvoice";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeone | ยอดรอชำระที่กำลังจะถึง",
  description: "เว็บไซต์สำหรับบริการลูกค้า",
  keywords: "เว็บไซต์สำหรับบริการลูกค้า",
};

export default function page() {
  return (
    <Container
      sx={{
        bgcolor: "#ffff",
      }}
    >
      <ContentInvoice />
    </Container>
  );
}
