import React from "react"
import { Avatar, Box } from "@mui/material"
import { useUser } from "@/hooks/useUser"

interface UserAvatarProps {
    size?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ size }) => {
    const { user } = useUser()
    if (!user) return null

    const splitted_name = user.name.split(" ")
    const first_letter = splitted_name[0][0]
    const second_letter = splitted_name.length > 1 ? splitted_name[1][0] : ""

    return <Avatar children={first_letter + second_letter} sx={{ width: size || "10vw", height: size || "10vw", fontSize: "1rem" }} />
}
