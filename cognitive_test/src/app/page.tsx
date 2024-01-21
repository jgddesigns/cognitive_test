import Image from 'next/image'
import {Button, ButtonGroup} from "@nextui-org/react"
import Connect from "../database/Connect"
import VerbalLearning from "../tests/VerbalLearning"
import React from 'react'
import './globals.css'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-lg lg:flex">

        {/* TEST AREA FOR DIFFERENT COMPONENTS (SHOWS ON MAIN PAGE) */}
        
        {/* <Connect/> */}
        <VerbalLearning/>

      </div>
    </main>
  )
}
