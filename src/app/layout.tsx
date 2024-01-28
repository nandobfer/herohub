import type { Metadata } from "next";
import { Fira_Code } from "next/font/google"
import "../style/globals.css"
import "../style/custom.css"
import { Providers } from "./Providers"
import { Box } from "@mui/material"
import { Header } from "@/components/Header"

const inter = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Central do Herói",
    description: "Gerenciador de salas e fichas para qualquer sistema de RPG"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Box sx={{ flexDirection: "column" }}>
                        <Header />
                        {children}
                    </Box>
                </Providers>
            </body>
        </html>
    )
}
