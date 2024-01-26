import ThemeContext from "@/contexts/themeContext"
import { createTheme } from "@mui/material"
import { useContext } from "react"

export const useMuiTheme = () => {
    const { theme } = useContext(ThemeContext)

    const THEME = createTheme({
        typography: {
            // fontFamily: ["Lato"].join(","),
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 600
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: theme.colors.primary
            },
            secondary: {
                main: theme.colors.secondary
            },

            text: {
                primary: theme.colors.text.primary
                // secondary: colors.text.white,
                // disabled: colors.primary,
            }
        }
    })

    return THEME
}
