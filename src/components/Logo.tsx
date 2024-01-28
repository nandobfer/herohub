import React from "react"
import { Box } from "@mui/material"

interface LogoProps {
    size?: string
}

export const Logo: React.FC<LogoProps> = ({ size }) => {
    return <Box sx={{ fontSize: size || "10vw" }}>LOGO</Box>
}
