"use client"

import React, { useState } from "react"
import { Box, Button, CircularProgress, Paper } from "@mui/material"
import { useFormik } from "formik"
import { RoomForm } from "@/types/Room"
import { Form } from "@/components/Form"
import { TextField } from "@/components/TextField"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { LoginRequired } from "@/components/LoginRequired"
import { post } from "@/app/api/request"
import { useSnackbar } from "burgos-snackbar"

interface NewRoomProps {}

const NewRoom: React.FC<NewRoomProps> = ({}) => {
    const router = useRouter()
    const { snackbar } = useSnackbar()
    const { user, setUser } = useUser()
    if (!user) return <LoginRequired />

    const [loading, setLoading] = useState(false)

    const formik = useFormik<RoomForm>({
        initialValues: { name: "", master_id: user.id },
        onSubmit: async (values) => {
            if (loading) return
            console.log(values)
            setLoading(true)

            const new_room = await post("/api/room/new", values)
            console.log(new_room)

            if (new_room.error) {
                snackbar({ severity: "error", text: new_room.error })
                setLoading(false)
                return
            }

            setUser((user) => (user ? { ...user, master_rooms: [...user.master_rooms, new_room] } : null))

            // navegar para página da sala
            router.push("/")
        }
    })

    return (
        <Box sx={{ flexDirection: "column", padding: "5vw", gap: "5vw", alignItems: "center" }}>
            <Box sx={{ fontSize: "1.5rem" }}>nova sala</Box>
            <Form onSubmit={formik.handleSubmit}>
                <Paper sx={{ flexDirection: "column", gap: "5vw", padding: "5vw" }}>
                    <TextField label="nome da sala" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                    <Button variant="outlined" type="submit">
                        {loading ? <CircularProgress size="1.5rem" /> : "criar"}
                    </Button>
                </Paper>
            </Form>
            <Button onClick={() => router.back()}>voltar</Button>
        </Box>
    )
}

export default NewRoom
