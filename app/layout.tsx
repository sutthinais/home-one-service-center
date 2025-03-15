import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeCustomProvider from "../providers/ThemeCustomProvider";
import { Prompt } from "next/font/google";
import { Toaster } from "react-hot-toast";

const noto_th = Prompt({
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
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <body style={{ margin: 0, padding: 0 }} className={noto_th.variable}>
        <AppRouterCacheProvider>
          <ThemeCustomProvider>{children}</ThemeCustomProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                zIndex: 9999,
                fontFamily: noto_th.style.fontFamily,
              },
            }}
          />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
