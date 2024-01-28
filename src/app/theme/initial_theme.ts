// import { Theme } from "@/types/theme"

import { createTheme } from "@mui/material"

export const initial_theme = createTheme({
    typography: {
        fontFamily: ["Fira Code"].join(","),
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
    },

    palette: {
        // mode: "dark",

        primary: {
            main: "#00AFEF"
        },

        secondary: {
            main: "#fff"
        },

        background: {
            default: "#111012",
            paper: "#121212"
        },

        text: {
            primary: "#00AFEF",
            secondary: "#fff"
            // disabled: colors.primary,
        },

        success: {
            main: "#34A853"
        },

        warning: {
            main: "#FFB74D"
        }
    }
})
