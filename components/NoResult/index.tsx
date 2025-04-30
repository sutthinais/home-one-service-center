"use client";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NoResultImg from "@/images/no-result.jpg";

type Props = {
  label?: string;
};

const MainContent = styled(Box)(
  () => `
    height: 100vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: "white";
      `
);

export default function NoResult({ label }: Props) {
  return (
    <MainContent bgcolor={"white"}>
      <Box textAlign={"center"}>
        <Image height={350} width={350} src={NoResultImg} alt="No Result" />
        <Typography color="text.secondary" mt={2} variant="h2">
          ขออภัย!
        </Typography>
        <Typography color="text.secondary" mt={1} variant="subtitle1">
          {label ? label : "เราไม่พบผลลัพธ์ของคุณ"}
        </Typography>
      </Box>
    </MainContent>
  );
}
