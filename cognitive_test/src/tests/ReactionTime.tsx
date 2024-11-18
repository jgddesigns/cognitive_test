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
    const [Inserted, setInserted] = React.useState(false)
    
    const table = "test_results"

    const answer_string = ["", "Good!", "Too Slow!"]
    const [AnswerString, setAnswerString] = React.useState(answer_string[0])

    const answer_class = ["", "text-xl text-green-400 mt-4", "text-xl text-red-400 mt-4"]
    const [AnswerClass, setAnswerClass] = React.useState(answer_class[0])
    
    const interval = "sections"
    const time = 5
    const test_length = 20
    const proficiency = test_length * .7
    const time_measure = .5
    const test_name = "reaction_time"


    useEffect(() => {

        AttentionData ? setAvgTime(get_avg_time()) : null
        !ReactionData && AttentionData  ? setReactionData(analysis["speed"](AttentionData["original_answers"], time_measure)) : null
        AttentionData ? AttentionData["original_answers"][AttentionData["original_answers"] - 1] <= time_measure ? setShowCirclesGreen(true) : setShowCirclesRed(true) : null
        !Inserted && AttentionData && ReactionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])
    

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
                count <= .5 ? setShowButton(true) : null  
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


    // Sets the state variable from /src/app/page.tsx to the an array containing the post-test analysis and sets the test name to the current test.
    // @param: N/A
    // @return: N/A
    function handle_insert(){
        console.log("inserting to database")
        props.setData([AttentionData, DecisionData, ReactionData])
        props.setTestName(test_name)
        props.setTable(table)
        setInserted(true)
    }


    // Sets the interval between prompts
    // @param: N/A
    // @return: N/A
    function set_interval(){
        var time = Math.abs((3.5 - (Math.ceil(Math.random() * 4))))
        console.log(ResponsesArray)
        setIntervalTime(time)
    }


    // Toggles the 'ClickedButton' state variable based on if it is clicked or not.
    // @param: N/A
    // @return: N/A
    function clicked_button(){
        !ClickedButton ? setClickedButton(true) : setClickedButton(false)
    }


    // After a response, calls necessary functions and sets necessary variables.
    // @param: N/A
    // @return: N/A
    function toggle_pressed(){
        setResponsePressed(true)
        var answers_arr = Answers
        var arr = ResponsesArray
        var current_response = ResponseTime * .001
        current_response <= time_measure ? answers_arr.push(1) : answers_arr.push(0)
        arr.push(current_response)
        setAnswers(answers_arr)
        setResponsesArray(arr)
        setResponseTime(response_time)
        setShowButton(false)
        set_interval()
        current_response > time_measure ? answer_handler(false) : answer_handler(true) 
        
        if(ResponsesArray.length == test_length && AnswerString.length > 1){
            setEndTest(true)
            setAttentionData(analysis["attention"](interval, ResponsesArray, time, proficiency))        
        } 
    }


    // After a response is given, calls necessary functions and sets necessary variables based on the decision. 
    // @param 'condition': True if correct, false otherwise
    // @return: N/A
    function answer_handler(condition: any){
        if(condition){
            setShowCirclesGreen(true)
            setAnswerString(answer_string[1])
            setAnswerClass(answer_class[1])
        }else{
            setShowCirclesRed(true)
            setAnswerString(answer_string[2])
            setAnswerClass(answer_class[2])
        }
    }


    // Gets the average response timw
    // @param: N/A
    // @return (string): The average time
    function get_avg_time(){
        return (AttentionData["original_answers"].reduce((a: any, b: any) => a + b, 0)/AttentionData["original_answers"].length).toString().slice(0,4)
    }


    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
    }



    // For the progress bar display. Determines how much of the test is completed.
    // @param: N/A
    // @return: N/A 
    function get_position(){
        return ResponsesArray.length > 0 ? !EndTest ? test_length - ResponsesArray.length : test_length - 1 : 0
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
                    <div className="grid grid-auto-rows gap-8 mt-12">
                        <div className="row h-24"> 
                            <Button color="primary" className="bg-blue-400 rounded px-10 h-12 text-white" onClick={toggle_pressed}>
                                Okay
                            </Button>
                        </div>
                    </div>
                :                     
                    <div className="row mt-12 h-24"> 
                        <span className={AnswerClass}>
                            {AnswerString}
                        </span>
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
                                {AvgTime} seconds
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

  