"use server"
import prisma from '@/libs/prismadb'

export default async function getuserbysid(sid: number) {
    console.log("test", sid)
    const user = await prisma.student.findFirst({
        where: {
            studentId: sid
        },
        include: {
            Registeration: true
        }
    })
    // console.log(user)
    return user
}