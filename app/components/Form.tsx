'use client'

import { useEffect, ReactNode } from 'react';
const liffId = process.env.NEXT_PUBLIC_LIFF_ID || ""

interface MyAppProps {
    children: ReactNode;
}

function Form({ children }: MyAppProps) {
    useEffect(() => {
        const initLiff = async () => {
            const liff = (await import('@line/liff')).default
            try {
                await liff.init({ liffId });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('liff init error', error.message);
                }
            }
            if (!liff.isLoggedIn()) {
                liff.login();
            }
        }
        initLiff()
    })

    return <>{children}</>
}

export default Form
