import { LoginForm, SignupForm } from "@/types/User"
import { Prisma, PrismaClient } from "@prisma/client"
import { uid } from "uid"
import { include } from "../include"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const data = (await req.json()) as LoginForm
    console.log(data)

    try {
        const user = await prisma.user.findFirst({
            where: { OR: [{ email: data.login }, { username: data.login }], AND: { password: data.password } },
            include
        })

        console.log(user)
        if (!user) return Response.json({ error: "usuário não encontrado" })
        return Response.json(user)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
        }
        console.log(error)

        return Response.json({ error: error?.toString() })
    }
}
