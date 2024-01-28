import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useRouter } from "next/navigation"

export const useUser = () => {
    const router = useRouter()
    const userContext = useContext(UserContext)

    const logout = () => {
        userContext.setUser(null)
        router.push("/")
    }

    return { ...userContext, logout }
}
