import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
export default function NotFound() {
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
        <Typography variant="h1" color="error" fontWeight="bold">
          404
        </Typography>
      </motion.div>
      <Typography variant="h5" className="mt-4">
        Oops! Page not found.
      </Typography>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        mt-6
      ></motion.div>
    </Box>
  );
}
