"use client"
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardBody, Link } from "@nextui-org/react";
import { UsetageCard } from "./usetageCard";
import { GreetCard } from "./greetCard";
import getDataByCookie from "@/libs/getDataByCookie";
import hasCookie from "@/libs/hasCookie";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => {
  const [data, setData] = useState<any>()

  const getD = async () => {
    if (!hasCookie("user-token")) return
    const res = await getDataByCookie()
    return setData(res)
  }
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log("fetching");
      getD()
    }
  }, []);
  
  return (
    <div className=" h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0 xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">ข้อมูล</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <UsetageCard props={data}/>
              <GreetCard props={data}/>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
          <div className="flex  flex-wrap justify-between">
            <h3 className="text-center text-xl font-semibold">ประกาศ</h3>
          </div>
          <Card>
            <CardBody className="p-5">
              <p>{">"} รับสมัคร To Be Number One Idol ปีการศึกษา 2566 ตั้งแต่วันนี้ ถึง 18 ธ.ค 2566 <Link href="/idol/registeration">สมัคร </Link></p> 
            </CardBody>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}