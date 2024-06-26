"use server"
import prisma from '@/libs/prismadb'

export default async function getuserbysid(sid: number) {
    // console.log(sid)
    const user = await prisma.student.findFirst({
        where: {
            studentId: sid
        },
    })
    return user
}