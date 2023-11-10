"use client"
import { Button, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";
import Registeration from "../home/register";
import LoginModal from "./loginModal";
import hasCookie from "@/libs/hasCookie";
import getDataByCookie from "@/libs/getDataByCookie";



interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {

  const [isCookie, setHasCookie] = useState<boolean>(false)
  const [data, setData] = useState<any>()

  async function a (){
    const token: any = hasCookie("user-token")
    if (token === false) {
        await setHasCookie(false)
    }
    else {
        const a = await getDataByCookie()
        await setData(a)
        await setHasCookie(token === undefined ? false : true )
    }
  }

  useEffect(() => {
    a()
  }, [])
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden justify-center">
          <Button disabled size="sm" color='primary'>ประกาศ <FeedbackIcon/></Button>
          รับสมัคร To Be Number One Idol ปีการศึกษา 2566 ตั้งแต่วันที่ .... ถึง ....
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >

          <Link
            href="https://github.com/oangsa"
            target={"_blank"}
          >
            <GithubIcon />
          </Link>
          {isCookie === false ? 

          <NavbarContent>     
            <NavbarContent>
                <LoginModal/>
            </NavbarContent>
          </NavbarContent>

          :
          
          <NavbarContent>     
            <NavbarContent>
                <Registeration name={data.name} surname={data.surname} month={data.oldMonth}/>
            </NavbarContent>
            <NavbarContent>
                <UserDropdown name={`${data.name} ${data.surname}`} image={data.image} />
            </NavbarContent>
          </NavbarContent>

          }
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};

