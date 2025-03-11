"use client";

import React, { useEffect, useState } from "react";
import { UserCheck } from "@phosphor-icons/react";
import Grid from "@mui/material/Grid2";
import useTheme from "@mui/material/styles/useTheme";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { BaseButton } from "@/components/Button";
import Loading from "./Loading";
import {
  initializeLiff,
  registerUserByTaxId,
} from "../services/regisger_service";
import { Controller, set, useForm } from "react-hook-form";
import { SignInFormData, SignInSchema } from "@/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "./AlertDialog";
import { title } from "process";
import { CONFIG } from "@/config/dotenv";

const RegisterForm = () => {
  const liffId = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const [isIintLine, setIintLine] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState({
    title: "",
    open: false,
  });
  const theme = useTheme();
  const u = theme.palette.background.default;

  useEffect(() => {
    initializeLiff({ setIintLine, setLoading, liffId, setUserId });
  }, []);

  const regisger = async (data: SignInFormData) => {
    setLoading(true);
    try {
      var response = await registerUserByTaxId(data.tax_id, data.user_id);
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.status === 1)
          throw new Error(`${response.data.message}`);
        setOpen({
          title: "ลงทะเบียนสำเร็จ",
          open: true,
        });
      } else {
        throw "error";
      }
    } catch (e: any) {
      if (e instanceof Error) {
        setOpen({
          title: e.message,
          open: true,
        });
      } else {
        setOpen({
          title: "An error occurred",
          open: true,
        });
      }
    } finally {
      console.log("finally");

      setLoading(false);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    // mode: "all",
    // resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    data.user_id = userId;
    await regisger(data);
  };

  return (
    <Box>
      <Typography>ISLOGGIN : {isIintLine}</Typography>
      <Typography>ISLOGGIN : {liffId}</Typography>
      <Loading open={isLoading} />
      <AlertDialog
        open={{ title: open.title, open: open.open }}
        setOpen={setOpen}
      />
      {isIintLine ? (
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="center"
          display="flex"
          height="100vh"
          sx={{ backgroundColor: u }}
        >
          <Grid size={{ xs: 12, md: 6 }} sx={{ px: { xs: 5, md: 0 } }}>
            <Box
              sx={{ py: 5, bgcolor: "white", px: 5, borderRadius: 4 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography py={1.5} align="center" sx={{ fontSize: "1rem" }}>
                ลงทะเบียน v 1.0.0
              </Typography>

              <FormControl fullWidth>
                <Controller
                  name="tax_id"
                  control={control}
                  rules={{
                    required: "กรุณาระบุเลขประจำตัวผู้เสียภาษี",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      placeholder="เลขประจำตัวผู้เสียภาษี"
                      helperText={errors.tax_id?.message}
                      error={!!errors.tax_id}
                      fullWidth
                      onChange={onChange}
                      value={value || ""}
                      slotProps={{
                        input: {
                          endAdornment: <UserCheck size={30} />,
                        },
                      }}
                    />
                  )}
                />
              </FormControl>

              <Box mt={2}>
                <BaseButton
                  text="ลงทะเบียน"
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  isProcessing={isLoading}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default RegisterForm;
