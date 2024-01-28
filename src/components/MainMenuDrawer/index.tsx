import React from "react"
import { Box, MenuItem, SwipeableDrawer, SxProps } from "@mui/material"
import { LanguageSelector } from "../LanguageSelector"
import { backdropStyle } from "@/style/backdrop"
import { Logo } from "../Logo"
import { useLocale } from "@/hooks/useLocale"
import { usePathname } from "next/navigation"
import { navigation_options } from "./navigation_options"
import { NavigationOption } from "@/types/navigation_options"
import Link from "next/link"

interface MainMenuDrawerProps {
    isOpen: boolean
    setOpen: (value: boolean) => void
}

export const MainMenuDrawer: React.FC<MainMenuDrawerProps> = ({ isOpen, setOpen }) => {
    const { locale } = useLocale()
    const pathname = usePathname()

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)

    return (
        <SwipeableDrawer
            open={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            PaperProps={{ sx: { width: "80vw", bgcolor: "background.paper", color: "text.secondary" } }}
            componentsProps={{ backdrop: { sx: backdropStyle } }}
            anchor={"left"}
            keepMounted>
            <Box sx={{ flexDirection: "column", justifyContent: "space-between", height: "100%", alignItems: "center", paddingTop: "10vw" }}>
                <Logo size="15vw" />

                <Box sx={{ flexDirection: "column", width: "100%" }}>
                    {navigation_options.map((option) => {
                        const active = pathname == option.path
                        const Icon = () => option.icon

                        return (
                            <Link href={option.path} key={option.key} style={{ display: "contents" }}>
                                <MenuItem
                                    onClick={onClose}
                                    sx={{
                                        backgroundColor: active ? "primary.main" : "",
                                        color: active ? "background.paper" : "primary.main",
                                        pointerEvents: active ? "none" : "auto",
                                        fontWeight: "bold",
                                        gap: "2vw"
                                    }}>
                                    <Icon />
                                    {locale.header.navigation[option.key]}
                                </MenuItem>
                            </Link>
                        )
                    })}
                </Box>

                <LanguageSelector />
            </Box>
        </SwipeableDrawer>
    )
}
