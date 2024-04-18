import add from "@/libs/user/addUser";
import { studentData } from "@/type";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@nextui-org/react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { EditIcon } from "../icons/table/edit-icon";
import getuserbysid from "@/libs/getUserBysid";
import editUser from "@/libs/user/editUser";

export const EditStudentAdmin = (sid: any) => {
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
    const res = await getuserbysid(sid.sid) as studentData
    setRawData(res)
    return setData(res)
  }, [])

  useEffect(() => {
    getData()
  }, [getData]);
  
  const submit = async() => {
    console.log("clicked")
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
    const res = await editUser(data, false, rawData.studentId)
    console.log(res)
    if (res) {
      Toast.fire({ icon: 'success', title: 'สำเร็จ' })
      return setTimeout(() => window.location.reload(), 1020)
    }

    // setIsClicked(false)
    // return Toast.fire({ icon: 'error', title: 'มีนักเรียนคนนี้อยู่ในระบบแล้ว' })
  }

  return (
    <div>
      <>
        <Tooltip content="Edit user" color="secondary">
              <button onClick={onOpen}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                แก้ไขนักเรียน
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input value={data.name} onInput={inputHandler} name="name" label="ชื่อ" variant="flat" labelPlacement={"outside"} placeholder="ชื่อ"/>
                      <Input value={data.surname} onInput={inputHandler} name="surname" label="นามสกุล" variant="flat" labelPlacement={"outside"} placeholder="นามสกุล"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input value={data.studentId.toString()} onInput={inputHandler} name="studentId" label="เลขประจำตัวนักเรียน" variant="flat" labelPlacement={"outside"} placeholder="เลขประจำตัวนักเรียน"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input value={data.yearClass.toString()} onInput={inputHandler} name="yearClass" label="ชั้น" variant="flat" labelPlacement={"outside"} placeholder="ชั้น"/>
                      <Input value={data.Class.toString()} onInput={inputHandler} name="Class" label="ห้อง" variant="flat" labelPlacement={"outside"} placeholder="ห้อง"/>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input value={data.image} onInput={inputHandler} name="image" label="โปรไฟล์" variant="flat" labelPlacement={"outside"} placeholder="โปรไฟล์"/>
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
