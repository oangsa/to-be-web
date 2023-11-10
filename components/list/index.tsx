import { Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { TableWrapper } from "../table/table";
import { AddStudent } from "./add-student";

export const Accounts = () => {
  return (
    <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>หน้าหลัก</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>ผู้ดูแล</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>รายชื่อนักเรียน</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">รายชื่อนักเรียน</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddStudent />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
  );
};
