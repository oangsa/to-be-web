"use server"
import prisma from '@/libs/prismadb'

export default async function getRegList() {
    const user = await prisma.registeration.findMany({
        include : {
            student: true
        }
    })
    
    return user
}