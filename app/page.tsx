'use client';
import { Content } from "@/components/home/content";
import hasCookie from "@/libs/hasCookie";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    hasCookie("user-token")
  })
  return (
    <>
      <Content></Content>
    </>
  )
}
