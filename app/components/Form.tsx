// 'use client'

// import { useEffect, ReactNode } from 'react';
// const liffId = process.env.NEXT_PUBLIC_LIFF_ID || ""

// interface MyAppProps {
//     children: ReactNode;
// }

// function Form({ children }: MyAppProps) {
//     useEffect(() => {
//         const initLiff = async () => {
//             const liff = (await import('@line/liff')).default
//             try {
//                 await liff.init({ liffId });
//             } catch (error: unknown) {
//                 if (error instanceof Error) {
//                     console.error('liff init error', error.message);
//                 }
//             }
//             if (!liff.isLoggedIn()) {
//                 liff.login();
//             }
//         }
//         initLiff()
//     })

//     return <>{children}</>
// }

// export default Form

'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField'
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { BaseButton } from './Button';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SearchIcon from '@mui/icons-material/Search';

const SignInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof SignInSchema>;

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit = (data: SignInFormData) => {
        console.log("Form Data:", data);
    };

    const theme = useTheme();
    const u = theme.palette.background.default;
    return (
        <Box>
            <Stack sx={{ width: "100%", height: "100vh", bgcolor: u }} spacing={2} direction="row" alignItems="center" justifyContent="center" >
                <Box sx={{ width: 400, py: 20, bgcolor: "white", p: 5, borderRadius: 4 }} component={"form"} onSubmit={handleSubmit(onSubmit)}   >
                    <Box sx={{ width: 400, py: 1.5 }} alignItems="center" justifyContent="center" textAlign="center">
                        ลงทะเบียน
                    </Box>
                    <TextField
                        id="standard-basic"
                        placeholder='เลขประจำตัวผู้เสียภาษี'
                        fullWidth
                        slotProps={
                            {
                                input: {
                                    endAdornment: <SearchIcon />
                                }
                            }
                        }
                    />
                    <Box sx={{ width: 400, py: 1.5 }}  >
                        <BaseButton onTap={async () => {
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            console.log("Button Clicked")
                        }} text='ลงทะเบียน' color='primary' variant='contained' fullWidth />
                    </Box>

                </Box>
            </Stack>
        </Box>
    )
}

export default Form
