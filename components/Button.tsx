"use client";
import {
  Button as MuiButton,
  ButtonProps,
  Button,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";

interface BaseButton extends ButtonProps {
  isProcessing: boolean;
  text: string;
  onTap?: () => Promise<void>;
}

export const BaseButton: React.FC<BaseButton> = ({
  isProcessing,
  text,
  ...props
}) => {
  const theme = useTheme();
  const u = theme.palette.primary.main;

  return (
    <Button
      {...props}
      disabled={isProcessing}
      //   onClick={handleClick}
      sx={{ height: 47 }}
    >
      {text}
    </Button>
  );
};
