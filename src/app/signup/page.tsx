"use client"

import React, { useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "@/hooks/useUser"
import { SignupForm } from "@/types/User"
import { useFormik } from "formik"
import { post } from "../api/request"
import { Form } from "@/components/Form"
import { TextField } from "@/components/TextField"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Link from "next/link"

interface SignupPageProps {}

export const SignupPage: React.FC<SignupPageProps> = ({}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const username = searchParams.get("username")

    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    const formik = useFormik<SignupForm>({
        initialValues: {
            email: "",
            name: "",
            password: "",
            username: username || ""
        },
        onSubmit: async (values) => {
            if (loading) return

            console.log(values)
            setLoading(true)
            const response = await post("/api/user/signup", values)
            setLoading(false)

            if (response.error) {
                snackbar({ severity: "error", text: response.error })
                return
            }

            setUser(response)
            router.push("/")
        }
    })

    return (
        <Box sx={{ padding: "5vw", justifyContent: "center", alignItems: "center" }}>
            <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: "5vw", alignItems: "center" }}>
                <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>cadastrar</Box>
                <Paper sx={{ flexDirection: "column", gap: "5vw", padding: "5vw" }}>
                    <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                    <TextField
                        label="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                        inputProps={{ inputMode: "email" }}
                    />
                    <TextField label="nome de usuario" name="username" value={formik.values.username} onChange={formik.handleChange} required />
                    <TextField
                        label="senha"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                        type={seePassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton color="secondary" onClick={() => setSeePassword((value) => !value)}>
                                    {seePassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                    <Button variant="outlined" type="submit">
                        {loading ? <CircularProgress size="1.5rem" /> : "tome"}
                    </Button>
                </Paper>
                <Button>
                    <Link href={"/login"}>voltar</Link>
                </Button>
            </Form>
        </Box>
    )
}

export default SignupPage
