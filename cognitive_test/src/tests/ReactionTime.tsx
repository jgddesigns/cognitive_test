// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';


export default function ReactionTime (props: any) {

    const [ShowButton, setShowButton] = React.useState(false)
    const [ResponsePressed, setResponsePressed] = React.useState(false) 
    const [ResponsesArray, setResponsesArray]: any = React.useState([])
    const [ClickedButton, setClickedButton] = React.useState(false)
    const [EndTest, setEndTest] = React.useState(false)
    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(response_time)
    const [PressedCount, setPressedCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)
    const [AvgTime, setAvgTime] = React.useState("")
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Answers, setAnswers] = React.useState<any>([])

    
    const proficiency = 22 * .5 * .7
    const interval = "sections"
    const time = 5
    const test_length = 20
    const time_measure = .5


    useEffect(() => {

        AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        AttentionData  ? console.log(analysis["decisiveness"](AttentionData["original_answers"])) : null

    }, [AttentionData])

    
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
                setResponseTime(ResponseTime + response_time)
            }, response_time )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowButton, ResponseTime])



    useEffect(() => {
        EndTest ? setAvgTime(get_avg_time()) : null
    }, [EndTest])



    function set_interval(){
        var time = Math.abs((3.5 - (Math.ceil(Math.random() * 4))))
        console.log(ResponsesArray)
        setIntervalTime(time)
    }



    function clicked_button(){
        // console.log(analysis["attention"](interval, [[.3,1.1,.25,.4], [.44,.53,.6,.8], [.5,.3,.75,.45], [.77,.84,.43,.43], [.17,.54,.68,.9, .8, .7]], time, proficiency, true))
        // console.log(analysis["attention"](interval, [.3,1.1,.25,.4,.44,.53,.6,.8,.5,.3,.75,.45,.77,.84,.43,.43,.17,.54,.68,.9, .8, .7], time, proficiency, false))
        !ClickedButton ? setClickedButton(true) : setClickedButton(false)
    }



    function toggle_pressed(){
        setResponsePressed(true)
        var answers_arr = Answers
        var arr = ResponsesArray
        var time = ResponseTime*.001
        answers_arr.push(time)
        arr.push(time)
        setAnswers(answers_arr)
        setResponsesArray(arr)
        setResponseTime(response_time)
        setShowButton(false)
        set_interval()
        setShowCirclesGreen(true)

        //5 for test length, will be 25 during launch
        if(ResponsesArray.length == test_length){
            console.log("asdf")
            setEndTest(true)
            setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
            setReactionData(analysis["speed"](ResponsesArray, time_measure))
        } 
    }



    function get_avg_time(){
        return (ResponsesArray.reduce((a: any, b: any) => a + b, 0)/ResponsesArray.length).toString().slice(0,4)
    }



    function reset_all(){
        props.setReset(true)
        // setShowButton(false)
        // setResponsePressed(false) 
        // setResponsesArray([])
        // setClickedButton(false)
        // setEndTest(false)
        // setResponseTime(response_time)
        // setPressedCount(0)
        // setIntervalTime(0)
        // setAvgTime("")
        // setRestart(true)
    }



    function get_position(){
        return ResponsesArray.length > 0 ? test_length - ResponsesArray.length : test_length - 1
    }
    

  return(
    <div>
        <div className="row">
            VISUAL REACTION TIME
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
                    <div className="row mt-12 h-24"> 
                        <Button color="primary" className="bg-blue-400 rounded px-10 h-12 text-white" onClick={toggle_pressed}>
                            Okay
                        </Button>
                    </div>
                :                     
                    <div className="row mt-12 h-24"> 
                    </div>
                }
            </div>
        :
            <div className="grid grid-auto-rows mt-[150px] place-items-center">
                <div className="grid grid-auto-cols gap-24">
                    <div className="mt-12"> 
                        <span>
                            The Test is Over.
                        </span>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-2 mt-12">
                        <span>
                            Average Time: 
                        </span>
                        {AvgTime != "0" ? 
                            <span className="px-4">
                                {AvgTime}
                            </span> 
                        : null}
                    </div>
                </div>
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData} />
                </div>
                <div className="mt-12"> 
                    <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                        Reset
                    </Button>
                </div>        
            </div>
        }
        <div className="grid place-items-center mt-24">
            {ClickedButton ? 
            <div>
                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={test_length} CurrentPosition={get_position()} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
                </div>
            : null} 
        </div>

    </div>
  )

}

  