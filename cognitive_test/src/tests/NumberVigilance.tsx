// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function NumberVigilance (props: any) {

    const [ShowNumber, setShowNumber] = React.useState(false)
    const [ResponsePressed, setResponsePressed] = React.useState(false) 
    const [ResponsesArray, setResponsesArray]: any = React.useState([])
    const [ClickedButton, setClickedButton] = React.useState(false)
    const [Correct, setCorrect] = React.useState(false)
    const [CurrentNumber, setCurrentNumber] = React.useState(0)
    const [TimerDisplay, setTimerDisplay] = React.useState("0:00")
    const [EndTest, setEndTest] = React.useState(false)
    const [ResponseTime, setResponseTime] = React.useState(100)
    const [PressedCount, setPressedCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(1)
    const [AvgTime, setAvgTime] = React.useState(0)
    const [ShownCount, setShownCount] = React.useState(0)
    const [ShownTimer, setShownTimer] = React.useState(0)
    const [TestNumber, setTestNumber] = React.useState(0)
    const [CorrectCount, setCorrectCount] = React.useState(0)
    const [IncorrectCount, setIncorrectCount] = React.useState(0)

    const correct_class = ["bg-blue-400 rounded px-10 h-12 text-white", "bg-green-400 rounded px-10 h-12 text-white", "bg-red-400 rounded px-10 h-12 text-white"]
    const [CorrectClass, setCorrectClass] = React.useState(correct_class[0])

    useEffect(() => {
        if(ClickedButton){
            setPressedCount(PressedCount + 1)
        }   
    }, [ClickedButton])

    useEffect(() => {
        if(ShowNumber){
            setCurrentNumber(Math.ceil(Math.random() * 10))        
        }   
    }, [ShowNumber])

    useEffect(() => {
        var count = 1
        while(IntervalTime > 0){
            const timeoutId = setTimeout(() => {
                setIntervalTime(IntervalTime-.5)
                count = IntervalTime
                if(count <= .5){
                    setCorrectClass(correct_class[0])
                    setShownCount(ShownCount + 1)
                    Math.round(ShownCount + 1) % 2 == 0 ? get_time() : null
                    set_interval()
                    setCurrentNumber(Math.ceil(Math.random() * 10)) 
                }
                
            }, 500 )

            return () => clearTimeout(timeoutId)
        }

    }, [IntervalTime])

    useEffect(() => {
        ShownCount > 120 ? setEndTest(true) : null
    }, [ShownCount])

    function set_interval(){
        setIntervalTime(1)
    }

    function clicked_button(){
        setTestNumber(Math.ceil(Math.random()*10))
        setShowNumber(true)
        !ClickedButton ? setClickedButton(true) : setClickedButton(false)
    }

    function toggle_pressed(){
        TestNumber == CurrentNumber ? correct_press() : incorrect_press()                     
    }

    function generate_number(){
        return (Math.random() * 10)
    }

    function correct_press(){
        setCorrectClass(correct_class[1])
        setCorrectCount(CorrectCount + 1)
        console.log("=====================")
        console.log("Correct press")
        console.log(CorrectCount + 1)
        console.log("=====================")
    }


    function incorrect_press(){
        setCorrectClass(correct_class[2])
        setIncorrectCount(CorrectCount + 1)
        console.log("=====================")
        console.log("Incorrect press")
        console.log(IncorrectCount + 1)
        console.log("=====================")
    }

    function get_time(){
        var seconds = 0
        var minutes = 0
        var display = ""

        ShownTimer + 1 == 60 ? minutes = 1 : null

        setShownTimer(ShownTimer + 1) 

        minutes == 1 ? seconds = 0 : null

        ShownTimer + 1 < 10 ? display = minutes + ":0" + Math.round(ShownTimer + 1) : display = minutes + ":" + Math.round(ShownTimer + 1)

        setTimerDisplay(display)
    }

  return(
    <div>
        <div className="row">
            TEST #3: NUMBER VIGILANCE
        </div>
        <div className="row mt-12 text-sky-400">
            A number appears at the top of the screen. When the test is started, random numbers are shown a quick rate for one minute. Click the 'Okay' button when the two numbers match to test your reaction time.
        </div>
        {!EndTest ?
            <div>
                
                    {!ClickedButton ? 
                        <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={clicked_button}>
                            Start
                        </Button>
                        :
                        <div className="grid grid-rows-4 place-items-center"> 
                            <div className="grid grid-cols-2 gap-96"> 
                                <span className="text-xl italic">
                                    Test is Running
                                </span>
                                <span>
                                    Timer: {TimerDisplay}
                                </span>
                            </div>
                            <div className="grid grid-auto-rows place-items-center">
                                <div>
                                    <span className="text-base">
                                        Find Number: {TestNumber ? TestNumber : null}
                                    </span>
                                </div>
                                <div className="text-xl mt-24">
                                    <span>
                                        {ShowNumber ? CurrentNumber : null}
                                    </span>
                                </div>
                                <div className="row mt-36"> 
                                    <Button color="primary" className={CorrectClass} onClick={toggle_pressed}>
                                        Okay
                                    </Button>
                                </div>
                            </div>
                        </div> 
                    }
                                                  
            </div>
        :
            <div className="grid grid-rows-1 mt-[200px] place-items-center">
                <div className="mt-12"> 
                    <span>
                        The Test is Over
                    </span>
                </div>    
                <div className="mt-24 text-green-400">
                    Correct Responses: {CorrectCount}
                </div> 
                <div className="mt-12 text-red-400">
                    Incorrect Responses: {IncorrectCount}
                </div> 
            </div>
        }

    </div>
  )

}

  