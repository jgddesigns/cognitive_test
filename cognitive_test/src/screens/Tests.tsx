'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import Login from '@/components/Login';
import Signup from '@/components/Signup';


export default function Tests(props: any) {
    const [ShowPopover, setShowPopover] = React.useState(false)
    const [TestTitle, setTestTitle] = React.useState("")
    const [PopoverMessage, setPopoverMessage] = React.useState("")

    const main_class = ["h-full relative", "h-[100%] w-[100%] bg-blue-400 relative"]
    const [MainClass, setMainClass] = React.useState(main_class[0])

    useEffect(() => {

    }, [])


    function hide_popover(){
        setShowPopover(false)
        setMainClass(main_class[0])
        setPopoverMessage("")
        setTestTitle("")
    }


    function show_info(test: any){
        setMainClass(main_class[1])
        setShowPopover(true)

        switch (test){
            //CHOICE REACTION
            case 1:
                setPopoverMessage("Either the word Yes or the word No is presented in the center of the screen. The user is presented a simple question and has to press the button corresponding to the answer as quickly as possible. There are 20 trials and the intertrial interval varies randomly between 1 and 2.5 seconds.")
                setTestTitle("CHOICE REACTION TIME") 
                break

            //DIGIT VIGILANCE
            case 2:
                setPopoverMessage("Players are asked to find two specified numbers, which appear randomly within fifty rows of fifty single digits. The goal is to find as many of the numbers as possible.")
                setTestTitle("DIGIT VIGILANCE")
                break

            //MEMORY SCANNING
            case 3:
                setPopoverMessage("Three digits are presented singly at the rate of one every 2.5 seconds for the player to remember. A series of 18 digits is then presented. For each, the player must press Yes or No according to whether the digit is thought to be one of the three presented initially.")
                setTestTitle("MEMORY SCANNING")
                break

            //MOTOR FUNCTION
            case 4:
                setPopoverMessage("A series of individual shapes appear randomly on the screen. The goal is to click each shape as fast as possible.")
                setTestTitle("MOTOR FUNCTION")
                break

            //NUMBER VIGILANCE
            case 5:
                setPopoverMessage("A number appears at the top of the screen. When the test is started, random numbers are shown a quick rate for 3 minutes. Click the 'Okay' button when the two numbers match to test your reaction time.")
                setTestTitle("NUMBER VIGILANCE")
                break

            //PICTURE RECOGNITION
            case 6:
                setPopoverMessage("Fourteen pictures are displayed, one every 1.5 seconds. The player is told to memorize each picture. Afterward, fourteen more pictures are shown. This time the picture set only contains some of the items from the original display. The player is asked if each displayed picture from the second set was in the original set.")
                setTestTitle("PICTURE RECOGNITION")
                break

            //REACTION TIME
            case 7:
                setPopoverMessage("A button appears at the center of the screen. The user is intended to press it as quickly as possible. There are twenty trials and the button appears randomly between .5 and 2.5 seconds.")
                setTestTitle("REACTION TIME")
                break

            //VERBAL LEARNING
            case 8:
                setPopoverMessage("A series of twelve words will be shown on the screen for three seconds each. Afterward, twelve words will be shown again. While each is shown, decide if it was in the original sequence.")
                setTestTitle("VERBAL LEARNING")
                break

            //WORD RECOGNITION
            case 9:
                setPopoverMessage("Ten words are displayed, one every 1.5 seconds. The player is told to memorize each word. Afterward, ten more words are shown. This time the word set only contains some of the items from the original display. The player is asked if each word from the second set was in the original set.")
                setTestTitle("WORD RECOGNITION")
                break

            //WORKING MEMORY
            case 10:
                setPopoverMessage("The test begins with three colored boxes shown on the screen. One box contains a token. When the token is found, it is added to the 'found list' above the play area. The token is then moved to another box for the user to find again. The rate at which this occurs is equal to the amount boxes shown on the screen.")
                setTestTitle("SPATIAL WORKING MEMORY")
                break

        }

    }


  return(
    <div className={MainClass}>
        <div className="row">
            FLOURISH SCIENCE COGNITIVE TESTS
        </div>
        <div className="row mt-12 text-sky-400">
            A list of the various cognitive tests. Click the test name to show its description. Click the 'Start Test' button below a given test name to start the test. 
        </div>

        <div className="grid grid-auto-rows place-items-center auto-rows">
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(1)}>
                    Choice Reaction Time
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(2)}>
                    Digit Vigilance
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(3)}>
                    Memory Scanning
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(4)}>
                    Motor Function
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(5)}>
                    Number Vigilance
                </div>
            </div>            
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(6)}>
                    Picture Recognition
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(7)}>
                    Reaction Time
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(8)}>
                    Verbal Learning
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(9)}>
                    Word Recognition
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(10)}>
                    Spatial Working Memory
                </div>
            </div>
        </div>

        {ShowPopover ?
            <div className="h-[50%] w-[50%] z-99 sticky top-0 bottom-0 left-0 right-0">
                <div>
                    {TestTitle}
                </div>
                <div>
                    {PopoverMessage}
                </div>
                <div className="mt-12" onClick={e => hide_popover()}>
                    Close
                </div>
            </div>
        : null}
    
    </div>
    

  )

}

  