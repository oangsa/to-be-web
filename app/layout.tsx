"use client"
import './globals.css'
import { Kanit } from 'next/font/google'
import React from 'react'
import { NextUIProvider} from '@nextui-org/react';
import {Layout} from "@/components/layout/layout"
import Head from 'next/head';

const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <Head>
          <title>To Be Number One</title>
        </Head>
        <body className={kanit.className}>
          <NextUIProvider>
            <Layout>
              {children}
            </Layout>
          </NextUIProvider>
        </body>
      </html>
    
  )
}