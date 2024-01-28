import { SignupForm } from "@/types/User"
import { Prisma, PrismaClient } from "@prisma/client"
import { uid } from "uid"
import { include } from "../include"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const data = (await req.json()) as SignupForm
    console.log(data)

    try {
        const user = await prisma.user.create({
            data: {
                id: uid(),
                ...data
            },
            include
        })

        console.log(user)
        return Response.json(user)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                if (error.meta?.target == "User_username_key") {
                    return Response.json({ error: "nome de usuário já cadastrado." })
                }

                if (error.meta?.target == "User_email_key") {
                    return Response.json({ error: "e-mail já cadastrado." })
                }
            }
        }

        return Response.json({ error: error?.toString() })
    }
}
