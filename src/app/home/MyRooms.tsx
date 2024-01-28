"use client"

import React from "react"
import { Box, Button, Paper } from "@mui/material"
import { User } from "@/types/User"
import { useRouter } from "next/navigation"

interface MyRoomsProps {
    user: User
}

export const MyRooms: React.FC<MyRoomsProps> = ({ user }) => {
    const router = useRouter()

    return (
        <Box sx={{ padding: "0 5vw", gap: "5vw", height: "50vw", width: "100%", overflowX: "auto" }}>
            <Button
                variant="outlined"
                color="success"
                sx={{ borderStyle: "dashed", width: "50vw", flexShrink: 0 }}
                onClick={() => router.push("/rooms/new")}>
                criar sala
            </Button>
            {user.master_rooms.map((room) => (
                <Paper key={room.id} sx={{ width: "50vw", padding: "5vw" }}>
                    {room.name}
                </Paper>
            ))}
        </Box>
    )
}
