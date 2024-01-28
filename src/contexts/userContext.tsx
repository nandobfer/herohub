"use client"

import { User } from "@/types/User"
import { createContext, useState } from "react"
import React from "react"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    login_redirect: string | null
    setLogin_redirect: React.Dispatch<React.SetStateAction<string | null>>
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [login_redirect, setLogin_redirect] = useState(null)

    return <UserContext.Provider value={{ user: user, setUser: setUser, login_redirect, setLogin_redirect }}>{children}</UserContext.Provider>
}
