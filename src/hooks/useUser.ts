"use client"

import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { LoginForm } from "@/types/User"
import { post } from "@/app/api/request"
import { useSnackbar } from "burgos-snackbar"
import { storage } from "@/tools/local_storage"
import { useRouter } from "next/navigation"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const router = useRouter()
    const { snackbar } = useSnackbar()

    const logout = () => {
        userContext.setUser(null)
        router.push("/")
    }

    const login = async (data: LoginForm, remember?: boolean) => {
        const user_login = await post("/api/user/login", data)

        if (user_login.error) {
            snackbar({ severity: "error", text: user_login.error })
            return
        }

        userContext.setUser(user_login)
        storage.set("herohub:login", remember ? data : null)
        router.push(userContext.login_redirect || "/")
        userContext.setLogin_redirect(null)
        return user_login
    }

    return { ...userContext, logout, login }
}
