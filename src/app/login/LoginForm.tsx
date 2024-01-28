import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Paper } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "@/hooks/useUser"
import { useFormik } from "formik"
import { post } from "../api/request"
import { Form } from "@/components/Form"
import { TextField } from "@/components/TextField"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Link from "next/link"
import { storage } from "@/tools/local_storage"

interface LoginFormComponentProps {
    username: string | null
}

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({ username }) => {
    const router = useRouter()

    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [remember, setRemember] = useState(storage.get("herohub:login:remember"))

    const remembered_login = storage.get("herohub:login") as LoginForm | undefined

    const formik = useFormik<LoginForm>({
        initialValues: remembered_login || {
            login: username || "",
            password: ""
        },
        onSubmit: async (values) => {
            if (loading) return

            console.log(values)
            setLoading(true)
            const response = await post("/api/user/login", values)
            setLoading(false)

            if (response.error) {
                snackbar({ severity: "error", text: response.error })
                return
            }

            setUser(response)
            router.push("/")

            storage.set("herohub:login", remember ? values : null)
        }
    })

    useEffect(() => {
        storage.set("herohub:login:remember", remember)
    }, [remember])

    return (
        <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: "5vw", alignItems: "center" }}>
            <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>entrar</Box>
            <Paper sx={{ flexDirection: "column", gap: "5vw", padding: "5vw" }}>
                <TextField
                    label="usuario ou e-mail"
                    name="login"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    required
                    inputProps={{ inputMode: "email" }}
                />
                <TextField
                    label="senha"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    autoFocus={!!username}
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
                <FormControlLabel
                    label="lembrar"
                    sx={{ color: "secondary.main" }}
                    control={<Checkbox checked={remember} onChange={(_, checked) => setRemember(checked)} />}
                />
                <Button variant="outlined" type="submit">
                    {loading ? <CircularProgress size="1.5rem" /> : "tome"}
                </Button>
            </Paper>
            <Button>
                <Link href={"/signup"}>cadastrar</Link>
            </Button>
        </Form>
    )
}
