import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
// import loginHandler from '@/libs/loginHandler'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure, user } from '@nextui-org/react';
import Swal from 'sweetalert2'
// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Inter, Kanit } from 'next/font/google'
import { EyeFilledIcon } from '../icons/navbar/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../icons/navbar/EyeSlashFilledIcon';
import loginHandler from '@/libs/handler/loginHandler';
import { getJwtSecretKey } from '@/libs/auth';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { setCookie } from 'cookies-next';
import getToken from '@/libs/token';
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

export default function LOginModal() {
//   const router: AppRouterInstance = useRouter()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [isVisible, setIsVisible] = React.useState(false);
    const thirtydays = 30 * 24 * 60 * 60 * 1000
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const submit = async () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })
    setIsClicked(true)
    // console.log(await loginHandler(data.username, data.password))
    const res = await loginHandler(data.username, data.password)
    if (res === null) {
      setIsClicked(false)
    //   setVisible(false);
      return Toast.fire({ icon: 'error', title: 'Username or Password is invalid.' })
    }
    

    const token = await getToken(res)

    setCookie('user-token', token, { maxAge: thirtydays })

    setData({
        username: '',
        password: ''
    })

    Toast.fire({ icon: 'success', title: 'Authenticated' })

    return setTimeout(() => window.location.reload(), 3010)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({...prev, [name]: value}))
    }


    return (
        <>
            <div>
                <Button color={'secondary'} onClick={() => onOpen()}>ลงชื่อเข้าใช้</Button>
                <Modal placement="top-center" className={kanit.className} isOpen={isOpen} onOpenChange={onOpenChange} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody>
                                    <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            📝 ลงชื่อเข้าใช้
                                        </h3>
                                    </div>                
                                    <Input onInput={handleChange} value={data.username} label='ชื่อผู้ใช้' name="username" fullWidth placeholder="rsxxxxx@rajsima.ac.th" />
                                    <Spacer/>
                                    <Input endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"} onInput={handleChange} value={data.password} label='รหัสผ่าน (เลขประจำตัวนักเรียน)' name="password" fullWidth placeholder="•••••" />
                                </ModalBody>
                                <ModalFooter>
                                {
                                isClicked === false && 
                                <Button color="danger" onPress={onClose}>
                                    ปิด
                                </Button>
                                }
                                {
                                isClicked === true ? 
                                <Button isLoading disabled color='default'></Button> :
                                <Button color='primary' onPress={submit}>
                                    ลงชื่อเข้าใช้
                                </Button>
                                }
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                    
                </Modal>
            </div>
        </>
    )
}