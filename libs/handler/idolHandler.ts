"use server"
import prisma from '@/libs/prismadb'

export default async function idolSubmitHandler(reg: {name: string, surname: string, studentId: number, yearClass: number, Class: number, age: number, height: number, weight: number, gpax: number, other: string, isDrug: boolean}, auth: {username: string, password: string}) {

    const msg = `message=\n<มีผู้สมัคร ทูบีนัมเบอร์วันไอดอล>\nชื่อ: ${reg.name} ${reg.surname}\nชั้น: ม.${reg.yearClass}/${reg.Class}\nอายุ: ${reg.age} ปี\nสูง: ${reg.height} ซม.\nน้ำหนัก: ${reg.weight} กก.\nเกรดเฉลี่ย: ${reg.gpax/100}\nความสามารถพิเศษ: ${reg.other}\n${reg.isDrug ? "มีประวัติการใช้สารเสพติด":"ไม่มีประวัติการใช้สารเสพติด"}`;

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

    const response = await fetch("https://notify-api.line.me/api/notify", {
        mode: "cors",
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.LINE_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: msg,
    });

    return true
}