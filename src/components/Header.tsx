"use client"

import React, { useState } from "react"
import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material"
import { Menu, Person } from "@mui/icons-material"
import { useLocale } from "@/hooks/useLocale"
import { LanguageSelector } from "./LanguageSelector"
import { MainMenuDrawer } from "./MainMenuDrawer"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { UserAvatar } from "./UserAvatar"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const locale = useLocale()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { user } = useUser()

    const [menuModal, setMenuModal] = useState(false)

    return (
        <Box sx={{ justifyContent: "space-between", padding: isMobile ? "5vw" : "2vw" }}>
            {isMobile ? (
                <>
                    <IconButton onClick={() => setMenuModal(true)} color="secondary">
                        <Menu />
                    </IconButton>

                    <IconButton color="secondary">
                        {user ? (
                            <UserAvatar size="8vw" />
                        ) : (
                            <Link href={"/login"}>
                                <Person />
                            </Link>
                        )}
                    </IconButton>
                </>
            ) : (
                <LanguageSelector />
            )}
            {isMobile && <MainMenuDrawer isOpen={menuModal} setOpen={setMenuModal} />}
        </Box>
    )
}
