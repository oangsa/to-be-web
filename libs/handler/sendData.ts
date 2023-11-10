"use server"
import prisma from '@/libs/prismadb'

export default async function sendData (req: { name:string; surname:string; other:string; oldMonth: number }) {
    const { name, surname, other, oldMonth } = req
    const msg = `message=\n<มีผู้เข้าใช้ศูนย์เพื่อนใจ>\nชื่อ: ${name} ${surname}\nเพราะ: ${other}\nเวลา: ${`${new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[0]}:${new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[1]}`} น.`;
    const oldData: any = await prisma.student.findFirst({
        where: {
            surname: surname,
            name: name
        }
    })
    
    const oldCount: any = await prisma.count.findFirst()

    const updateStudent = await prisma.student.update({
        where: {
            id: oldData.id
        },
        data: {
            reason: other,
            total: oldData.total + 1,
            oldMonth: oldData.oldMonth + 1,
            timestamps: new Date()
        }
    })
    var uptMonth: any = oldCount.graphMonth
    uptMonth[(oldData.yearClass - 1).toString()] = uptMonth[(oldData.yearClass - 1).toString()] + 1
    var uptTotal: any = oldCount.graphToTal
    uptTotal[(oldData.yearClass - 1).toString()] = uptTotal[(oldData.yearClass - 1).toString()] + 1

    const updateCount = await prisma.count.update({
        where: {
            id: oldCount.id
        },
        data: {
            curDay: oldCount.curDay + 1,
            curMonth: oldCount.curMonth + 1,
            curTotal: oldCount.curTotal + 1,
            graphMonth: uptMonth,
            graphToTal: uptTotal
        }
    })
    console.log(updateCount)
    console.log(updateStudent)
    const response = await fetch("https://notify-api.line.me/api/notify", {
        mode: "cors",
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.LINE_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: msg,
    });

    return 
}
