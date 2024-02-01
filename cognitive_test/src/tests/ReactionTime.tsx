// Import AWS SDK and configure
'use client'
import AWS from 'aws-sdk';
import React, {useEffect} from 'react';
import {Button, ButtonGroup} from "@nextui-org/react"
import { addAbortListener } from 'events';



export default function ReactionTime (props: any) {

    const [ShowButton, setShowButton] = React.useState(false)
    const [ResponsePressed, setResponsePressed] = React.useState(false) 
    const [ResponsesArray, setResponsesArray]: any = React.useState([])
    const [ClickedButton, setClickedButton] = React.useState(false)
    const [EndTest, setEndTest] = React.useState(false)
    const [ResponseTime, setResponseTime] = React.useState(100)
    const [PressedCount, setPressedCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)

    useEffect(() => {
        if(ClickedButton){
            setPressedCount(PressedCount + 1)
            set_interval()
        }   
    }, [ClickedButton])

    useEffect(() => {
        var count = 1
        while(IntervalTime > 0){
            const timeoutId = setTimeout(() => {
                setIntervalTime(IntervalTime-.5)
                count = IntervalTime
                if(count <= .5){
                    setShowButton(true)
                }
            }, 500 )

            return () => clearTimeout(timeoutId)
        }

    }, [IntervalTime])

    useEffect(() => {
        var count;
        while(ShowButton && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime+100)
            }, 100 )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowButton, ResponseTime])

    function set_interval(){
        var time = Math.abs((3.5 - (Math.ceil(Math.random() * 4))))
        console.log(ResponsesArray)
        setIntervalTime(time)
    }

    function clicked_button(){
        !ClickedButton ? setClickedButton(true) : setClickedButton(false)
    }

    function toggle_pressed(){
        setResponsePressed(true)
        var arr = ResponsesArray
        arr.push(ResponseTime*.001) 
        setResponseTime(100)
        setResponsesArray(arr)
        setShowButton(false)
        set_interval()

        //5 for test length, will be 25 during launch
        if(ResponsesArray.length == 5){
            setEndTest(true)
        }
    }


  return(
    <div>
        <div className="row">
            TEST #2: REACTION TIME
        </div>
        <div className="row mt-12 text-sky-400">
            A button appears at the center of the screen. The user is intended to press it as quickly as possible. There are twenty trials and the button appears randomly between .5 and 2.5 seconds.
        </div>
        {!EndTest ?
            <div className="mt-[200px]">
                <div className="row mt-12"> 
                    <Button color="primary" onClick={clicked_button}>Start</Button>
                </div>        
                {ShowButton ? 
                    <div className="row mt-12"> 
                        <Button color="primary" className="row mt-[12px]" onClick={toggle_pressed}>Okay</Button>
                    </div>
                : null}
            </div>
        :
            <div className="mt-[200px]">
                <div className="row mt-12"> 
                    <span>
                        Test is Over
                    </span>
                </div>        
            </div>
        }

    </div>
  )

}

  