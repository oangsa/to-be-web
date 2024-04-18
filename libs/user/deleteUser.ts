"use server"
import prisma from '@/libs/prismadb'

export default async function deleteUser(studentId: number) {

    const del = await prisma.student.delete({
        where: {
            studentId: studentId
        }
    })

    if (!del) return false

    return true
}