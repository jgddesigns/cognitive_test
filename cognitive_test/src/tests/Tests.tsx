'use client'
import React, {useEffect, useRef} from 'react';
import {descriptions} from '../helpers/test_descriptions'


export default function Tests(props: any) {

    // Shows the popup display information
    // @param 'test': A numbere that stands for what test is to be displayed
    // @return: N/A
    function show_info(test: any){
        props.setMainClass(props.main_class[1])
        props.setShowPopover(true)

        switch (test){

            //CHOICE REACTION
            case 1:
                props.setPopoverMessage(descriptions["choice_reaction"])
                props.setTestTitle("CHOICE REACTION TIME") 
                props.setTestID(test)
                break

            //DIGIT VIGILANCE
            case 2:
                props.setPopoverMessage(descriptions["digit_vigilance"])
                props.setTestTitle("DIGIT VIGILANCE")
                props.setTestID(test)
                break

            //MEMORY SCANNING
            case 3:
                props.setPopoverMessage(descriptions["memory_scanning"])
                props.setTestTitle("MEMORY SCANNING")
                props.setTestID(test)
                break

            //MOTOR FUNCTION
            case 4:
                props.setPopoverMessage(descriptions["motor_function"])
                props.setTestTitle("MOTOR FUNCTION")
                props.setTestID(test)
                break

            //NUMBER VIGILANCE
            case 5:
                props.setPopoverMessage(descriptions["number_vigilance"])
                props.setTestTitle("NUMBER VIGILANCE")
                props.setTestID(test)
                break

            //PICTURE RECOGNITION
            case 6:
                props.setPopoverMessage(descriptions["picture_recognition"])
                props.setTestTitle("PICTURE RECOGNITION")
                props.setTestID(test)
                break

            //REACTION TIME
            case 7:
                props.setPopoverMessage(descriptions["reaction_time"])
                props.setTestTitle("REACTION TIME")
                props.setTestID(test)
                break


            //WORD RECOGNITION
            case 8:
                props.setPopoverMessage(descriptions["word_recognition"])
                props.setTestTitle("WORD RECOGNITION")
                props.setTestID(test)
                break

            //WORKING MEMORY
            case 9:
                props.setPopoverMessage(descriptions["working_memory"])
                props.setTestTitle("SPATIAL WORKING MEMORY")
                props.setTestID(test)
                break

        }

    }


  return(
    <div>
        <div className="row grid place-items-center">
            FLOURISH SCIENCE COGNITIVE TESTS
        </div>
        <div className="row mt-12 text-sky-400">
            A list of the various cognitive tests. Click the test name to show its description. Click the &apos;Start Test&apos; button below a given test name to start the test. 
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
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(8)}>
                    Word Recognition
                </div>
            </div>
            <div>
                <div className="text-green-400 mt-12 cursor-pointer underline" onClick={e => show_info(9)}>
                    Spatial Working Memory
                </div>
            </div>
        </div>
    </div>
  )

}

  