"use client"

import { initial_theme } from "@/app/theme/initial_theme"
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from "@mui/material"
import { createContext, useState } from "react"
import React from "react"

interface ThemeContextValue {
    theme: Theme
    setTheme: (value: Theme) => void
}

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

export default ThemeContext

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(initial_theme)

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>{children}</ThemeContext.Provider>
        </MuiThemeProvider>
    )
}
