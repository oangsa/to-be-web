"use server"
import prisma from '@/libs/prismadb'

export default async function getUser(username: string, password: string) {
    const user = await prisma.student.findFirst({
        where: {
            username: username,
            password: password
        }
    })
    // console.log(user)
    return user
}