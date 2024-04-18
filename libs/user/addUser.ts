"use server"
import prisma from '@/libs/prismadb'
import { studentData } from '@/type';
import getuserbysid from '../getUserBysid';

export default async function add(data:studentData) {

    const { name, surname, studentId,  yearClass,  Class, image } = data
    const isUserConflict = await getuserbysid(parseInt(studentId.toString()))
    console.log(isUserConflict)
    if (isUserConflict !== null) return "fail"
    const user = await prisma.student.create({
        data: {
            name: name,
            surname: surname,
            studentId: parseInt(studentId.toString()),
            yearClass: parseInt(yearClass.toString()),
            Class: parseInt(Class.toString()),
            username: `rs${studentId.toString()}@rajsima.ac.th`,
            password: studentId.toString(),
            reason: "",
            total: 0,
            oldMonth: 0,
            image: (image === "") ? "image" : image
        }
    })

    console.log(user)

    return "success"
    
}