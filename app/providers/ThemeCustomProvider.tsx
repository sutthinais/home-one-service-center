'use client'
import { ThemeProvider } from "@emotion/react";
import React from 'react'
import { theme } from "../utils/Theme";

const ThemeCustomProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider theme={theme} >
      {children}
    </ThemeProvider>
  )
}

export default ThemeCustomProvider
