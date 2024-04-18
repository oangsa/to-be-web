"use server"
import prisma from '@/libs/prismadb'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '../auth'
import { setCookie } from 'cookies-next';
import { studentData } from '@/type'

export default async function loginHandler(username: string, password: string) {
    // const dbUrl = process.env.old_db as string
    console.log("Triggered")
    console.log(username)
    const thirtydays = 30 * 24 * 60 * 60 * 1000
    var isAdmin = false
    if (username === "admin" && password === "password") isAdmin = true
    const user = await prisma.student.findFirst({
        where: {
            username: username,
            password: password
        }
    }) as studentData
    if (!user) return null
    

    return user
}