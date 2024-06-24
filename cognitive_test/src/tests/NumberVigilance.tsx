// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function NumberVigilance (props: any) {

    const [ShowNumber, setShowNumber] = React.useState(false)
    const [ResponsePressed, setResponsePressed] = React.useState(false) 
    const [ResponsesArray, setResponsesArray]: any = React.useState([])
    const [ClickedButton, setClickedButton] = React.useState(false)
    const [CurrentNumber, setCurrentNumber] = React.useState(0)
    const [EndTest, setEndTest] = React.useState(false)
    const [ResponseTime, setResponseTime] = React.useState(100)
    const [PressedCount, setPressedCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(1)
    const [AvgTime, setAvgTime] = React.useState(0)
    const [ShownCount, setShownCount] = React.useState(0)
    const [TestNumber, setTestNumber] = React.useState(0)
    const [CorrectCount, setCorrectCount] = React.useState(0)

    const number_class = ["text-2xl bold", "text-2xl bold text-green-400"]
    const [NumberClass, setNumberClass] = React.useState(number_class[0])

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
                    setShownCount(ShownCount + 1)
                    set_interval()
                    setCurrentNumber(Math.ceil(Math.random() * 10)) 
                }
            }, 500 )

            return () => clearTimeout(timeoutId)
        }

    }, [IntervalTime])

    useEffect(() => {
        ShownCount > 10 ? setEndTest(true) : null
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
        TestNumber == CurrentNumber ? correct_press() : null
    }

    function generate_number(){
        return (Math.random() * 10)
    }

    function correct_press(){
        setNumberClass(number_class[0])
        setCorrectCount(CorrectCount + 1)
        console.log("=====================")
        console.log("Correct press")
        console.log(CorrectCount + 1)
        console.log("=====================")
    }

  return(
    <div>
        <div className="row">
            TEST #3: NUMBER VIGILANCE
        </div>
        <div className="row mt-12 text-sky-400">
            A number appears at the top of the screen. When the test is started, random numbers are shown a quick rate for 3 minutes. Click the 'Okay' button when the two numbers match to test your reaction time.
        </div>
        {!EndTest ?
            <div className="mt-[200px]">
                
                    {!ClickedButton ? 
                        <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={clicked_button}>
                            Start
                        </Button>
                        :
                        <div className="grid grid-rows-4 mt-24"> 
                            <div> 
                                <span className="text-xl italic">
                                    Test is Running
                                </span>
                            </div>
                            <div className="mt-8">
                                <span className={NumberClass}>
                                    {TestNumber ? TestNumber : null}
                                </span>
                            </div>
                            <div className="mt-8">
                                <span>
                                    {ShowNumber ? CurrentNumber : null}
                                </span>
                            </div>
                            <div className="row mt-12"> 
                                <Button color="primary" className="bg-blue-400 rounded px-10 h-12 text-white" onClick={toggle_pressed}>
                                    Okay
                                </Button>
                            </div>
                        </div> 
                    }
                                                  
            </div>
        :
            <div className="grid grid-rows-1 mt-[200px]">
                <div className="mt-12"> 
                    <span>
                        The Test is Over.
                    </span>
                </div>     
            </div>
        }

    </div>
  )

}

  