"use client"

import { useSnackbar } from "burgos-snackbar"
import { createContext, useEffect } from "react"
import React from "react"
import { Socket, io as ioSocket } from "socket.io-client"
import { SWRConfig } from "swr"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

const io = ioSocket(`:8081`, { path: "/api/socket", addTrailingSlash: false })

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.once("connect_error", () => {
            // snackbar({ severity: "error", text: "Não foi possível se conectar com o servidor, verifique sua conexão com a internet" })
        })

        io.on("connect", () => {
            // snackbar({ severity: "success", text: "Conectado com o servidor" })
            console.log("connected to socketio server")
        })

        io.on("disconnect", (reason) => {
            if (reason == "io client disconnect" || reason == "io server disconnect") {
                // snackbar({ severity: "info", text: "Desconectado do servidor" })
            } else {
                // snackbar({ severity: "error", text: "Conexão com o servidor perdida! Tentando reconectar automaticamente" })
            }
        })

        io.on("connect_error", async (err) => {
            console.log(`connect_error due to ${err.message}`)
            await fetch("/api/socket", { method: "GET" })
        })

        return () => {
            io.off("connect_error")
            io.off("connect")
            io.off("disconnect")
        }
    }, [])

    return (
        <SWRConfig value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
            <IoContext.Provider value={{ io }}>{children}</IoContext.Provider>
        </SWRConfig>
    )
}
