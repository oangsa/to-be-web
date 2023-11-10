"use server"
import prisma from '@/libs/prismadb'

export default async function idolSubmitHandler(reg: {name: string, surname: string, studentId: number, yearClass: number, Class: number, age: number, height: number, weight: number, gpax: number, other: string, isDrug: boolean}, auth: {username: string, password: string}) {

    console.log(reg.name, reg.surname)


    if (reg.age > 18 || reg.age < 15) return false
    if (reg.height < 170) return false
    if (reg.gpax < 275) return false

    const user = await prisma.student.findFirst({
        where: {
            username: auth.username,
            password: auth.password
        }
    })

    const id = user?.id as string


    try {
        const createRegis = await prisma.registeration.create({
            data: {
                userId: id,
                age: reg.age,
                Height: reg.height,
                Weight: reg.weight,
                Gpax: reg.gpax,
                talent: reg.other,
                isDrug: reg.isDrug
            }
        })
    } catch (err) {
        return false
    }

    await prisma.student.update({
        where: {
            id: user?.id
        },
        data: {
            name: reg.name === user?.name ? user?.name : reg.name,
            surname: reg.surname === user?.surname ? user?.surname : reg.surname,
            studentId: reg.studentId === user?.studentId ? user?.studentId : reg.studentId,
            yearClass: reg.yearClass === user?.yearClass ? user?.yearClass : reg.yearClass,
            Class: reg.Class === user?.Class ? user?.Class : reg.Class
        }
    })

    return true
}