(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_f2c02186._.js", {

"[project]/app/utils/Theme.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "theme": (()=>theme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/styles/createTheme.js [app-client] (ecmascript) <locals> <export default as createTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/colors/grey.js [app-client] (ecmascript) <export default as grey>");
;
;
const themeOptions = {
    palette: {
        primary: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900]
        },
        background: {
            default: "#F9F9FA"
        }
    },
    typography: {
        fontFamily: `var(--font-noto)`,
        body1: {
            fontSize: '0.775rem'
        },
        body2: {
            fontSize: '0.775rem'
        },
        h1: {
            fontSize: '2.5rem'
        },
        h2: {
            fontSize: '2rem'
        },
        h3: {
            fontSize: '1.5rem'
        },
        h4: {
            fontSize: '1.25rem'
        },
        h5: {
            fontSize: '1rem'
        },
        h6: {
            fontSize: '0.875rem'
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'standard'
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    height: 47,
                    backgroundColor: "#F9F9FA",
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900],
                    borderBlock: 'none',
                    '& .MuiFilledInput-root': {
                        border: 'none',
                        borderRadius: 12,
                        backgroundColor: "#F9F9FA",
                        '&:hover': {
                            backgroundColor: "#F9F9FA"
                        },
                        '&.Mui-focused': {
                            backgroundColor: "#F9F9FA"
                        },
                        '&.Mui-disabled': {
                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][100]
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900],
                        '&.Mui-focused': {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900]
                        }
                    },
                    '& .MuiOutlinedInput-root': {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900],
                        '&.Mui-focused': {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900]
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    color: "#FFFFFF",
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][900],
                    textTransform: 'none',
                    boxShadow: 'none',
                    "-:disabled": {
                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][400],
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$colors$2f$grey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__grey$3e$__["grey"][100]
                    },
                    '&:focus': {
                        boxShadow: 'none'
                    },
                    '&:hover': {
                        boxShadow: 'none'
                    },
                    '&:active': {
                        boxShadow: 'none'
                    }
                }
            },
            defaultProps: {
                disableElevation: true
            }
        }
    }
};
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__["createTheme"])(themeOptions);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/providers/ThemeCustomProvider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$element$2d$489459f2$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js [app-client] (ecmascript) <export a as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$Theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/Theme.tsx [app-client] (ecmascript)");
'use client';
;
;
;
const ThemeCustomProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$element$2d$489459f2$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__ThemeProvider$3e$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$Theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"],
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers/ThemeCustomProvider.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
_c = ThemeCustomProvider;
const __TURBOPACK__default__export__ = ThemeCustomProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeCustomProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_f2c02186._.js.map