"use client"

import { useUser } from "@/hooks/useUser"
import { Box } from "@mui/material"
import { MyRooms } from "./MyRooms"

export default function Home() {
    const { user } = useUser()

    return (
        <Box sx={{ padding: "5vw 0", flexDirection: "column", alignItems: "center" }}>
            {user ? (
                <Box sx={{ flexDirection: "column", gap: "5vw", width: "100%", alignItems: "center" }}>
                    <Box sx={{ fontSize: "1.5rem" }}>minhas salas</Box>
                    <MyRooms user={user} />
                </Box>
            ) : (
                <h1>home</h1>
            )}
        </Box>
    )
}
