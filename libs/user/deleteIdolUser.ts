"use server"
import prisma from '@/libs/prismadb'

export default async function idolDeleteUser(studentId: number) {

    console.log(studentId)

    const user = await prisma.student.findFirst({
        where: {
            studentId: studentId
        }
    })

    const del = await prisma.registeration.delete({
        where: {
            userId: user?.id
        }
    })

    console.log(del)

    if (!del) return false

    return true
}