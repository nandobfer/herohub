import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/themeContext"

const inter = Inter({ subsets: ["latin"] })

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
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}
