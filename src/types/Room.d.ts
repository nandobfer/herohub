import { Room as PrismaRoom } from "@prisma/client"
import { User } from "./User"

declare interface Room extends PrismaRoom {
    master: User
    players: User[]
}
