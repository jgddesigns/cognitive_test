import React from 'react'
import './globals.css'
import Image from 'next/image'
import {Button, ButtonGroup} from "@nextui-org/react"
import Connect from "../database/Dynamo"
import VerbalLearning from "../tests/VerbalLearning"
import ReactionTime from "../tests/ReactionTime"
import NumberVigilance from '@/tests/NumberVigilance'
import ChoiceReaction from '@/tests/ChoiceReaction'
import MemoryScanning from '@/tests/MemoryScanning'
import PictureRecognition from '@/tests/PictureRecognition'
import DigitVigilance from '@/tests/DigitVigilance'
import WorkingMemory from '@/tests/WorkingMemory'
import MotorFunction from '@/tests/MotorFunction'
import WordRecognition from '@/tests/WordRecognition'
import MainPage from '@/screens/MainPage'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-lg lg:flex">

        {/* TEST AREA FOR DIFFERENT COMPONENTS (SHOWS ON MAIN PAGE) */}
        
        {/* <Connect/> */}
        {/* <VerbalLearning/> */}
        {/* <ReactionTime/> */}
        {/* <NumberVigilance/> */}
        {/* {<ChoiceReaction/>} */}
        {/* {<MemoryScanning/>} */}
        {/* {<PictureRecognition/>} */}
        {/* {<DigitVigilance/>} */}
        {/* {<WorkingMemory/>} */}
        {/* {<MotorFunction/>} */}
        {/* {<WordRecognition/>} */}
        <MainPage/>
      </div>
    </main>
  )
}
