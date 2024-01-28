"use client"

import React from "react"
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useUser } from "@/hooks/useUser"

interface UserAvatarProps {
    size?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ size }) => {
    const { user, logout } = useUser()
    if (!user) return null

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const splitted_name = user.name.split(" ")
    const first_letter = splitted_name[0][0]
    const second_letter = splitted_name.length > 1 ? splitted_name[1][0] : ""

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton color="secondary" onClick={handleClick}>
                <Avatar children={first_letter + second_letter} sx={{ width: size || "10vw", height: size || "10vw", fontSize: "1rem" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                <MenuItem onClick={handleClose}>minha conta</MenuItem>
                <MenuItem
                    onClick={() => {
                        logout()
                        handleClose()
                    }}>
                    sair
                </MenuItem>
            </Menu>
        </>
    )
}
