"use server"
import prisma from '@/libs/prismadb'
import { studentData } from '@/type'
import loginHandler from '../handler/loginHandler'
import { cookies } from 'next/headers'
export default async function editUser(data: studentData, isUserUpdate: boolean, updateUser: number) {
    const { name, surname, yearClass, studentId, Class, username, password, image } = data
    var pass = false

    const c_1 = (name === "" || surname === "" || yearClass.toString() === "" || Class.toString() === "" || username === "" || password === "" || studentId.toString() === "" || image === "")
    const c_2 = (name === undefined || surname === undefined || yearClass === undefined || Class === undefined || username === undefined || password === undefined || studentId === undefined || image === undefined)
    console.log(c_2)

    if (c_1 && isUserUpdate === false ) return false
    if (c_2 && isUserUpdate === false ) return false
    
    if (c_1 && isUserUpdate === true ) return false
    if (c_2 && isUserUpdate === true ) return false
    
    const check:any[] = await prisma.student.findMany({
        where: {
            username: username
        }
    })
    const oldData:any = await await prisma.student.findFirst({
        where: {
            studentId: updateUser
        }
    })
    
    if ( check.length > 1 && isUserUpdate === false) {var pass = !(check[0].username === username && oldData.username !== username)}
    else if ( check.length > 1 && isUserUpdate === true ) {var pass = false}
    else var pass = true
    
    if ( !pass ) return false
    console.log("Pass2")

    const profile = image === '' ? oldData.image : image

    if ( isUserUpdate === false ) {
        const a = await prisma.student.update(
            {
                where: {
                    studentId: updateUser
                }, 
                data: 
                {
                    name: name, 
                    surname: surname, 
                    yearClass: yearClass, 
                    Class: Class, 
                    studentId: studentId, 
                    username: username, 
                    password: password, 
                    image: profile
                }
            }
        )
        return true
        
    }
    if ( isUserUpdate === true ) {
        await prisma.student.update(
            {
                where: {
                    studentId: updateUser
                }, 
                data: {
                    name: name, 
                    surname: surname, 
                    yearClass: yearClass, 
                    Class: Class, 
                    studentId: studentId, 
                    username: username, 
                    password: password, 
                    image: profile
                }
            }
        )
        await cookies().delete('user-token')
        return true
    }

    
    
}