'use client'
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
import Tests from '@/screens/Tests'

export default function Home() {

  const main_class = ["flex min-h-screen flex-col items-center justify-between p-24"
, "flex min-h-screen flex-col items-center justify-between p-24 h-[100%] w-[100%]  relative"]
  const [MainClass, setMainClass] = React.useState(main_class[0])

  const header_text = ["Test Info", "Home"]
  const [HeaderText, setHeaderText] = React.useState(header_text[0])
  const link_class = ["text-blue-600", "text-gray-600 font-bold underline"]
  const [LinkClass, setLinkClass] = React.useState(link_class[0])
 
  const [ShowPopover, setShowPopover] = React.useState(false)
  const [ShowTestInfo, setShowTestInfo] = React.useState(false)
  const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false)
  const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false)
  const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false)
  const [ShowMotorFunction, setShowMotorFunction] = React.useState(false)
  const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false)
  const [ShowPictureRecognition, setShowPictureRecognition] = React.useState(false)
  const [ShowReactionTime, setShowReactionTime] = React.useState(false)
  const [ShowVerbalLearning, setShowVerbalLearning] = React.useState(false)
  const [ShowWordRecognition, setShowWordRecognition] = React.useState(false)
  const [ShowWorkingMemory, setShowWorkingMemory,] = React.useState(false)


  const [TestID, setTestID] = React.useState(-1)
  const [TestTitle, setTestTitle] = React.useState("")
  const [PopoverMessage, setPopoverMessage] = React.useState("")

  function hide_popover(){
    setShowPopover(false)
    setMainClass(main_class[0])
    setPopoverMessage("")
    setTestTitle("")
  }

  function toggle_tests(){
    clear_tests()
    setShowTestInfo(!ShowTestInfo)
    LinkClass == link_class[0] ? setLinkClass(link_class[1]) : setLinkClass(link_class[0])
    HeaderText == header_text[0] ? setHeaderText(header_text[1]) : setHeaderText(header_text[0])
  }

  function clear_tests(){
    var test_types = [        
      setShowChoiceReaction, setShowDigitVigilance, setShowMemoryScanning, setShowMotorFunction, setShowNumberVigilance, setShowPictureRecognition,setShowReactionTime, setShowVerbalLearning, setShowWordRecognition,setShowWorkingMemory
    ]

    for(var i=0; i<test_types.length; i++){
      test_types[i](false)
    }
  }

  function take_test(){
    setLinkClass(link_class[0])
    setShowPopover(false)
    setShowTestInfo(false)

    clear_tests()


    switch (TestID){
      case 1:
        setShowChoiceReaction(true)
        break
      case 2:
        setShowDigitVigilance(true)
        break
      case 3:
        setShowMemoryScanning(true)
        break
      case 4:
        setShowMotorFunction(true)
        break
      case 5:
        setShowNumberVigilance(true)
        break
      case 6:
        setShowPictureRecognition(true)
        break
      case 7:
        setShowReactionTime(true)
        break
      case 8:
        setShowVerbalLearning(true)
        break
      case 9:
        setShowWordRecognition(true)
        break
      case 10:
        setShowWorkingMemory(true)
        break
    }
  }

  return (
    <main className={MainClass}>
      <div className="z-1 max-w-5xl w-full items-center font-mono text-lg grid grid-auto-rows">
        <div>        
          <span onClick={toggle_tests} className={LinkClass}>{HeaderText}</span>
        </div>

        <div className="mt-24">
          {ShowTestInfo ?
            <Tests setMainClass={setMainClass} main_class={main_class} setShowPopover={setShowPopover} setPopoverMessage={setPopoverMessage} setTestTitle={setTestTitle} setTestID={setTestID}/>
          : null}

          {ShowChoiceReaction ?
            <ChoiceReaction/>
          : null}

          {ShowDigitVigilance ?
            <DigitVigilance/>
          : null}

          {ShowMemoryScanning ?
            <MemoryScanning/>
          : null}
        
          {ShowMotorFunction ?
            <MotorFunction/>
          : null}

          {ShowNumberVigilance ?
            <NumberVigilance/>        
          :null}

          {ShowPictureRecognition ?
            <PictureRecognition/>        
          :null}

          {ShowReactionTime ?
            <ReactionTime/>        
          :null}

          {ShowVerbalLearning ?
            <VerbalLearning/>        
          :null}

          {ShowWordRecognition ?
            <WordRecognition/>        
          :null}

          {ShowWorkingMemory ?
            <WorkingMemory/>        
          :null}
        </div>
      </div>


      {ShowPopover ?
        <div className="w-full h-full flex justify-center items-center absolute top-0 z-2 bg-black opacity-65">
        </div>
      : null}

      {ShowPopover ?
        <div className="h-[50%] w-[30%] z-99 absolute top-[20%] left-[35%] bg-blue-400 rounded-2xl text-white">
          <div className="p-12 grid grid-auto-rows">
            <div className="text-3xl">
                {TestTitle}
            </div>
            <div className="mt-36 text-xl">
                {PopoverMessage}
            </div>
            <div className="underline cursor-pointer mt-[10%]" onClick={take_test}>
              Take Test
            </div>
            <div className="flex flex-col w-full mt-[30%] underline cursor-pointer" onClick={e => hide_popover()}>
                Close
            </div>
          </div>
        </div>
      : null}

    </main>

  )
}
