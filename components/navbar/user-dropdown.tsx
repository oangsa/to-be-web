import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem, } from "@nextui-org/react";
import React from "react";
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from "cookies-next";
import Swal from "sweetalert2";
interface props {
  image: string,
  name: string
}

export const UserDropdown = ({image, name}: props) => {
  const router = useRouter()
  const pathname = usePathname()
  var url = image

  if ( image === 'url' || image === '' ) url = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

  async function logoutClicked() {
    Swal.fire({
      title: 'ยืนยันที่จะลงชื่อออก?',
      icon: 'warning',
      showCancelButton: true ,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteCookie("user-token")
        setTimeout(() => window.location.reload(), 1000)
        return
      }
    })
 }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src={url}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => {
          if (actionKey === 'logout') return logoutClicked()
        }}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>ชื่อผู้ใช้งาน</p>
          <p>{name}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
           Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
