'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import Login from '@/components/Login';
import Signup from '@/components/Signup';


export default function DigitVigilance(props: any) {
    const [LoginClicked, setLoginClicked] = React.useState(false)
    const [SignupClicked, setSignupClicked] = React.useState(false)
    const [ShowPopover, setShowPopover] = React.useState(false)
    const [TestTitle, setTestTitle] = React.useState(false)
    const [PopoverMessage, setPopoverMessage] = React.useState("")
    const [Numbers, setNumbers] = React.useState<any[]>([])


    useEffect(() => {





    }, [])




    function login_handler(){
        setLoginClicked(!LoginClicked)
    }


    function signup_handler(){
        setSignupClicked(!SignupClicked)
    }

    function reset_page(){
        setLoginClicked(false)
        setSignupClicked(false)
    }


    function show_info(test: any){

        switch (test){
            case 1:
                setPopoverMessage("choice reaction message")
                break

            case 2:
                setPopoverMessage("digit vigilance message")
                break

            case 3:
                setPopoverMessage("memory scanning message")
                break

            case 4:
                setPopoverMessage("motor function message")
                break

            case 5:
                setPopoverMessage("number vigilance message")
                break

            case 6:
                setPopoverMessage("picture recognition message")
                break

            case 7:
                setPopoverMessage("reaction time message")
                break

            case 8:
                setPopoverMessage("verbal learning message")
                break

            case 9:
                setPopoverMessage("word recognition message")
                break

            case 10:
                setPopoverMessage("working memory message")
                break

        }

    }


  return(
    <div className="h-full">
        <div className="row">
            
            FLOURISH SCIENCE COGNITIVE TESTS
        </div>
        <div className="row mt-12 text-sky-400">
            A list of the various cognitive tests. Click the test name to show its description. Click the 'Start Test' button below a given test name to start the test. 
        </div>

        <div className="grid grid-auto-rows place-items-center auto-rows">
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(1)}>
                    Choice Reaction Time
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(2)}>
                    Digit Vigilance
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(3)}>
                    Memory Scanning
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(4)}>
                    Motor Function
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(5)}>
                    Number Vigilance
                </div>
            </div>            
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(6)}>
                    Picture Recognition
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(7)}>
                    Reaction Time
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(8)}>
                    Verbal Learning
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(9)}>
                    Word Recognition
                </div>
            </div>
            <div>
                <div className="text-blue-400 mt-12" onClick={e => show_info(10)}>
                    Spatial Working Memory
                </div>
            </div>
        </div>

        {ShowPopover ?
        
            <div className="grid grid-rows-2 h-[50%] w-[50%]">

                <div>
                    {TestTitle}
                </div>
                <div>
                    {PopoverMessage}
                </div>

            </div>
        : null}
    
        

        
    </div>
       



       

  )

}

  