import { User as PrismaUser } from "@prisma/client"
import { Room } from "./Room"

declare interface User extends PrismaUser {
    master_rooms: Room[]
    rooms: Room[]
}

declare interface SignupForm {
    username: string
    name: string
    email: string
    password: string
}

declare interface LoginForm {
    login: string
    password: string
}
