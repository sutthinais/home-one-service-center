import { createTheme, ThemeOptions } from "@mui/material";
import { orange, grey, red, blue } from "@mui/material/colors";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: grey[900],
    },
  },
  typography: {
    fontFamily: `var(--font-noto)`,
    body1: {
      fontSize: "0.775rem",
    },
    body2: {
      fontSize: "0.775rem",
    },
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "0.875rem",
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "greay[400]",

            borderRadius: 6,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${blue[600]}`,
            },
            borderRadius: 6,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          // color: "#FFFFFF",
          // border: `1px solid ${grey[900]}`,
          // backgroundColor: grey[900],
          textTransform: "none",
          boxShadow: "none",
          height: 47,

          "-:disabled": {
            backgroundColor: grey[400],
            color: grey[100],
          },
          "&:focus": {
            boxShadow: "none",
          },
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
};

export const theme = createTheme(themeOptions);
