import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeCustomProvider from "../providers/ThemeCustomProvider";
import { Prompt } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { green, grey } from "@mui/material/colors";

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
    <html lang="th" style={{ backgroundColor: grey[100] }}>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <body className={noto_th.variable} style={{ margin: 0, padding: 0 }}>
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
