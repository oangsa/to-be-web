'use client';

import getDataByCookie from "@/libs/getDataByCookie";
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Spacer } from "@nextui-org/react";
import hasCookie from "@/libs/hasCookie";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import idolSubmitHandler from "@/libs/handler/idolHandler";

export default function IdolRegisteration() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    name: "",
    surname: "",
    studentId: 0,
    yearClass: 0,
    Class: 0,
    age: 0,
    height: 0,
    weight: 0,
    gpax: 0,
    other: "",
  });

  const [loginData, setLoginData] = useState<any>({
    username: "",
    password: ""
  }) 

  const checkRegister = async () => {
    if (!hasCookie("user-token")) return
    const res = await getDataByCookie()
    if (res?.Registeration !== null) {
      setIsRegister(true)
      return console.log(isRegister)
    }
  }


  const getD = async () => {
    if (!hasCookie("user-token")) return
    const res = await getDataByCookie()
    const isDrug = res?.Registeration?.isDrug as boolean
    setIsSelected(isDrug)
    setLoginData({
      username: res?.username,
      password: res?.password
    })
    return setData({
      name: res?.name,
      surname: res?.surname,
      studentId: res?.studentId,
      yearClass: res?.yearClass,
      Class: res?.Class,
      age: isRegister ? res?.Registeration?.age : 0,
      height: isRegister ? res?.Registeration?.Height : 0,
      weight: isRegister ? res?.Registeration?.Weight : 0,
      gpax: isRegister ? res?.Registeration?.Gpax : 0,
      other: isRegister ? res?.Registeration?.talent : "",
    })
  }
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log("fetching");
      checkRegister()
      getD()
    }
  }, []);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "other") return setData((prev: any) => ({...prev, [name]: value}))
    if (!isNaN(parseInt(value))) setData((prev: any) => ({...prev, [name]: parseInt(value)}))
    if (isNaN(parseInt(value))) setData((prev: any) => ({...prev, [name]: value}))
    console.log( name, value )
  }

  async function submitHandler() {
    setIsClicked(true)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    
    const send = {
      name: data.name,
      surname: data.surname,
      studentId: data.studentId,
      yearClass: data.yearClass,
      Class: data.Class,
      age: data.age,
      height: data.height,
      weight: data.weight,
      gpax: data.gpax,
      other: data.other,
      isDrug: isSelected
    }

    if (!await idolSubmitHandler(send, loginData)) {
      setIsClicked(false)
      return await Toast.fire({ icon: 'error', title: 'ไม่สำเร็จ', text: 'ไม่ผ่านเกณฑ์ขั้นต่ำ'})
    }

    await Toast.fire({ icon: 'success', title: 'สมัครสำเร็จ!' })

    return setTimeout(() => window.location.reload(), 1500)
  }


  return (
    <>
    {
      !isRegister ? 
      <>
        <Card className="mx-12 lg:my-5 md:my-4 my-2">
          <CardHeader>
            <span className="lg:text-2xl text-black">
              📝 ข้อมูลทั่วไป
            </span>
            <Spacer />
            <span className="lg:text-sm text-red-500">
              *ถ้าข้อมูลผิดพลาดให้แก้ไขให้เรียบร้อย*
            </span>
          </CardHeader>
          <CardBody className="gap-5">
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.name}  fullWidth name='name' labelPlacement="outside" label='ชื่อ' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.surname}  fullWidth name='surname' labelPlacement="outside" label='นามสกุล' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.studentId.toString()}  fullWidth name='studentId' labelPlacement="outside" label='เลขประจำตัว' />
            </div>
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.yearClass.toString()}  fullWidth name='yearClass' labelPlacement="outside" label='ชั้น' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.Class.toString()}  fullWidth name='Class' labelPlacement="outside" label='ห้อง' />
            </div>
          </CardBody>
        </Card>
        <Card className="mx-12 lg:my-5 md:my-4 my-2">
          <CardHeader>
            <span className="lg:text-2xl text-black">
              📝 ข้อมูลประกอบการสมัคร
            </span>
          </CardHeader>
          <CardBody className="gap-5">
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.age.toString()} fullWidth name='age' label='อายุ' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.height.toString()} fullWidth name='height' label='ความสูง (เซนติเมตร)' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.weight.toString()} fullWidth name='weight' label='น้ำหนัก (กิโลกรัม)' />
              <Input className="mb-4" onInput={inputHandler} type="text" value={data.gpax.toString()} fullWidth name='gpax' label='เกรดเฉลี่ยเทอมที่แล้ว (ใส่หลักร้อย เช่น 3.48 -> 348)' />
            </div>
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input onInput={inputHandler} type="text" value={data.other} fullWidth name='other' label='ความสมารถพิเศษ' placeholder="ร้องเพลงได้, เต้นได้, อื่นๆ" />
            </div>
            <div className="lg:flex lg:gap-12">
              <Checkbox name="isDrug" isSelected={isSelected} onValueChange={setIsSelected}>มีประวัติการติดสารเสพติดมาก่อนหรือไม่?</Checkbox>
            </div>
            <Spacer y={1} />
            <span className="text-xs text-red-500">* คำเตือน เมื่อกดยืนยันแล้วข้อมูลจะส่งทันที</span>
            {!isRegister ? (
              isClicked ? <Button isDisabled isLoading></Button> : <Button color="primary" onPress={submitHandler}>บันทึก</Button>
            ) :
              <Button color="default" isDisabled>ลงทะเบียนสำเร็จ</Button>}
          </CardBody>
        </Card>
      </> 
      : 
      <>
        <Card className="mx-12 lg:my-5 md:my-4 my-2">
          <CardHeader>
            <span className="lg:text-2xl text-black">
              📝 ข้อมูลทั่วไป
            </span>
            <Spacer />
            <span className="lg:text-sm text-red-500">
              *ถ้าข้อมูลผิดพลาดให้แก้ไขให้เรียบร้อย*
            </span>
          </CardHeader>
          <CardBody className="gap-5">
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input className="mb-2" isDisabled onInput={inputHandler} type="text" value={data.name}  fullWidth name='name' labelPlacement="outside" label='ชื่อ'/>
              <Input className="mb-2" isDisabled onInput={inputHandler} type="text" value={data.surname}  fullWidth name='surname' labelPlacement="outside" label='นามสกุล'/>
              <Input className="mb-2" isDisabled onInput={inputHandler} type="text" value={data.studentId.toString()}  fullWidth name='studentId' labelPlacement="outside" label='เลขประจำตัว'/>
            </div>
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input onInput={inputHandler} isDisabled type="text" value={data.yearClass.toString()}  fullWidth name='yearClass' labelPlacement="outside" label='ชั้น'/>
              <Input onInput={inputHandler} isDisabled type="text" value={data.Class.toString()}  fullWidth name='Class' labelPlacement="outside" label='ห้อง'/>
            </div>
          </CardBody>
        </Card>
        <Card className="mx-12 lg:my-5 md:my-4 my-2">
          <CardHeader>
            <span className="lg:text-2xl text-black">
              📝 ข้อมูลประกอบการสมัคร
            </span>
          </CardHeader>
          <CardBody className="gap-5">
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input onInput={inputHandler} isDisabled type="text" value={data.age.toString()} fullWidth name='age' label='อายุ'/>
              <Input onInput={inputHandler} isDisabled type="text" value={data.height.toString()} fullWidth name='height' label='ความสูง (เซนติเมตร)'/>
              <Input onInput={inputHandler} isDisabled type="text" value={data.weight.toString()} fullWidth name='weight' label='น้ำหนัก (กิโลกรัม)'/>
              <Input onInput={inputHandler} isDisabled type="text" value={data.gpax.toString()} fullWidth name='gpax' label='เกรดเฉลี่ยเทอมที่แล้ว (ใส่หลักร้อย เช่น 3.48 -> 348)'/>
            </div>
            <div className="justify justify-center lg:flex lg:gap-12">
              <Input onInput={inputHandler} isDisabled type="text" value={data.other} fullWidth name='other' label='ความสมารถพิเศษ' placeholder="ร้องเพลงได้, เต้นได้, อื่นๆ"/>
            </div>
            <div className="lg:flex lg:gap-12">
              <Checkbox name="isDrug" isDisabled isSelected={isSelected} onValueChange={setIsSelected}>มีประวัติการติดสารเสพติดมาก่อนหรือไม่?</Checkbox>
            </div>
            <Spacer y={1}/>
            <span className="text-xs text-red-500">* คำเตือน เมื่อกดยืนยันแล้วข้อมูลจะส่งทันที</span>
            {
              !isRegister ? (
                isClicked ? <Button isDisabled isLoading></Button> : <Button color="primary" onPress={submitHandler}>บันทึก</Button>
              ) : 
              <Button color="default" isDisabled >ลงทะเบียนสำเร็จ</Button>
            }
          </CardBody>
        </Card>
      </>
    }
    </>
  )
}
