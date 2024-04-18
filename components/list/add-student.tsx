import add from "@/libs/user/addUser";
import { studentData } from "@/type";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

export const AddStudent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name == "studentId" || name == "yearClass") return setData((prev) => ({...prev, [name]: parseInt(value)}))
    setData((prev) => ({...prev, [name]: value}))
    console.log( name, value )
  }

  const submit = async() => {
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
    setIsClicked(true)
    const res = await add(data)
    if (res == "success") {
      Toast.fire({ icon: 'success', title: 'สำเร็จ' })
      return setTimeout(() => window.location.reload(), 1020)
    }

    setIsClicked(false)
    return Toast.fire({ icon: 'error', title: 'มีนักเรียนคนนี้อยู่ในระบบแล้ว' })
  }

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          เพิ่มนักเรียน
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  เพิ่มนักเรียน
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input onInput={inputHandler} name="name" label="ชื่อ" variant="flat" labelPlacement={"outside"} placeholder="ชื่อ"/>
                      <Input onInput={inputHandler} name="surname" label="นามสกุล" variant="flat" labelPlacement={"outside"} placeholder="นามสกุล"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input onInput={inputHandler} name="studentId" label="เลขประจำตัวนักเรียน" variant="flat" labelPlacement={"outside"} placeholder="เลขประจำตัวนักเรียน"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input onInput={inputHandler} name="yearClass" label="ชั้น" variant="flat" labelPlacement={"outside"} placeholder="ชั้น"/>
                      <Input onInput={inputHandler} name="Class" label="ห้อง" variant="flat" labelPlacement={"outside"} placeholder="ห้อง"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input onInput={inputHandler} name="image" label="โปรไฟล์" variant="flat" labelPlacement={"outside"} placeholder="โปรไฟล์"/>
                    </div>
                  </div>
                  
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    ยกเลิก
                  </Button>
                  <Button color="primary" onClick={submit}>
                    ยืนยัน
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
