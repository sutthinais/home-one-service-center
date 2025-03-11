"use client";

import React from "react";

import { registerUserByTaxId, useLiff } from "../services/regisger_service";
import { CONFIG } from "@/config/dotenv";
import NotFound from "@/components/NotFound";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Loading from "./Loading";
import { BaseButton } from "@/components/Button";
import Grid from "@mui/material/Grid2";
import { Controller, useForm } from "react-hook-form";
import { SignInFormData } from "@/schemas/SignInSchema";
import toast from "react-hot-toast";
import liff from "@line/liff";
import { UserCheck } from "@phosphor-icons/react";

const RegisterForm = () => {
  const liffid = CONFIG.NEXT_PUBLIC_LIFF_ID || "";
  const { profile, isLoggedIn, error } = useLiff(liffid);
  const [isLoading, setLoading] = React.useState(false);

  const theme = useTheme();
  const u = theme.palette.background.default;

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
    data.user_id = profile?.userId ?? "";
    await regisger(data);
  };

  const regisger = async (data: SignInFormData) => {
    setLoading(true);
    try {
      var response = await registerUserByTaxId(data.tax_id, data.user_id);
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.status === 1)
          throw new Error(`${response.data.message}`);
        toast.success("ลงทะเบียนสำเร็จ");
        liff.closeWindow();
      } else {
        throw "error";
      }
    } catch (e: any) {
      toast.success(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <NotFound />;
  if (!isLoggedIn) return <NotFound />;

  return (
    <Box>
      <Loading open={isLoading} />
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
    </Box>
  );
};

export default RegisterForm;
