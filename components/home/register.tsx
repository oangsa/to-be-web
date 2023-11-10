import React, {ChangeEvent, useState} from 'react'
import { ModalFooter, ModalBody, useDisclosure, ModalContent } from "@nextui-org/react";
import { Modal, Button, Input, Spacer } from "@nextui-org/react";
import Swal from 'sweetalert2';
import { Kanit } from 'next/font/google'
import sendData from '@/libs/handler/sendData';
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

interface leaveModal {
    name: string,
    surname: string,
    month: number
}

interface leaveFrom {
    other: string
    reason: string
}

function Registeration({name, surname, month}:leaveModal) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [data, setData] = useState<leaveFrom>({
        reason: "เลือกเหตุผล",
        other: ""
    })

    const reason = data.reason === "อื่นๆ" ? data.other : data.reason
    
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({...prev, [name]: value}))
        console.log( name, value )
    }


    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setData((prev) => ({...prev, [name]: value}))
    }

    async function submit() {
        setIsClicked(true)
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
        

        if (reason === "" || reason === "เลือกเหตุผล") return await Toast.fire({ icon: 'error', title: 'Faild!'})

        const res = await sendData({ name: name,surname: surname, other: reason, oldMonth: month })

        setIsClicked(false)
        // if (await res.status !== 200) await Toast.fire({ icon: 'error', title: 'Faild!'})
        setData({
            other: "",
            reason: ""
        })
        return await Toast.fire({ icon: 'success', title: 'Done!' })
        // Swal.fire({
        //     title: 'แน่ใจนะ?',
        //     icon: 'warning',
        //     showCancelButton: true ,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes'
        //   }).then(async (result) => {
        //     if (result.isConfirmed) {
                
        //     }
        //   })
    }

    return (
        <div>
            <Button color={'primary'} onClick={onOpen}>ลงทะเบียน</Button>
            <Modal className={kanit.className} isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
                    {(onClose) => (
                        <>
                           <ModalBody>
                                <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        📝 ลงทะเบียน
                                    </h3>
                                </div>                
                                <Input readOnly value={name} label='ชื่อ' name="name" fullWidth placeholder="นราวิชญ์" />
                                <Input readOnly value={surname} label='นามสกุล' name="surname" fullWidth placeholder="ใจรักมั่น" />
                                <Spacer y={1}/>
                                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-900 dark:text-white">ระบุเหตุผล</label>
                                    <select onChange={handleSelect} value={data.reason} name="reason" id="reason" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option disabled>เลือกเหตุผล</option>
                                        <option value="ปรับทุกข์">ปรับทุกข์</option>
                                        <option value="สร้างสุข">สร้างสุข</option>
                                        <option value="แก้ไขปัญหา">แก้ไขปัญหา</option>
                                        <option value="พัฒนา EQ">พัฒนา EQ</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select> 
                                </div>
                                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                                    { data.reason !== "อื่นๆ" ? "" : 
                                        <div>
                                            <label htmlFor="other" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">โปรดระบุ</label>
                                            <input value={data.other} onChange={inputHandler} type="text" name="other" id="other" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ติดเกม..." required />
                                        </div>
                                    }
                                </div>                                     
                            </ModalBody>
                            <ModalFooter>
                            {
                                isClicked === false && 
                                <Button color="danger" onPress={() => onClose()}>
                                    ปิด
                                </Button>
                            }
                            {
                                isClicked === true ? 
                                <Button disabled isLoading></Button> :
                                <Button  onPress={submit}>
                                    ลงชื่อเข้าใช้
                                </Button>
                            }
                            </ModalFooter> 
                        </>
                    )}
                </ModalContent>
                
            </Modal>
        </div>
    )
}

export default Registeration