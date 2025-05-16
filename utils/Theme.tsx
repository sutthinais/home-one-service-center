import { createTheme, ThemeOptions } from "@mui/material";
import { orange, grey, red, blue } from "@mui/material/colors";

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: grey[900],
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.08)",
    "0px 1px 5px rgba(0, 0, 0, 0.08)",
    "0px 1px 8px rgba(0, 0, 0, 0.08)",
    "0px 1px 10px rgba(0, 0, 0, 0.08)",
    "0px 1px 14px rgba(0, 0, 0, 0.08)",
    "0px 1px 18px rgba(0, 0, 0, 0.08)",
    "0px 2px 16px rgba(0, 0, 0, 0.08)",
    "0px 3px 14px rgba(0, 0, 0, 0.08)",
    "0px 3px 16px rgba(0, 0, 0, 0.08)",
    "0px 4px 18px rgba(0, 0, 0, 0.08)",
    "0px 4px 20px rgba(0, 0, 0, 0.08)",
    "0px 5px 22px rgba(0, 0, 0, 0.08)",
    "0px 5px 24px rgba(0, 0, 0, 0.08)",
    "0px 5px 26px rgba(0, 0, 0, 0.08)",
    "0px 6px 28px rgba(0, 0, 0, 0.08)",
    "0px 6px 30px rgba(0, 0, 0, 0.08)",
    "0px 6px 32px rgba(0, 0, 0, 0.08)",
    "0px 7px 34px rgba(0, 0, 0, 0.08)",
    "0px 7px 36px rgba(0, 0, 0, 0.08)",
    "0px 8px 38px rgba(0, 0, 0, 0.08)",
    "0px 8px 40px rgba(0, 0, 0, 0.08)",
    "0px 8px 42px rgba(0, 0, 0, 0.08)",
    "0px 9px 44px rgba(0, 0, 0, 0.08)",
    "0px 9px 46px rgba(0, 0, 0, 0.08)",
  ],
  typography: {
    fontFamily: `var(--font-noto)`,
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(13),
    },
    h1: {
      fontWeight: 800,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
    },
    h2: {
      fontWeight: 800,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
    },
    h6: {
      fontWeight: 500,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: "unset",
    },
  },

  // components: {
  //   MuiAccordion: {
  //     styleOverrides: {
  //       root: {
  //         "&:before": {
  //           backgroundColor: "transparent",
  //         },
  //       },
  //     },
  //   },
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       root: {
  //         "& .MuiOutlinedInput-notchedOutline": {
  //           border: "greay[400]",

  //           borderRadius: 6,
  //         },
  //         "&.Mui-focused": {
  //           "& .MuiOutlinedInput-notchedOutline": {
  //             border: `1px solid ${blue[600]}`,
  //           },
  //           borderRadius: 6,
  //         },
  //       },
  //     },
  //   },

  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 6,
  //         // color: "#FFFFFF",
  //         // border: `1px solid ${grey[900]}`,
  //         // backgroundColor: grey[900],
  //         textTransform: "none",
  //         boxShadow: "none",
  //         height: 47,

  //         "-:disabled": {
  //           backgroundColor: grey[400],
  //           color: grey[100],
  //         },
  //         "&:focus": {
  //           boxShadow: "none",
  //         },
  //         "&:hover": {
  //           boxShadow: "none",
  //         },
  //         "&:active": {
  //           boxShadow: "none",
  //         },
  //       },
  //     },
  //     defaultProps: {
  //       disableElevation: true,
  //     },
  //   },

    // MuiTableCell: {
    //   styleOverrides: {
    //     head: ({ theme }) => ({
    //       fontSize: theme.typography.pxToRem(14),
    //       //color: theme.vars.palette.text.secondary,
    //       //fontWeight: theme.typography.fontWeightSemiBold,
    //       //backgroundColor: theme.vars.palette.background.neutral,
    //     }),
    //   },
    // },
  // },
};

export const theme = createTheme(themeOptions);
