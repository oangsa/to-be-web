"use server"
import prisma from '@/libs/prismadb'

export default async function getList() {
    const user = await prisma.student.findMany()
    var a: any = []
    user.map((item: object) => {
        a.push(item)
    })
    // console.log(a)
    return a;
}