'use client'
import React, {useEffect, useRef} from 'react';


export default function Tests(props: any) {

    function show_info(test: any){
        props.setMainClass(props.main_class[1])
        props.setShowPopover(true)

        switch (test){

            //CHOICE REACTION
            case 1:
                props.setPopoverMessage("Either the word Yes or the word No is presented in the center of the screen. The user is presented a simple question and has to press the button corresponding to the answer as quickly as possible. There are 20 trials and the intertrial interval varies randomly between 1 and 2.5 seconds.")
                props.setTestTitle("CHOICE REACTION TIME") 
                props.setTestID(test)
                break

            //DIGIT VIGILANCE
            case 2:
                props.setPopoverMessage("Players are asked to find two specified numbers, which appear randomly within fifty rows of fifty single digits. The goal is to find as many of the numbers as possible.")
                props.setTestTitle("DIGIT VIGILANCE")
                props.setTestID(test)
                break

            //MEMORY SCANNING
            case 3:
                props.setPopoverMessage("Three digits are presented singly at the rate of one every 2.5 seconds for the player to remember. A series of 18 digits is then presented. For each, the player must press Yes or No according to whether the digit is thought to be one of the three presented initially.")
                props.setTestTitle("MEMORY SCANNING")
                props.setTestID(test)
                break

            //MOTOR FUNCTION
            case 4:
                props.setPopoverMessage("A series of individual shapes appear randomly on the screen. The goal is to click each shape as fast as possible.")
                props.setTestTitle("MOTOR FUNCTION")
                props.setTestID(test)
                break

            //NUMBER VIGILANCE
            case 5:
                props.setPopoverMessage("A number appears at the top of the screen. When the test is started, random numbers are shown a quick rate for 3 minutes. Click the 'Okay' button when the two numbers match to test your reaction time.")
                props.setTestTitle("NUMBER VIGILANCE")
                props.setTestID(test)
                break

            //PICTURE RECOGNITION
            case 6:
                props.setPopoverMessage("Fourteen pictures are displayed, one every 1.5 seconds. The player is told to memorize each picture. Afterward, fourteen more pictures are shown. This time the picture set only contains some of the items from the original display. The player is asked if each displayed picture from the second set was in the original set.")
                props.setTestTitle("PICTURE RECOGNITION")
                props.setTestID(test)
                break

            //REACTION TIME
            case 7:
                props.setPopoverMessage("A button appears at the center of the screen. The user is intended to press it as quickly as possible. There are twenty trials and the button appears randomly between .5 and 2.5 seconds.")
                props.setTestTitle("REACTION TIME")
                props.setTestID(test)
                break

            //VERBAL LEARNING
            case 8:
                props.setPopoverMessage("A series of twelve words will be shown on the screen for three seconds each. Afterward, twelve words will be shown again. While each is shown, decide if it was in the original sequence.")
                props.setTestTitle("VERBAL LEARNING")
                props.setTestID(test)
                break

            //WORD RECOGNITION
            case 9:
                props.setPopoverMessage("Ten words are displayed, one every 1.5 seconds. The player is told to memorize each word. Afterward, ten more words are shown. This time the word set only contains some of the items from the original display. The player is asked if each word from the second set was in the original set.")
                props.setTestTitle("WORD RECOGNITION")
                props.setTestID(test)
                break

            //WORKING MEMORY
            case 10:
                props.setPopoverMessage("The test begins with three colored boxes shown on the screen. One box contains a token. When the token is found, it is added to the 'found list' above the play area. The token is then moved to another box for the user to find again. The rate at which this occurs is equal to the amount boxes shown on the screen.")
                props.setTestTitle("SPATIAL WORKING MEMORY")
                props.setTestID(test)
                break

        }

    }


  return(
    <div>
        <div className="row">
            FLOURISH SCIENCE COGNITIVE TESTS
        </div>
        <div className="row mt-12 text-sky-400">
            A list of the various cognitive tests. Click the test name to show its description. Click the 'Start Test' button below a given test name to start the test. 
        </div>
        <div className="grid grid-auto-rows place-items-center auto-rows mt-24">
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
            {/* <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(8)}>
                    Verbal Learning
                </div>
            </div> */}
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
    </div>
  )

}

  