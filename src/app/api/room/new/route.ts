import { RoomForm } from "@/types/Room"
import { PrismaClient } from "@prisma/client"
import { uid } from "uid"
import { include } from "../include"

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const data = (await request.json()) as RoomForm
    console.log(data)

    try {
        const room = await prisma.room.create({ data: { id: uid(), ...data }, include })
        return Response.json(room)
    } catch (error) {
        console.log(error)
        return Response.json({ error: error?.toString() })
    }
}
