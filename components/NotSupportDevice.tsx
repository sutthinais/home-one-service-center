import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
export default function NotSupportDevice() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">
          Notsupport Device
        </Typography>
      </motion.div>
      {/* <Typography variant="h5" className="mt-4">
        ไม่รองรับการใช้งานบน browser.
      </Typography> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        mt-6
      ></motion.div>
    </Box>
  );
}
