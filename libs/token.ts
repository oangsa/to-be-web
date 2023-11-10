"use server"
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "./auth";

export default async function getToken (res: { studentId: any; username: any; password: any; }) {
    var isAdmin = false
    if (res.username === "admin" && res.password === "password") isAdmin = true
    const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256', studentId: res.studentId , username: res.username, password: res.password, isAdmin: isAdmin === true ? true : false })
    .setJti(nanoid())
    .setExpirationTime('30 days')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
    return token
}
