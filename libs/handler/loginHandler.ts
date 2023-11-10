"use server"
import prisma from '@/libs/prismadb'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '../auth'
import { setCookie } from 'cookies-next';

export default async function loginHandler(username: string, password: string) {
    // const dbUrl = process.env.old_db as string
    const thirtydays = 30 * 24 * 60 * 60 * 1000
    var isAdmin = false
    if (username === "admin" && password === "password") isAdmin = true
    const user = await prisma.student.findFirst({
        where: {
            username: username,
            password: password
        }
    })
    if (!user) return null
    console.log(user)
    const token = await new SignJWT({})
            .setProtectedHeader({ alg: 'HS256', studentId: user.studentId , username: user.username, password: user.password, isAdmin: isAdmin === true ? true : false })
            .setJti(nanoid())
            .setExpirationTime('30 days')
            .sign(new TextEncoder().encode(getJwtSecretKey()))

    try {
        setCookie('user-token', token, { maxAge: thirtydays })
    } catch (err) {
        console.log(err)
    }
    

    return user
}