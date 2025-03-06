import { createTheme, ThemeOptions } from "@mui/material";
import { orange, grey } from "@mui/material/colors";

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: grey[900],

        },
        background: {
            default: "#F9F9FA",
        },

    },
    typography: {
        fontFamily: `var(--font-noto)`,
        body1: {
            fontSize: '0.775rem',
        },
        body2: {
            fontSize: '0.775rem',
        },
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '2rem',
        },
        h3: {
            fontSize: '1.5rem',
        },
        h4: {
            fontSize: '1.25rem',
        },
        h5: {
            fontSize: '1rem',
        },
        h6: {
            fontSize: '0.875rem',
        }
    },

    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // ลบขอบ
                    },

                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'standard',


            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    height: 47,
                    backgroundColor: "#F9F9FA",
                    color: grey[900],
                    borderBlock: 'none',
                    '& .MuiFilledInput-root': {
                        border: 'none',
                        borderRadius: 12,
                        backgroundColor: "#F9F9FA",
                        '&:hover': {
                            backgroundColor: "#F9F9FA",
                        },
                        '&.Mui-focused': {
                            backgroundColor: "#F9F9FA",
                        },
                        '&.Mui-disabled': {
                            backgroundColor: grey[100],
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: grey[900],
                        '&.Mui-focused': {
                            color: grey[900],
                        },
                    },
                    '& .MuiOutlinedInput-root': {
                        color: grey[900],

                        '&.Mui-focused': {
                            color: grey[900],
                        },
                    }

                },

            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    color: "#FFFFFF",
                    backgroundColor: grey[900],
                    textTransform: 'none',
                    boxShadow: 'none',
                    "-:disabled": {
                        backgroundColor: grey[400],
                        color: grey[100],
                    },
                    '&:focus': {
                        boxShadow: 'none',
                    },
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    '&:active': {
                        boxShadow: 'none',
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

