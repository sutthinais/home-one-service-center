"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  Dialog,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";
import { blob } from "node:stream/consumers";
import React, { use, useEffect, useState } from "react";
import Header from "./components/Header";
import ShippingStatus from "./components/ShippingStatus";
import OrderDetails from "./components/OrderDetails";
import Loading from "../register/components/Loading";
import Image from "next/image";
import Logo from "@/images/bg.png";
import { useRouter } from "next/navigation";
import { Detail, Tracking, TrackingSchema } from "@/schemas/TrackingSchema";
import {
  Phone,
  User,
  UserCircle,
  UserList,
} from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { handleTrackShipment, useLiff } from "./services/tracking_service";
import { set } from "zod";
import { Empty, Truck } from "@phosphor-icons/react";
import { CONFIG } from "@/config/dotenv";

export default function TrackingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID_TRACKING || "";

  const [billNumber, setBillNumber] = useState("");
  const [data, setData] = useState<Tracking[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { profile, isLoggedIn } = useLiff(liffid);
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      setData(null);
      fetchTrackingData(profile?.userId ?? "");
    }
    setLoading(false);
  }, []);

  const fetchTrackingData = async (userId: string) => {
    setLoading(true);
    setData(null);
    try {
      const response = await handleTrackShipment(billNumber, userId);
      setData(response);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      mt={{ xs: 0, md: 2 }}
      p={0}
      sx={{
        backgroundColor: grey[100],
      }}
    >
      <Loading open={loading} />
      <Grid sx={{ backgroundColor: grey[100] }} size={{ xs: 12, md: 8 }}>
        <Box
          sx={{
            // width: "100%",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: { xs: 0, md: 4 },
            p: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={Logo.src} alt="Logo" width={100} height={45}></Image>
              <Typography
                variant="h4"
                mb={0.5}
                display={{ xs: "none", md: "block" }}
              >
                ติดตามสถานะจัดส่งสินค้า
              </Typography>
            </Box>
            <Typography color="textSecondary" variant="body1" mb={2}>
              ท่านสามารถค้นหาเลขที่บิลขายได้มากกว่า 1 รายการ ด้วยการใช้ ,
              ระหว่างบิลขาย
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",

                gap: 1,
              }}
            >
              <TextField
                sx={{ flex: 3 }}
                type="text"
                variant="outlined"
                required
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                placeholder="หมายเลขบิลขาย"
                fullWidth
              />

              {/* <TextField
                label="หมายเลขบิลขาย"
                variant="outlined"
                fullWidth
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                sx={{ height: "58px" }}
              /> */}

              <Button
                onClick={() => {
                  fetchTrackingData(profile?.userId ?? "");
                }}
                sx={{ height: "50px", flex: 1 }}
                variant="contained"
                fullWidth
                type="button"
                disabled={billNumber.length === 0}
              >
                ค้นหา
              </Button>
            </Box>
          </Box>

          {data?.map((item: Tracking, index: number) => (
            <Box key={index} my={1}>
              <Accordion
                square={true}
                disableGutters={false}
                defaultExpanded={item.show_detail}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "white",
                  border: `solid 1px ${grey[400]}`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Stack
                    direction="row"
                    width={"100%"}
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography component="span">
                      บิลขาย : {item.doc_confirm}
                    </Typography>
                    <Typography component="span">
                      {item.status === 4
                        ? "จัดส่งสำเร็จ"
                        : "อยู่ระหว่างการจัดส่ง"}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ py: 0 }}>
                  <Stack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    direction={"row"}
                    spacing={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Truck size={32} />
                      <Typography component="span" ml={2}>
                        {item.license_plate}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        gap: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="span">{item.telephone}</Typography>
                      <Phone size={30} color={grey[900]} weight="light" />
                    </Box>
                  </Stack>
                  <Divider sx={{ mt: 2 }} />

                  <Stack
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    spacing={1}
                    direction={"row"}
                    py={2}
                  >
                    <Typography component="span">{item.shipment_id}</Typography>
                    <Button variant="outlined" color="success">
                      รายละเอียดคำสั่งซื้อ
                    </Button>
                  </Stack>
                  <Typography component="span" variant="h5">
                    รายการสินค้า
                  </Typography>
                  <Stack
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                    alignContent={"start"}
                    direction={"row"}
                    spacing={1}
                    my={2}
                  >
                    <Typography
                      component="span"
                      variant="button"
                      flex={1}
                      textAlign={"left"}
                    >
                      สินค้า
                    </Typography>
                    <Typography component="span" variant="button">
                      จำนวน
                    </Typography>
                    <Typography component="span" variant="button">
                      ราคา
                    </Typography>
                  </Stack>
                  {item.detail && (
                    <div>
                      {item.detail.map((product: Detail, index: number) => {
                        return (
                          <Stack
                            key={index}
                            direction={"row"}
                            spacing={1}
                            my={2}
                          >
                            <Typography
                              component="span"
                              variant="body2"
                              flex={1}
                              textAlign={"left"}
                            >
                              {product.item_code} {product.item_name}
                            </Typography>
                            <Typography component="span" variant="body2">
                              {product.used_qty} / {product.unit_code}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color={red[900]}
                            >
                              {product.price}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </div>
                  )}
                  <Divider />
                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 1,
                      },
                    }}
                  >
                    {item.history_booking.map((history_booking, item_index) => (
                      <Box key={item_index}>
                        <TimelineItem>
                          <TimelineOppositeContent color="textSecondary">
                            {history_booking.date_time}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot
                            // color={
                            //   item.history_booking.length === 1
                            //     ? "primary"
                            //     : "grey"
                            // }
                            />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            {history_booking.status_message}
                          </TimelineContent>
                        </TimelineItem>
                      </Box>
                    ))}
                    {item.history.map((history, history_index) => {
                      return history.status !== 19 ? (
                        <Box key={history_index}>
                          <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                              {history.date_time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot />

                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              {history.status_message}
                            </TimelineContent>
                          </TimelineItem>
                        </Box>
                      ) : (
                        <Box key={history_index}>
                          <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                              {history.date_time}
                            </TimelineOppositeContent>
                            <TimelineDot />
                            <TimelineContent>
                              {history.status_message}
                            </TimelineContent>
                          </TimelineItem>
                        </Box>
                      );
                    })}
                    {item.status !== 4 && item.tuck_location && (
                      <Box>
                        <TimelineItem>
                          <TimelineOppositeContent color="textSecondary">
                            {item.tuck_location.time.toLocaleString("th-TH", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </TimelineOppositeContent>
                          <TimelineDot color="warning" />
                          <TimelineContent>
                            ต.{item.tuck_location.sub_district_th} อ.{" "}
                            {item.tuck_location.district_th}
                            จ.{item.tuck_location.province_th}
                          </TimelineContent>
                        </TimelineItem>
                      </Box>
                    )}
                  </Timeline>
                  <Divider />

                  {item.status === 4 && (
                    <Stack my={2}>
                      <Typography
                        component="span"
                        variant="button"
                        color={red[900]}
                      >
                        ภาพจัดส่งสินค้า
                      </Typography>
                      <Grid
                        size={{ xs: 12, sm: 12, md: 12 }}
                        container
                        spacing={1}
                        mt={2}
                        sx={{ backgroundColor: "white" }}
                      >
                        {item.images.map((image, inex) => (
                          <Grid size={{ xs: 12, md: 6 }} key={inex}>
                            <Box
                              referrerPolicy="no-referrer"
                              key={index}
                              component={"img"}
                              style={{
                                width: "100%",
                                height: 400,
                                objectFit: "cover",
                              }}
                              src={image}
                              alt={""}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  )}
                </AccordionDetails>
                <AccordionActions>
                  {/* <Button>Cancel</Button>
                  <Button>Agree</Button> */}
                </AccordionActions>
              </Accordion>
            </Box>
          ))}

          {data === null ||
            (data.length === 0 && (
              <Box height={"400px"} alignContent={"center"}>
                <Empty size={32} color="grey" />
                <Typography>ค้นหาเลขที่บิลขายเลย</Typography>
              </Box>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
}
// X03-HSV6802-02160,X03-HSV6802-02182
