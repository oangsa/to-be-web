import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Image } from "@nextui-org/react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter, usePathname } from "next/navigation";
import { BiSolidMedal } from 'react-icons/bi';
import ChangeLog from "./changeLog";
import { getCookie } from "cookies-next";
import * as jwt_decode from 'jwt-decode';
export const SidebarWrapper = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isCookie, setIsCookie] = useState<boolean>(false)

  function checkIsDev() {
    const s: any = getCookie('user-token') 
    if (s === undefined) return
    const token: any = s === undefined ? undefined : jwt_decode.jwtDecode(s, {header: true})
    setIsAdmin(token?.isAdmin === true ? true : false)
    return setIsCookie(true)

  }

  useEffect(() => {
      checkIsDev()
  }, [])
  
  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Image width={150} height={150} src={"https://i.ibb.co/ncJYhVf/Logo.png"} alt="company logo" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title="ทั่วไป">
                <SidebarItem
                  title="หน้าหลัก"
                  icon={<HomeIcon />}
                  isActive={pathname === '/'}
                  href="/"
                />
                {/* {isCookie && <SidebarItem
                  isActive={pathname === '/setting'}
                  title="ตั้งค่า"
                  icon={<SettingsIcon />}
                  href='/setting'
                />} */}
                {/* <SidebarItem
                  isActive={pathname === '/chat'}
                  title="แชท"
                  icon={<ChatIcon />}
                  href='/chat'
                /> */}
            </SidebarMenu>

            {isCookie && <SidebarMenu title="กิจกรรม">
                <SidebarItem
                  title="ทูบีนัมเบอร์วัน ไอดอล"
                  icon={<BiSolidMedal width="24" height="24" />}
                  isActive={pathname === '/idol/registeration'}
                  href="/idol/registeration"
                />
            </SidebarMenu>}
            
            {isAdmin && <SidebarMenu title="แอดมิน">
                <SidebarItem
                  isActive={pathname === '/admin/list'}
                  title="รายชื่อนักเรียน"
                  icon={<AccountsIcon />}
                  href="/admin/list"
                />
                <SidebarItem
                  isActive={pathname === '/admin/idollist'}
                  title="รายชื่อผู้สมัครกิจกรรม"
                  icon={<AccountsIcon />}
                  href="/admin/idollist"
                />
                {/* <SidebarItem
                  isActive={pathname === '/admin/dashboard'}
                  title="แผงควบคุม"
                  icon={<DashboardIcon />}
                  href="/admin/dashboard"
                /> */}
            </SidebarMenu>}
            <SidebarMenu title="อัพเดต">
                <ChangeLog/>
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <p className="text-xs">Developed With ❤️ By: Suthang Sukrueangkun</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
