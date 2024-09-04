// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';


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
    const [SectionAnswers, setSectionAnswers] = React.useState<any>([])
    const [AnswerArray, setAnswerArray] = React.useState<any>([])

    const correct_class = ["bg-blue-400 rounded px-10 h-12 text-white", "bg-green-400 rounded px-10 h-12 text-white", "bg-red-400 rounded px-10 h-12 text-white"]
    const [CorrectClass, setCorrectClass] = React.useState(correct_class[0])

    //proficient overall score
    const proficiency = 84

    const interval = "sections"

    //section interval, every 3 digits, 6 sections total
    const time = 5

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
        var temp_arr = []
        if(ShownCount % 24 == 0 && ShownCount > 1){
            temp_arr = AnswerArray
            temp_arr.push(SectionAnswers)
            setAnswerArray(temp_arr)
            setSectionAnswers([])
        }
              
        ShownCount > 120 ? setEndTest(true) : null
    }, [ShownCount])

    function set_interval(){
        setIntervalTime(1)
    }

    function clicked_button(){
        console.log(analysis["attention"](interval, [[1,1,1,0,1,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,1,1,0,0], [0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,0,1,0,0,0,1,0,1], [0,1,1,1,0,0,1,1,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0], [1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,0,0,1,1], [1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,1,0,1,0,1,1,1,1,0]], time, proficiency, true))
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
        var temp_arr = SectionAnswers
        temp_arr.push(1)
        setSectionAnswers(temp_arr)
        setCorrectClass(correct_class[1])
        setCorrectCount(CorrectCount + 1)
        console.log("=====================")
        console.log("Correct press")
        console.log(CorrectCount + 1)
        console.log("=====================")
    }


    function incorrect_press(){
        var temp_arr = SectionAnswers
        temp_arr.push(0)
        setSectionAnswers(temp_arr)
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
    function resetAll(){
    setShowNumber(false)
    setResponsePressed(false) 
    setResponsesArray([])
    setClickedButton(false)
    setCorrect(false)
    setCurrentNumber(0)
    setTimerDisplay("0:00")
    setEndTest(false)
    setResponseTime(100)
    setPressedCount(0)
    setIntervalTime(1)
    setAvgTime(0)
    setShownCount(0)
    setShownTimer(0)
    setTestNumber(0)
    setCorrectCount(0)
    setIncorrectCount(0)

   
    setCorrectClass(correct_class[0])


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
                <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={resetAll}>
                     Reset
                </Button>
            </div>
        }

    </div>
  )

}

  