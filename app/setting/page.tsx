"use client"
import { Button, Divider, Input } from '@nextui-org/react'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import editUser from '@/libs/user/editUser';
import { studentData } from '@/type';
import Swal from 'sweetalert2';
import getDataByCookie from '@/libs/getDataByCookie';
import loginHandler from '@/libs/handler/loginHandler';
import getToken from '@/libs/token';
import { setCookie } from 'cookies-next';
import { EyeFilledIcon } from '@/components/icons/navbar/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/navbar/EyeSlashFilledIcon';

export default function Settings() {
  const thirtydays = 30 * 24 * 60 * 60 * 1000
  const [data, setData] = useState<studentData>({
    id: "",
    name: "",
    surname: "",
    studentId: 0,
    yearClass: 0,
    Class: 0,
    reason: "",
    total: 0,
    oldMonth: 0,
    timestamps: new Date(),
    username: "",
    password: "",
    image: "",
  });
  const [rawData, setRawData] = useState<studentData>({
    id: "",
    name: "",
    surname: "",
    studentId: 0,
    yearClass: 0,
    Class: 0,
    reason: "",
    total: 0,
    oldMonth: 0,
    timestamps: new Date(),
    username: "",
    password: "",
    image: "",
  });
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name == "studentId" || name == "yearClass" || name == "Class") {
        if (isNaN(parseInt(value)))
            return setData((prev) => ({...prev, [name]: 0}))
        return setData((prev) => ({...prev, [name]: parseInt(value)}))
    }
    setData((prev) => ({...prev, [name]: value}))
    console.log( name, value )
  }

  const getData = useCallback(async () => {
    const res = await getDataByCookie() as studentData
    setRawData(res)
    return setData(res)
  }, [])

  useEffect(() => {
    getData()
  }, [getData]);
  
  const submit = async() => {
    setIsClicked(true)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    })

    Swal.fire({
      title: 'แน่ใจนะ?',
      icon: 'warning',
      showCancelButton: true ,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsClicked(true)
        const res = await editUser(data, true, rawData.studentId)
        if (res) {
          const log = await loginHandler(data.username, data.password)
            if (log === null) {
              setIsClicked(false)
              return Toast.fire({ icon: 'error', title: 'Username or Password is invalid.' })
            }
        
          const token = await getToken(log)
    
          setCookie('user-token', token, { maxAge: thirtydays })
          Toast.fire({ icon: 'success', title: 'สำเร็จ' })
          return setTimeout(() => window.location.reload(), 1020)
        }
        setIsClicked(false)
        return Toast.fire({ icon: 'error', title: 'ข้อมูลต้องไม่เป็นช่องว่าง' })
      }
    })
    setIsClicked(false)
  }

  return (
    <div>
      <Card className='m-4'>
        <CardHeader>
          ⚙️ตั้งค่าทั่วไป
        </CardHeader>
        <div className='mx-3'>
          <Divider/>
        </div>
        <CardBody>
          <div className="flex flex-col gap-4 m-2">
            <Spacer/>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input onInput={inputHandler} value={data.name} name="name" label="ชื่อ" variant="flat" labelPlacement={"outside"} placeholder="ชื่อ"/>
              <Input value={data.surname} name="surname" label="นามสกุล" variant="flat" labelPlacement={"outside"} placeholder="นามสกุล"/>
            </div>
            <Spacer/>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input onInput={inputHandler} value={data.studentId.toString()} name="studentId" label="เลขประจำตัวนักเรียน" variant="flat" labelPlacement={"outside"} placeholder="เลขประจำตัวนักเรียน"/>
            </div>
            <Spacer/>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input onInput={inputHandler} value={data.yearClass.toString()} name="yearClass" label="ชั้น" variant="flat" labelPlacement={"outside"} placeholder="ชั้น"/>
              <Input onInput={inputHandler} value={data.Class.toString()} name="Class" label="ห้อง" variant="flat" labelPlacement={"outside"} placeholder="ห้อง"/>
            </div>
            <Spacer/>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input onInput={inputHandler} value={data.image} name="image" label="โปรไฟล์" variant="flat" labelPlacement={"outside"} placeholder="โปรไฟล์"/>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className='m-4'>
        <CardHeader>
          ⚙️ตั้งค่าชื่อผู้ใช้ และรหัสผ่าน
        </CardHeader>
        <div className='mx-3'>
          <Divider/>
        </div>
        <CardBody>
          <div className="flex flex-col gap-4 m-2">
            <Spacer/>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input onInput={inputHandler} value={data.username} name="username" label="ชื่อผู้ใช้งาน" variant="flat" labelPlacement={"outside"} placeholder="ชื่อผู้ใช้งาน"/>
              <Input endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
            }
            type={isVisible ? "text" : "password"} onInput={inputHandler} value={data.password} variant="flat" labelPlacement={"outside"} label='รหัสผ่าน' name="password" placeholder="รหัสผ่าน" />
            </div>
            <Spacer/>
          </div>
        </CardBody>
        <CardFooter>
        {
        isClicked === true ? 
        <Button isLoading disabled color='default'></Button> :
        <Button color='primary' onPress={submit}>
            บันทึก
        </Button>
        }
        </CardFooter>
      </Card>
    </div>
  )
}
