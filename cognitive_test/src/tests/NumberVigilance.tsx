// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';


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
    const [MatchedNumbers, setMatchedNumbers] = React.useState(0)
    const [SectionAnswers, setSectionAnswers] = React.useState<any>([])
    const [AnswerArray, setAnswerArray] = React.useState<any>([])
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Inserted, setInserted] = React.useState(false)
    
    const test_table = "test_results"

    const correct_class = ["bg-blue-400 rounded px-10 h-12 text-white outline-0", "bg-green-400 rounded px-10 h-12 text-white outline-0", "bg-red-400 rounded px-10 h-12 text-white outline-0"]
    const [CorrectClass, setCorrectClass] = React.useState(correct_class[0])

    const popup_class = ["text-green-400 text-base h-12", "text-red-400 text-base h-12"]
    const [PopupClass, setPopupClass] = React.useState(popup_class[0])

    const [PopupTimer, setPopupTimer] = React.useState(0)

    const popup_text = ["", "Good!", "Wrong!"]
    const [PopupText, setPopupText] = React.useState(popup_text[0])

    const popup_time = 1

    const per_minute = 12

    const shown_value = 60

    //proficient overall score
    const proficiency = Math.round(Math.round(shown_value / 60) * per_minute * .7)

    const interval = "time"

    //section interval, every 3 digits, 6 sections total
    const time = 5

    const test_name = "number_vigilance"

    

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
                    let number = Math.ceil(Math.random() * 10)
                    setCorrectClass(correct_class[0])
                    setShownCount(ShownCount + 1)
                    Math.round(ShownCount + 1) % 2 == 0 ? get_time() : null
                    set_interval()
                    setCurrentNumber(number) 
                    number == TestNumber ? setMatchedNumbers(MatchedNumbers + 1) : null
                }
                
            }, 500)

            return () => clearTimeout(timeoutId)
        }

    }, [IntervalTime])


    useEffect(() => {
        var temp_arr = []
        if(ShownCount % (shown_value/time) == 0 && ShownCount > 1){
            temp_arr = AnswerArray
            temp_arr.push(SectionAnswers)
            setAnswerArray(temp_arr)
            setSectionAnswers([])
        }
        
        ShownCount % 12 == 0 && ShownCount > 0 ? setShowCirclesGreen(true) : setShowCirclesGreen(false)
        if(ShownTimer == 60){
            setEndTest(true)
            setAttentionData(analysis["attention"](interval, CorrectCount, shown_value, proficiency, true, MatchedNumbers))
            setShowCirclesGreen(true)
        }
    }, [ShownCount])


    useEffect(() => {
        var count = popup_time
        while(PopupTimer > 0){
            const timeoutId = setTimeout(() => {
                setPopupTimer(PopupTimer - .5)
                count = PopupTimer
                if(count <= .5){
                    setPopupText(popup_text[0])
                }
                
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [PopupTimer])


    useEffect(() => {

        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"], shown_value, per_minute, MatchedNumbers)) : null
        !Inserted && AttentionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])


    // Sets the interval between prompts
    // @param: N/A
    // @return: N/A
    function set_interval(){
        setIntervalTime(1)
    }


    // Sets the state variable from /src/app/page.tsx to the an array containing the post-test analysis and sets the test name to the current test.
    // @param: N/A
    // @return: N/A
    function handle_insert(){
        console.log("inserting to database")
        props.setData([AttentionData, DecisionData, ReactionData])
        props.setTestName(test_name)
        props.setTable(test_table)
        setInserted(true)
    }

    // When the buttons is clicked, handles necessary functions and state variables
    // @param: N/A
    // @return: N/A
    function clicked_button(){
        setReactionData(null)
        setTestNumber(Math.ceil(Math.random()*10))
        setShowNumber(true)
        !ClickedButton ? setClickedButton(true) : setClickedButton(false)
    }

    // Checks if a button has been pressed correctly or not (if it is pressed when the target number is displayed).
    // @param: N/A
    // @return: N/A
    function toggle_pressed(){
        TestNumber == CurrentNumber ? correct_press() : incorrect_press()                     
    }

    // If there is a correct response, handles necessary functions and state variables
    // @param: N/A
    // @return: N/A
    function correct_press(){
        var temp_arr = SectionAnswers
        temp_arr.push(1)
        toggle_popup(true)
        setSectionAnswers(temp_arr)
        setCorrectClass(correct_class[1])
        setCorrectCount(CorrectCount + 1)
    }

    // If there is an incorrect response, handles necessary functions and state variables
    // @param: N/A
    // @return: N/A
    function incorrect_press(){
        var temp_arr = SectionAnswers
        temp_arr.push(0)
        toggle_popup(false)
        setSectionAnswers(temp_arr)
        setCorrectClass(correct_class[2])
        setIncorrectCount(IncorrectCount + 1)
    }

    // Based on the response, sets the popup text and color.
    // @param 'condition': True if a correct response, false otherwise.
    // @return: N/A
    function toggle_popup(condition: any){
        if(condition){
            setPopupClass(popup_class[0])
            setPopupText(popup_text[1])   
        }else{
            setPopupClass(popup_class[1])
            setPopupText(popup_text[2])
        }
        setPopupTimer(popup_time)
    }

    // Sets the display timer based on the running clock.
    // @param: N/A
    // @return: N/A
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

    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
        // setShowNumber(false)
        // setResponsePressed(false) 
        // setResponsesArray([])
        // setClickedButton(false)
        // setCorrect(false)
        // setCurrentNumber(0)
        // setTimerDisplay("0:00")
        // setEndTest(false)
        // setResponseTime(100)
        // setPressedCount(0)
        // setIntervalTime(1)
        // setAvgTime(0)
        // setShownCount(0)
        // setShownTimer(0)
        // setTestNumber(0)
        // setCorrectCount(0)
        // setIncorrectCount(0)
        // setCorrectClass(correct_class[0])
    }

    
    // For the progress bar display. Determines how much of the test is completed.
    // @param: N/A
    // @return: N/A 
    function get_position(){
        return ShownCount > 0 && ShownCount % 12 == 0 ? (ShownCount / 12) + 9 : ShownCount == 0 ? 0 : null 
    }


  return(
    <div className="grid grid-auto-rows">
        <div className="row">
            NUMBER VIGILANCE
        </div>
        <div className="row mt-12 text-sky-400">
            A number appears at the top of the screen. When the test is started, random numbers are shown a quick rate for one minute. Click the 'Okay' button when the two numbers match to test your reaction time.
        </div>
        {!EndTest ?
            <div>          
                {!ClickedButton ? 
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white mt-12" onClick={clicked_button}>
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
                            <div className="row mt-36 grid grid-auto-rows place-items-center gap-12"> 
                                <span className={PopupClass}>
                                    {PopupText}
                                </span>
                                <Button color="primary" className={CorrectClass} onClick={toggle_pressed}>
                                    Okay
                                </Button>
                            </div>
                        </div>
                        <div>
                            <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={10} CurrentPosition={get_position()} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
                        </div>
                    </div> 
                }                                                
            </div>
        :
            <div className="grid grid-auto-rows mt-[150px] place-items-center gap-12">
                <div className="mt-12"> 
                    <span>
                        The Test is Over
                    </span>
                </div>    
                <div className="mt-12 text-green-400">
                    Correct Responses: {CorrectCount == 0 && IncorrectCount == 0 ? "N/A" : CorrectCount}
                </div> 
                <div className="text-red-400">
                    Incorrect Responses: {CorrectCount == 0 && IncorrectCount == 0 ? "N/A" : IncorrectCount}
                </div>
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData}/>
                </div> 
                <Button className="mt-24 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                     Reset
                </Button>
            </div>
        }   
    </div>
  )

}

  