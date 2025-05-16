"use client";

import { CreditWaitingArcustomer } from "@/app/service/InvoiceService";
import { IApiResponse } from "@/app/types/IApiResponse";
import { IData } from "@/app/types/IBillingTransaction ";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Loading from "@/app/register/components/Loading";
import useLiffProfile from "@/app/hook/useLiffProfile";
import { CONFIG } from "@/config/dotenv";
import { redirect } from "next/navigation";
import { fDateJs, fTime } from "@/utils/format-time";
import DataGridInvoice from "./DataGridInvoice";

const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID_INVOICE || "";

export default function ContentInvoice() {
  const newDate = new Date();
  const [rows, setRows] = useState<IData[]>([]);
  // const profile = true;
  // const isReady = true;
  // const { error, data, isFetching } = useQuery<IApiResponse>({
  //   queryFn: () => CreditWaitingArcustomer("U9c35e388d140d7173c08374ca65cc035"),
  //   queryKey: ["CreditWaiting"],
  //   gcTime: 0,
  // });

  const { profile, isReady } = useLiffProfile(liffid);
  const { error, data, isFetching } = useQuery<IApiResponse>({
    queryFn: () => CreditWaitingArcustomer(profile?.userId),
    queryKey: ["CreditWaiting", profile?.userId],
    enabled: isReady && !!profile,
    gcTime: 0,
  });

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
      toast.error(`${error}`);
      return redirect("/no-result");
    }
  }, [data, error, isReady]);

  if (isFetching) {
    return <Loading open={isFetching} />;
  }

  return (
    profile && (
      <Box>
        <Stack>
          <Typography textAlign={"center"} mt={4} variant="h2">
            ยอดรอชำระที่กำลังจะถึง
          </Typography>
          <Typography textAlign={"center"}>
            เรียนลูกค้า: {rows[0]?.ar_name}
          </Typography>
          <Typography textAlign={"center"}>
            รหัสลูกค้า: {rows[0]?.ar_code} กลุ่มลูกค้า: {rows[0]?.ar_group_name}
          </Typography>
          <Typography textAlign={"center"}></Typography>
        </Stack>
        <Typography
          sx={{
            color: "text.secondary",
            mt: 0,
          }}
          // variant="caption"
          fontSize={"0.65rem"}
          textAlign={"center"}
        >
          ข้อมูล ณ วันที่ {fDateJs(newDate)} เวลา {fTime(newDate)} น.
        </Typography>

        <Box
          mt={5}
          sx={{
            bgcolor: "#ffff",
          }}
        >
          <Divider />

          <Stack spacing={2} mt={2}>
            {rows &&
              rows.map((s) => (
                // <Accordion
                //   defaultExpanded
                //   disableGutters
                //   key={s.branch_code}
                //   elevation={0}
                // >
                //   <AccordionSummary
                //     expandIcon={<ExpandMore />}
                //     aria-controls="panel1-content"
                //     id="panel1-header"
                //   >
                //     <Stack>
                //       <Typography variant="h6">{s.branch_name}</Typography>
                //       <Typography variant="h6" color="error">
                //         ({fNumber(s.sum_debt_amount)})
                //       </Typography>
                //     </Stack>
                //   </AccordionSummary>

                //   <AccordionDetails
                //     sx={{
                //       p: 0,
                //     }}
                //   >
                //     <Box
                //       mb={2}
                //       display={"flex"}
                //       justifyContent={"space-between"}
                //     ></Box>
                //     {/* <TableInvoice rows={s.detail} /> */}

                //   </AccordionDetails>
                // </Accordion>
                <DataGridInvoice key={s.branch_code} data={s} />
              ))}
          </Stack>
        </Box>

        <Box mt={2} pb={5}>
          <Typography>หมายเหตุ</Typography>
          <Typography color="text.secondary" fontSize={"0.65rem"}>
            กรณีที่ปรากฎว่าข้อมูลในเอกสารฉบับนี้ไม่ตรงกับข้อมูลในระบบของบริษัท
            ให้ถือว่าข้อมูลในระบบของบริษัท เป็นข้อมูลที่ถูกต้อง
            หากต้องการเอกสารฉบับที่มีการรับรองโดยบริษัท
            กรุณาติดต่อได้ที่ทุกสาขาของบริษัท
          </Typography>
        </Box>
      </Box>
    )
  );
}
