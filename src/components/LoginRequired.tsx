import React, { useEffect } from "react"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { usePathname } from "next/navigation"

interface LoginRequiredProps {
    redirect?: string
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({ redirect }) => {
    const user = useUser()
    const pathname = usePathname()

    useEffect(() => {
        user.setLogin_redirect(pathname)
    }, [])

    return (
        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "5vw" }}>
            <Box sx={{}}>é preciso estar logado isso</Box>
            <Button variant="outlined">
                <Link href={"/login"}>fazer login</Link>
            </Button>
        </Box>
    )
}
