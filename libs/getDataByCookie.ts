import { getCookie } from "cookies-next"
import * as jwt_decode from 'jwt-decode';
import getuserbysid from "./getIdolBysid"

export default async function getDataByCookie() {
    const s: any = getCookie('user-token') 
    if (s === undefined) return undefined
    const token: any = s === undefined ? undefined : jwt_decode.jwtDecode(s, {header: true})
    // console.log("test", token.studentId)
    const a = await getuserbysid(token.studentId)
    return await a
}