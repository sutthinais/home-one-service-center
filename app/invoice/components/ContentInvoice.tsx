"use client";

import { CreditWaitingArcustomer } from "@/app/service/InvoiceService";
import { IApiResponse } from "@/app/types/IApiResponse";
import { IData } from "@/app/types/IBillingTransaction ";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { fNumber } from "@/utils/format-number";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableInvoice from "./TableInvoice";
import Loading from "@/app/register/components/Loading";
import useLiffProfile from "@/app/hook/useLiffProfile";
import { CONFIG } from "@/config/dotenv";
import { redirect } from "next/navigation";
import { fDateJs, fTime } from "@/utils/format-time";

const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";

export default function ContentInvoice() {
  const newDate = new Date();
  const [rows, setRows] = useState<IData[]>([]);

  const { profile, isReady } = useLiffProfile(liffid);
  if (!isReady) {
    return redirect("/no-result");
  }
  const { error, data, isFetching } = useQuery<IApiResponse>({
    queryFn: () => CreditWaitingArcustomer(profile!.userId),
    queryKey: ["CreditWaiting", profile?.userId],
    enabled: isReady && !!profile,
    gcTime: 0,
  });

  // const { error, data, isFetching } = useQuery<IApiResponse>({
  //   queryFn: () => CreditWaitingArcustomer("U9c35e388d140d7173c08374ca65cc035"),
  //   queryKey: ["CreditWaiting"],
  //   gcTime: 0,
  // });

  useEffect(() => {
    if (data) {
      const { status, message, data: items } = data;
      if (status !== 0) {
        toast.error(message);
        return redirect("/no-result");
      }
      if (items.length === 0) {
        return redirect("/no-result");
      }

      setRows(items);
    }
    if (error) {
      toast.error(`เกิดข้อผิดพลาด, กรุณาลองใหม่ภายหลัง`);
      return redirect("/no-result");
    }
  }, [data, error]);

  if (isFetching) {
    return <Loading open={isFetching} />;
  }

  return (
    <Box>
      <Stack mb={5}>
        <Typography textAlign={"center"} mt={3} variant="h2">
          ยอดรอชำระที่กำลังจะถึง
        </Typography>
        <Typography
          sx={{
            color: "gray",
          }}
          variant="caption"
          textAlign={"center"}
        >
          ข้อมูล ณ วันที่ {fDateJs(newDate)} เวลา {fTime(newDate)} น.
        </Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "#ffff",
        }}
      >
        <Divider />

        <Stack
          sx={{
            ml: 2,
            mt: 2,
          }}
        >
          <Typography>เรียนลูกค้า: {rows[0]?.ar_name}</Typography>
          <Typography
            sx={{
              color: "gray",
            }}
          >
            รหัสลูกค้า: {rows[0]?.ar_code} กลุ่มลูกค้า: {rows[0]?.ar_group_name}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {rows &&
            rows.map((s) => (
              <Accordion
                defaultExpanded
                disableGutters
                key={s.branch_code}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Stack>
                    <Typography variant="h6">{s.branch_name}</Typography>
                    <Typography variant="h6" color="error">
                      ({fNumber(s.sum_debt_amount)})
                    </Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    p: 0,
                  }}
                >
                  <Box
                    mb={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  ></Box>
                  <TableInvoice rows={s.detail} />
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
      </Box>

      <Box
        mt={2}
        sx={{
          height: "5vh",
        }}
      >
        <Typography>หมายเหตุ</Typography>
        <Typography color="text.secondary" variant="caption">
          กรณีที่ปรากฎว่าข้อมูลในเอกสารฉบับนี้ไม่ตรงกับข้อมูลในระบบของบริษัท
          ให้ถือว่าข้อมูลในระบบของบริษัท เป็นข้อมูลที่ถูกต้อง
          หากต้องการเอกสารฉบับที่มีการรับรองโดยบริษัท
          กรุณาติดต่อได้ที่ทุกสาขาของบริษัท
        </Typography>
      </Box>
    </Box>
  );
}
