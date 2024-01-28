"use client"

import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
import { useFormik } from "formik"
import { Form } from "@/components/Form"
import { useLocale } from "@/hooks/useLocale"
import { TextField } from "@/components/TextField"
import { post } from "../api/request"
import { useSnackbar } from "burgos-snackbar"
import { useRouter } from "next/navigation"
import { LoginFormComponent } from "./LoginForm"
import { storage } from "@/tools/local_storage"
import { LoginForm } from "@/types/User"

interface pageProps {}

export const Page: React.FC<pageProps> = ({}) => {
    const remembered_login = storage.get("herohub:login") as LoginForm | undefined

    const router = useRouter()
    const { locale: _locale } = useLocale()
    const locale = _locale.login
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(remembered_login?.login || "")

    const initial_formik = useFormik({
        initialValues: { login: "" },
        onSubmit: async (values) => {
            if (loading) return
            if (!values.login) {
                snackbar({ severity: "error", text: "digite nome de usuário ou e-mail" })
                return
            }
            console.log(values)

            setLoading(true)
            const response = await post("/api/user/find", values)
            console.log(response)
            setLoading(false)

            if (!response) {
                router.push(`/signup?username=${values.login}`)
                return
            }

            setUsername(values.login)
        }
    })

    return (
        <Box sx={{ padding: "5vw", justifyContent: "center", alignItems: "center" }}>
            {username ? (
                <LoginFormComponent username={username} />
            ) : (
                <Form onSubmit={initial_formik.handleSubmit} sx={{ flexDirection: "column", gap: "5vw" }}>
                    <TextField
                        label={locale.username}
                        name="login"
                        value={initial_formik.values.login}
                        onChange={initial_formik.handleChange}
                        fullWidth
                        inputProps={{ inputMode: "email" }}
                    />
                    <Button type="submit" variant="outlined">
                        {loading ? <CircularProgress size="1.5rem" /> : "continuar"}
                    </Button>
                </Form>
            )}
        </Box>
    )
}

export default Page
