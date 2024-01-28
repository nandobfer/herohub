import { Room as PrismaRoom } from "@prisma/client"
import { User } from "./User"

declare interface Room extends PrismaRoom {
    master: User
    players: User[]
}

declare interface RoomForm {
    name: string
    master_id: string
}