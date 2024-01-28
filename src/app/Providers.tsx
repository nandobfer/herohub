"use client"

import { IoProvider } from "@/contexts/ioContext"
import { LocaleProvider } from "@/contexts/localeContext"
import { ThemeProvider } from "@/contexts/themeContext"
import { UserProvider } from "@/contexts/userContext"
import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import React from "react"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <LocaleProvider>
                <IoProvider>
                    <SnackbarProvider>
                        <ConfirmDialogProvider>
                            <UserProvider>
                                {children}
                                <Snackbar />
                                <ConfirmDialog />
                            </UserProvider>
                        </ConfirmDialogProvider>
                    </SnackbarProvider>
                </IoProvider>
            </LocaleProvider>
        </ThemeProvider>
    )
}
