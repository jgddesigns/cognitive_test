'use client'
import React, {useEffect, useRef} from 'react'
import {Button} from "@nextui-org/react"
import "../helpers/shapes.css"
import { analysis } from '@/helpers/Analysis'
import ProgressBar from '@/helpers/ProgressBar'
import ShowAnalysis from '@/helpers/ShowAnalysis'
import {descriptions} from '../helpers/test_descriptions'


export default function MotorFunction(props: any) {
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
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Answers, setAnswers] = React.useState<any>([])
    const [Inserted, setInserted] = React.useState(false)
    
    const table = "test_results"

    const shapes = ["circle", "square", "triangle", "heart", "star", "moon", "hexagon", "diamond", "trapezoid"]
    const colors = ["red", "yellow", "green", "blue"]
    const sizes = ["h-16 w-16", "h-24 w-24", "h-32 w-32", "h-48 w-48"]
      
    const [BoxGrid, setBoxGrid] = React.useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]) 
    
    //proficient overall score
    

    const interval = "sections"

    //section interval, every 3 digits, 6 sections total
    const time = 3

    const total_rounds = 10

    const time_measure = 1.5

    const proficiency = Math.round(total_rounds * .7)

    const test_name = "motor_function"
    

    useEffect(() => {

        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        !Inserted && AttentionData && ReactionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])

    useEffect(() => {
        
        FoundTimes.length >= total_rounds ? end_test() : null

        while(IsPaused && Pause > -1){
            const timeoutId = setTimeout(() => {
                if(Pause > 0){ 
                    setPause(Pause - 1)
                }else{
                    setMissed(false)
                    setDelayTime(3)
                    create_item()
                    setPause(-1)
                    setIsPaused(false)
                }
            }, 1000)
    
            return () => clearTimeout(timeoutId)
        }

    }, [Pause, IsPaused, FoundTimes])


    useEffect(() => {

        while(Delay && DelayTime > -1){
            const timeoutId = setTimeout(() => {
   
                if(DelayTime > 0){
                    setDelayTime(DelayTime - (1/10))
                }else{
                    setDelayTime(0)
                    if(!Found){
                        token_found(false)
                        setNotAttempted(NotAttempted + 1)
                    }
                    setDelay(false)
                    setFound(false)
                    clear_grid()
                }
            }, 100)

            return () => clearTimeout(timeoutId)
        }

    }, [Delay, DelayTime])


    useEffect(() => {

        while(TestTime >= 0 && ShowData && !EndTest){
            const timeoutId3 = setTimeout(() => {
                if(CurrentRound <= total_rounds){ 
                    set_clock(TestTime + 1)
                    setTestTime(TestTime + 1)
                }else{
                    setTestTime(-1)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId3)
        }

    }, [TestTime, ShowData, EndTest])


    useEffect(() => {

        while(CountTimer >= 0 && CountDown){
            const timeoutId3 = setTimeout(() => {
                if(CountTimer > 0){ 
                    CountTimer == 1 ? setCountMessage("Go!") : null
                    setCountTimer(CountTimer - 1)
                }else{
                    setCountTimer(-1)
                    create_item()
                    setDelay(true)
                    setShowData(true)
                    toggle_countdown(false)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId3)

        }

    }, [CountDown, CountTimer])


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

    // Sets the countdown based on the condition. If true, starts the countdown. If false stops the countdown.
    // @param 'condition': A boolean of true or false. Determines if countdown should be started.
    // @return: N/A
    function toggle_countdown(condition: any){
        if(condition){
            setCountDown(true)
            setCountTimer(5)
        }else{
            setCountDown(false)
            setCountTimer(-1)
        }
    }

    // Calls the functions and sets the state variables needed to end the test.
    // @param: N/A
    // @return: N/A
    function end_test(){
        average_time()
        setDelay(false)
        setIsPaused(false)
        setEndTest(true) 
        !AttentionData ? setAttentionData(analysis["attention"](interval, Answers, time, proficiency)) : null
        !ReactionData ? setReactionData(analysis["speed"](FoundTimes, time_measure)) : null
    }


    // Sets the clock display based on the test timer
    // @param 'time': The time from the countdown
    // @return: N/A
    function set_clock(time: any){
        var minutes: any = Math.floor(time / 60)
        var seconds: any = Math.floor(time % 60)
        seconds < total_rounds ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setClockDisplay(display)
    }

    // Calculates the average response time from each round of the test
    // @param: N/A
    // @return: N/A
    function average_time(){
        var time_arr = FoundTimes
        var total: any = 0
        var missed_clicks = 0
        var denominator = 0

        for(var i=0; i < time_arr.length; i++){
            if(time_arr[i] > 0){
                denominator++
                total = total + time_arr[i]
            }else{
                missed_clicks++
            }
        }

        total > 0 ? total = total / denominator : total = "N/A"
   
        !isNaN(total) ? total = total.toString().slice(0, 4) : null

        setMissedClicks(missed_clicks)
        setAverageTime(total)
    }


    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        set_clock(0)
        setTestStart(true)
        toggle_countdown(true)
        setCurrentMessage("Click Shapes as Quickly as Possible")
    }


    // Checks if a shape has been clicked on
    // @param 'event': The click event based on the grid area
    // @retUrn: N/A
    function check_token(event: any){
        Delay ? event.target.className != "" ? token_found(true) : token_found(false) : null
        setShowCirclesGreen(true)
    }


    // Once the 'check_token' function determines if a shape has been clicked or not, calls the appropriate functions and sets the state variables.
    // @param 'found': Boolean regarding if the shape is found or not
    // @return: N/A
    function token_found(found: any){
        var time_arr = FoundTimes
        var temp_arr = Answers
        var time = build_time()

        if(found){
            console.log("\n\nSHAPE FOUND")
            time_arr.push(time)
            setFound(true)
        }else{
            console.log(CurrentShape)
            setCurrentShape(null)
            setMissed(true)
            console.log("\n\nINCORRECT CLICK")
            time_arr.push(0)
            setFound(false)
        }
        time <= time_measure ? temp_arr.push(1) : temp_arr.push(0)
        time <= time_measure ? setShowCirclesGreen(true) : setShowCirclesRed(true)
        console.log("answer array")
        console.log(temp_arr)
        setAnswers(temp_arr)
        console.log("time array")
        console.log(time_arr)
        clear_grid()
        setIsPaused(true)
        setPause(3)
        setFoundTimes(time_arr)
        setDelay(false)
    }

    // Sets the display time
    // @param: N/A
    // @return: N/A
    function build_time(){
        var time: any = OriginalTime - DelayTime
        
        if(time == 0){
            return time
        }

        time = time.toString()
        time.toString()[0] == "0" ? time = time.slice(1, time.length) : null
        time = time.slice(0, 4)
        time[3] == 0 ? time = time.slice(0,3) : null
        time[0] != 1 && time[2] == 0 ? time = time.slice(0,2) : null
        time[0] == 0 ? time.slice(0,1) : null
        console.log(time[0])
        time[0] == 0 ? setLastTime(parseFloat(time) + " seconds") : setLastTime(time + " seconds")

        return parseFloat(time)
    }

    // Clears the grid of all displayed shapes
    // @param: N/A
    // @return: N/A
    function clear_grid(){
        var temp_arr = BoxGrid
        for(var i=0; i<temp_arr.length; i++){
            temp_arr[i] = ""
        }

        setCurrentShape(null)
        setBoxGrid(temp_arr)
    }

    // Creates a shape to display. Uses '/src/helpers/shapes.css'.
    // @param: N/A
    // @return: N/A
    function create_item(){
        var box_arr = BoxGrid
        var position = Math.floor(Math.random() * BoxGrid.length)
        var style = random_style()
        var delay_time = 5

        box_arr[position] = style

        setCurrentRound(FoundTimes.length + 1)
        setCurrentPosition(position)
        setCurrentShape(style)
        setFound(false)
        setBoxGrid(box_arr)
        setDelayTime(delay_time)
        setOriginalTime(delay_time)
        setDelay(true)
    }

    // Randomizes the size and color of a shape
    // @param: N/A
    // @return (string): A Tailwind CSS string to set the shape's style to
    function random_style(){
        var shape = Math.floor(Math.random() * shapes.length)
        var color = Math.floor(Math.random() * colors.length)
        var size = Math.floor(Math.random() * sizes.length)
        var str = ""

        shapes[shape] == "star" ? str = "bg-" + colors[color] + "-400 " + "cursor-pointer " + shapes[shape] : str = sizes[size] + " " + "bg-" + colors[color] + "-400 " + "cursor-pointer " + shapes[shape]

        console.log("\n\nSHAPE")
        console.log(str)

        return str 
    }


    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
        // setEndTest(false)
        // setTestStart(false)
        // setShowData(false)
        // setNextRound(false)
        // setDelay(false)
        // setTokensFound(false)
        // setIsPaused(false)
        // setFound(false)
        // setMissed(false)
        // setTestTime(0)
        // setFoundCount(0)
        // setRoundCount(3)
        // setCurrentAttempts(0)
        // setTotalAttempts(0)
        // setCurrentRound(1)
        // setDelayTime(0)
        // setFoundTimes([])
        // setTokenPattern([])
        // setBoxCount(3)
        // setCurrentMessage("")
        // setClockDisplay("")
        // setCurrentShape("")
        // setCountMessage("")
        // setCurrentPosition(0)
        // setPause(-1)
        // setAverageTime(0)
        // setLastTime("")
        // setMissedClicks(0)
        // setNotAttempted(0)
        // setOriginalTime(0)
        // setCountDown(false)
        // setCountTimer(-1)
        // setBoxGrid(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
        // setRestart(true)
    }


    return(
        <div className="h-full">
            <div className="row">
                MOTOR FUNCTION
            </div>
            <div className="row mt-12 text-sky-400">
                {descriptions["motor_function"]}
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

                            {/* REPLACE WITH MAP? */}
                            
                                <div className="h-240 grid grid-flow-rows auto-rows-max mt-12 gap-12 bg-gray-400 w-full"> 
                                    <div className="h-48 grid grid-cols-5 mt-12 ml-12">
                                        <div id="0" className={BoxGrid[0]} onClick={(event) => check_token(event)}/>
                                        <div id="1" className={BoxGrid[1]} onClick={(event) => check_token(event)}/>
                                        <div id="2" className={BoxGrid[2]} onClick={(event) => check_token(event)}/>
                                        <div id="3" className={BoxGrid[3]} onClick={(event) => check_token(event)}/>
                                        <div id="4" className={BoxGrid[4]} onClick={(event) => check_token(event)}/>
                                    </div>
                                    <div className="h-48 grid grid-cols-5 ml-12">
                                        <div id="5" className={BoxGrid[5]} onClick={(event) => check_token(event)}/>
                                        <div id="6" className={BoxGrid[6]} onClick={(event) => check_token(event)}/>
                                        <div id="7" className={BoxGrid[7]} onClick={(event) => check_token(event)}/>
                                        <div id="8" className={BoxGrid[8]} onClick={(event) => check_token(event)}/>
                                        <div id="9" className={BoxGrid[9]} onClick={(event) => check_token(event)}/>
                                    </div>
                                    {Delay ?
                                        <div className="h-48 grid grid-cols-5 ml-12">
                                            
                                            <div id="10" className={BoxGrid[10]} onClick={(event) => check_token(event)}/>
                                            <div id="11" className={BoxGrid[11]} onClick={(event) => check_token(event)}/>
                                            <div id="12" className={BoxGrid[12]} onClick={(event) => check_token(event)}/>
                                            <div id="13" className={BoxGrid[13]} onClick={(event) => check_token(event)}/>
                                            <div id="14" className={BoxGrid[14]} onClick={(event) => check_token(event)}/>
                                        </div>
                                    :   
                                        <div className="h-48 grid place-items-center text-[42px] text-white">
                                            {Missed ? 
                                                <div>
                                                    MISSED!
                                                </div>
                                            :
                                                <div>
                                                    Found in: {LastTime}
                                                </div>                         
                                            }
                                        </div>
                                    }
                                    <div className="h-48 grid grid-cols-5 ml-12">
                                        <div id="15" className={BoxGrid[15]} onClick={(event) => check_token(event)}/>
                                        <div id="16" className={BoxGrid[16]} onClick={(event) => check_token(event)}/>
                                        <div id="17" className={BoxGrid[17]} onClick={(event) => check_token(event)}/>
                                        <div id="18" className={BoxGrid[18]} onClick={(event) => check_token(event)}/>
                                        <div id="19" className={BoxGrid[19]} onClick={(event) => check_token(event)}/>
                                    </div>
                                    <div className="h-48 grid grid-cols-5 ml-12">
                                        <div id="20" className={BoxGrid[20]} onClick={(event) => check_token(event)}/>
                                        <div id="21" className={BoxGrid[21]} onClick={(event) => check_token(event)}/>
                                        <div id="22" className={BoxGrid[22]} onClick={(event) => check_token(event)}/>
                                        <div id="23" className={BoxGrid[23]} onClick={(event) => check_token(event)}/>
                                        <div id="24" className={BoxGrid[24]} onClick={(event) => check_token(event)}/>
                                    </div>
                                </div>
                        </div>
                :   CountTimer > 0 ? 
                        <div className="mt-48 grid place-items-center text-4xl">
                            {CountTimer}
                        </div> 
                    :   
                        <div className="mt-48 grid place-items-center text-4xl">
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

                    <div className="ml-12">
                        Average Time Per Click: {AverageTime} seconds
                    </div>

                    <div className="ml-12">
                        Missed Clicks: {MissedClicks} ({NotAttempted} not attempted)
                    </div>
                    
                    <div className="mt-24 ml-12 text-2xl underline underline-offset-4">
                        Round Attempts
                    </div>
                    <div className="mt-8 ml-12">
                        Round 1: {FoundTimes[0]}
                    </div>
                    <div className="mt-8 ml-12">
                        Round 2: {FoundTimes[1]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 3: {FoundTimes[2]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 4: {FoundTimes[3]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 5: {FoundTimes[4]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 6: {FoundTimes[5]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 7: {FoundTimes[6]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 8: {FoundTimes[7]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 9: {FoundTimes[8]}
                    </div>                
                    <div className="mt-8 ml-12">
                        Round 10: {FoundTimes[9]}
                    </div>
                    <div className="w-[100%]">
                        <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData} />
                    </div> 
                    <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                        Reset
                    </Button>      
                </div>
            }
            {CountTimer < 0 && TestStart ?
                <div className="grid place-items-center">
                    <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={total_rounds} CurrentPosition={total_rounds - FoundTimes.length} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
                </div>
            : null}
        </div>
    )

}



  