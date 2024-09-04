// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';


export default function ReactionTime (props: any) {

    const [ShowButton, setShowButton] = React.useState(false)
    const [ResponsePressed, setResponsePressed] = React.useState(false) 
    const [ResponsesArray, setResponsesArray]: any = React.useState([])
    const [ClickedButton, setClickedButton] = React.useState(false)
    const [EndTest, setEndTest] = React.useState(false)
    const [ResponseTime, setResponseTime] = React.useState(100)
    const [PressedCount, setPressedCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)
    const [AvgTime, setAvgTime] = React.useState(0)

    const proficiency = 14
    const interval = "sections"
    const time = 5

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
        var count
        while(ShowButton && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime+100)
            }, 100 )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowButton, ResponseTime])

    useEffect(() => {
        EndTest ? setAvgTime(ResponsesArray.reduce((a: any, b: any) => a + b, 0)/ResponsesArray.length) : null
    }, [EndTest])


    function set_interval(){
        var time = Math.abs((3.5 - (Math.ceil(Math.random() * 4))))
        console.log(ResponsesArray)
        setIntervalTime(time)
    }

    function clicked_button(){
        console.log(analysis["attention"](interval, [[.3,1.1,.25,.4], [.44,.53,.6,.8], [.5,.3,.75,.45], [.77,.84,.43,.43], [.17,.54,.68,.9]], time, proficiency, true))
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
        ResponsesArray.length == 5 ? setEndTest(true) : null
    }


    function get_avg_time(){
        return ResponsesArray.reduce((a: any, b: any) => a + b, 0)/ResponsesArray.length
    }
    function resetAll(){
    setShowButton(false)
    setResponsePressed(false) 
    setResponsesArray([])
    setClickedButton(false)
    setEndTest(false)
    setResponseTime(100)
    setPressedCount(0)
    setIntervalTime(0)
    setAvgTime(0)






    }

  return(
    <div>
        <div className="row">
            TEST #2: VISUAL REACTION TIME
        </div>
        <div className="row mt-12 text-sky-400">
            A button appears at the center of the screen. The user is intended to press it as quickly as possible. There are twenty trials and the button appears randomly between .5 and 2.5 seconds.
        </div>
        {!EndTest ?
            <div className="mt-[200px]">
                <div className="row mt-12"> 
                    {!ClickedButton ? 
                        <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={clicked_button}>
                            Start
                        </Button>
                        : 
                        <span className="text-xl italic">
                            Test is Running
                        </span>
                    }
                </div>        
                {ShowButton ? 
                    <div className="row mt-12"> 
                        <Button color="primary" className="bg-blue-400 rounded px-10 h-12 text-white" onClick={toggle_pressed}>
                            Okay
                        </Button>
                    </div>
                : null}
            </div>
        :
            <div className="grid grid-rows-3 grid-cols-2 mt-[200px]">
                <div className="mt-12"> 
                    <span>
                        The Test is Over.
                    </span>
                </div>
                <div className="grid grid-rows-1 grid-cols-2 mt-12">
                    <span>
                        Average Time: 
                    </span>
                    {AvgTime > 0 ? 
                        <span>
                            {AvgTime}
                        </span> 
                    : null}
                </div>
                <div className="mt-12"> 
                    <span>
                        The Test is Over.
                    </span>
                    <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={resetAll}>
                     Reset
                    </Button>
                </div>        
            </div>
        }

    </div>
  )

}

  