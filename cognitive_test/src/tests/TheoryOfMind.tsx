'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import "../helpers/shapes.css"


export default function WorkingMemory(props: any) {
    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [NextRound, setNextRound] = React.useState(false)
    const [Delay, setDelay] = React.useState(false)
    const [TokensFound, setTokensFound] = React.useState(false)
    const [IsPaused, setIsPaused] = React.useState(false)
    const [Found, setFound] = React.useState(false)
    const [Missed, setMissed] = React.useState(false)
    const [TestTime, setTestTime] = React.useState(0)
    const [FoundCount, setFoundCount] = React.useState(0)
    const [RoundCount, setRoundCount] = React.useState(3) 
    const [CurrentAttempts, setCurrentAttempts] = React.useState(0)
    const [TotalAttempts, setTotalAttempts] = React.useState(0)
    const [CurrentRound, setCurrentRound] = React.useState(1)
    const [DelayTime, setDelayTime] = React.useState<any>(0)
    const [FoundTimes, setFoundTimes] = React.useState<any[]>([])

    const [TokenPattern, setTokenPattern] = React.useState<any[]>([])
    const [BoxCount, setBoxCount] = React.useState(3)
    const [CurrentMessage, setCurrentMessage] = React.useState<any>("") 
    const [ClockDisplay, setClockDisplay] = React.useState<any>("") 
    const [CurrentShape, setCurrentShape] = React.useState<any>("") 
    const [CountMessage, setCountMessage] = React.useState<any>("") 
    const [CurrentPosition, setCurrentPosition] = React.useState(0)
    const [Pause, setPause] = React.useState(-1)
    const [AverageTime, setAverageTime] = React.useState(0)
    const [LastTime, setLastTime] = React.useState("")
    const [MissedClicks, setMissedClicks] = React.useState(0)
    const [NotAttempted, setNotAttempted] = React.useState(0)
    const [OriginalTime, setOriginalTime] = React.useState<any>(0)

    const [CountDown, setCountDown] = React.useState(false)
    const [CountTimer, setCountTimer] = React.useState<any>(-1)
    

    const shapes = ["circle", "square", "triangle", "heart", "star", "moon", "hexagon", "diamond", "trapezoid"]
    const colors = ["red", "yellow", "green", "blue"]
    const sizes = ["h-16 w-16", "h-24 w-24", "h-32 w-32", "h-48 w-48"]
      
    const [BoxGrid, setBoxGrid] = React.useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])  



    useEffect(() => {

        while(TestTime >= 0 && TestStart && !EndTest){
            const timeoutId3 = setTimeout(() => {
                if(CurrentRound <= 10){ 
                    set_clock(TestTime + 1)
                    setTestTime(TestTime + 1)
                }else{
                    setTestTime(-1)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId3)

        }

    }, [TestTime, TestStart, EndTest])


    useEffect(() => {

        while(CountTimer >= 0 && CountDown){
            const timeoutId3 = setTimeout(() => {
                if(CountTimer > 0){ 
                    CountTimer == 1 ? setCountMessage("Go!") : null
                    setCountTimer(CountTimer - 1)
                }
                else{
                    
                    //create_item()
                    //setTestStart(true)
                    setDelay(true)
                    setShowData(true)
                    toggle_countdown(false)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId3)

        }

    }, [CountDown, CountTimer])


    function toggle_countdown(condition: any){
        if(condition){
            setCountDown(true)
            setCountTimer(5)
        }else{
            setCountDown(false)
            setCountTimer(-1)
        }
    }

    function end_test(){
        average_time()
        setDelay(false)
        setIsPaused(false)
        setEndTest(true) 
    }


    function set_clock(time: any){
        var minutes: any = Math.floor(time / 60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setClockDisplay(display)
    }


    function average_time(){
        var time_arr = FoundTimes
        var total: any = 0
        var total_str: any = ""
        var missed_clicks = 0
        var denominator = 0

        for(var i=0; i<time_arr.length; i++){
            if(time_arr[i] > 0){
                denominator++
                total = total + time_arr[i]
            }else{
                missed_clicks++
            }
        }

        total > 0 ? total = total / denominator : total = 0
   
        total = total.toString().slice(0, 4)

        setMissedClicks(missed_clicks)
        setAverageTime(total)
    }



    function start_handler(){
        set_clock(0)
        // create_item()
        setTestStart(true)
        // setDelay(true)
        // setShowData(true)
        toggle_countdown(true)
        setCurrentMessage("Click Shapes as Quickly as Possible")
    }



    


    return(
        <div className="h-full">
            <div className="row">
                TEST #11: THEORY OF MIND
            </div>
            <div className="row mt-12 text-sky-400">
                A series of individual shapes appear randomly on the screen. The goal is to click each shape as fast as possible.
            </div>
            {!EndTest ?
                !TestStart ? 
                    <div className="h-[60rem] mt-24">              
                        <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                            Start   
                        </Button>  
                    </div>
                :   ShowData ?
                        <div className="h-full grid grid-flow-rows auto-rows-max mt-24 gap-y-12">
                            <div className="h-12 grid grid-flow_rows place-items-center grid-cols-2">
                                <div>

                                {CurrentMessage.length > 0 ? 
                                    <div>
                                        <div>
                                            {CurrentMessage}
                                        </div>
                                        <div>
                                            Current Round: {CurrentRound}
                                        </div>
                                    </div>
                                : null}
                                </div>
                                <div>
                                    <div className="mt-8 ml-12">
                                        Total Time: {ClockDisplay}
                                    </div>
                                </div>
                            </div>

                         
                            
                                <div className="h-240 grid grid-flow-rows auto-rows-max mt-12 gap-12 bg-gray-400"> 
                   
        
                                </div>
                        </div>
                :   CountTimer > 0 ? 
                        <div className="mt-24 grid place-items-center text-4xl">
                            {CountTimer}
                        </div> 
                    :   
                        <div className="mt-24 grid place-items-center text-4xl">
                            Go!
                        </div>   
            :
                <div className="grid grid-rows-3 mt-24 grid place-items-center"> 
                    <div className="mt-4 ml-12 text-4xl">
                        The Test is Over
                    </div> 

                    <div className="mt-24 ml-12">
                        Total Time: {ClockDisplay}
                    </div>

          
 
                </div>
            }
        </div>
    )

}


function float(total_str: any) {
    throw new Error('Function not implemented.');
}
  