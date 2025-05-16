import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeCustomProvider from "../providers/ThemeCustomProvider";
import { Prompt, Sarabun } from "next/font/google";
import { grey } from "@mui/material/colors";
import { Bounce, ToastContainer } from "react-toastify";
import ReactQueryProvider from "./react-query/ReactQueryProvider";

const noto_th = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Homeone",
  description: "เว็บไซต์สำหรับบริการลูกค้า",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" style={{ backgroundColor: 'white' }}>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <body className={noto_th.variable} style={{ margin: 0, padding: 0 }}>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
              style={{
                fontFamily: "var(--font-noto)",
                fontSize: "0.875rem",
              }}
            />

            <ThemeCustomProvider>{children}</ThemeCustomProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
