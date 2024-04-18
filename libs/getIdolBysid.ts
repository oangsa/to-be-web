"use server"
import prisma from '@/libs/prismadb'

export default async function getidolbysid(sid: number) {
    const user = await prisma.student.findFirst({
        where: {
            studentId: sid
        },
        include: {
            Registeration: true
        }
    })
    return user
}