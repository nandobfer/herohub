import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { login } = await req.json()
    console.log(login)

    try {
        const user = await prisma.user.findFirst({ where: { OR: [{ email: login }, { username: login }] } })
        console.log(user)
        return Response.json(user)
    } catch (error) {
        return Response.json({ error: error?.toString() })
    }
}
