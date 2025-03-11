import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeCustomProvider from "../providers/ThemeCustomProvider";
import { Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "react-hot-toast";

const noto_th = Noto_Sans_Thai({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Homeone",
  description: "เว็บไซต์สำหรับบริการลูกค้า",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body style={{ margin: 0, padding: 0 }} className={noto_th.variable}>
        <AppRouterCacheProvider>
          <ThemeCustomProvider>
            <Toaster position="bottom-center" />
            {children}
          </ThemeCustomProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
