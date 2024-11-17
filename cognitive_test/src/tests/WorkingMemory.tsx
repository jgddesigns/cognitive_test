'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';
import { analysis } from '@/helpers/Analysis';


export default function WorkingMemory(props: any) {
    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [NextRound, setNextRound] = React.useState(false)
    const [Delay, setDelay] = React.useState(false)
    const [TokensFound, setTokensFound] = React.useState(false)
    const [TestTime, setTestTime] = React.useState(0)
    const [FoundCount, setFoundCount] = React.useState(0)
    const [RoundCount, setRoundCount] = React.useState(3) 
    const [CurrentAttempts, setCurrentAttempts] = React.useState(0)
    const [TotalAttempts, setTotalAttempts] = React.useState(0)
    const [CurrentRound, setCurrentRound] = React.useState(1)
    const [DelayTime, setDelayTime] = React.useState(0)
    const [RoundAttempts, setRoundAttempts] = React.useState<any[]>([])
    const [TokenPattern, setTokenPattern] = React.useState<any[]>([])
    const [BoxCount, setBoxCount] = React.useState(3)
    const [CurrentMessage, setCurrentMessage] = React.useState<any>("") 
    const [ClockDisplay, setClockDisplay] = React.useState<any>("") 
    const [AverageTime, setAverageTime] = React.useState(0)
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Answers, setAnswers] = React.useState<any>([])
    const [Inserted, setInserted] = React.useState(false)

    const box_style = ["h-32 w-32 bg-gray-400 cursor-pointer", "h-32 w-32  bg-yellow-400", "h-32 w-32 bg-cyan-400"]

    const [BoxGrid, setBoxGrid] = React.useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])  

    const total_rounds = 10

    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(response_time)
    const [TimeArray, setTimeArray]: any = React.useState([])


    const proficiency = Math.round(total_rounds * .7)
    const interval = "sections"
    const time = 3
    const time_measure = 25
    const max_time = 50
    const test_name = "working_memory"


    useEffect(() => {
        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        AttentionData ? AttentionData["original_answers"][AttentionData["original_answers"] - 1] <= time_measure ? setShowCirclesGreen(true) : setShowCirclesRed(true) : null
        !Inserted && AttentionData && ReactionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])


    useEffect(() => {
        var count
        while(ShowData && !Delay && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime + response_time)
            }, response_time )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowData, Delay, ResponseTime])


    useEffect(() => {
        Delay ? setResponseTime(response_time) : null
    }, [Delay])


    // Resets the response time clock
    // @param: N/A
    // @return: N/A
    function reset_time(){
        var arr = TimeArray
        CurrentAttempts < 4 ? arr.push(ResponseTime*.001) : arr.push(max_time)
        console.log("time")
        console.log(arr)
        setTimeArray(arr)
        setResponseTime(0)
    }


    useEffect(() => {

        if(CurrentRound <= total_rounds && FoundCount == BoxCount){
            setNextRound(true)
            NextRound ? build_next_round() : null
        } 


        while(Delay && DelayTime <= 4){
            const timeoutId = setTimeout(() => {

                if(DelayTime <= 3){
                    setDelayTime(DelayTime + 1)
                }else{
                    setDelay(false)
                    setDelayTime(0)
                    setTotalAttempts(TotalAttempts + CurrentAttempts)
                    setCurrentRound(CurrentRound + 1)
                    setCurrentAttempts(0)
                }
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }


        while(TestTime >= 0 && TestStart && !EndTest){
            const timeoutId = setTimeout(() => {
                if(CurrentRound <= total_rounds){ 
                    set_clock(TestTime + 1)
                    setTestTime(TestTime + 1)
                }else{
                    setTestTime(-1)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId)

        }


    }, [CurrentRound, Delay, DelayTime, TestTime, TestStart, EndTest])


    // Sets the state variable from /src/app/page.tsx to the an array containing the post-test analysis and sets the test name to the current test.
    // @param: N/A
    // @return: N/A
    function handle_insert(){
        console.log("inserting to database")
        props.setData([AttentionData, DecisionData, ReactionData])
        props.setTestName(test_name)
        setInserted(true)
    }

    // Adds an additional box to the display for the next round
    // @param: N/A
    // @return: N/A
    function build_next_round(){
        setTokensFound(false)
        setFoundCount(0)
        CurrentAttempts < 4 ? setShowCirclesGreen(true) : setShowCirclesRed(true) 
        setRoundCount(RoundCount + 1)
        setBoxCount(BoxCount + 1)
        setNextRound(false)
        add_token()
    }

    // If an answer is correct and there are less than 4 attempts, pushes a 1 to the answer array. This indicates success for the current round. A 0 is push otherwise.
    // @param: N/A
    // @return: N/A
    function handle_answers(){
        var answers = Answers
        CurrentAttempts < 4 ? answers.push(1) : answers.push(0)
        setAnswers(answers)
    }

    // Empties the display grid
    // @param 'token_arr': The array of current boxrs displayed
    // @return: N/A
    function reset_grid(token_arr: any){
        var grid_arr = BoxGrid

        for(var i=0; i<token_arr.length; i++){
            grid_arr[token_arr[i]] = box_style[0]
        }
    }


    // Adds another box to be found in the next round
    // @param: N/A
    // @return: N/A
    function add_token(){
        var box_grid = BoxGrid
        var token_arr = TokenPattern
        var num: any = null
        var set = false
        
        while(!set){
            num =  Math.floor(Math.random() * BoxGrid.length)
            if(!token_arr.includes(num)){
                token_arr.push(num)
                set = true
            }
        }

        box_grid[num] = box_style[num]

        reset_grid(token_arr)
        setBoxGrid(BoxGrid)
        setTokenPattern(token_arr)        
    }

    // Sets the clock display based on the test timer
    // @param 'time': The time from the countdown
    // @return: N/A
    function set_clock(time: any){
        var minutes: any = Math.floor(time/60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setClockDisplay(display)
    }

    // Creates the display of average response times
    // @param 'time': The total amount of response time
    // @return: N/A
    function average_time(time: any){
        time = time/total_rounds
        var minutes: any = Math.floor(time/60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setAverageTime(display)
    }

    // Randomizes the display layout of boxes
    // @param 'box_count': The amount of boxes to be displayed
    // @return: N/A
    function randomize_layout(box_count: any = null){
        var token_arr: any = []
        var temp_arr = BoxGrid 
        var i = 0

        !box_count ? box_count = BoxCount : null

        while(i < box_count){
            var num = Math.floor(Math.random() * 24) 
            temp_arr[num] = box_style[0]

            if(!token_arr.includes(num)){
                token_arr.push(num)
                i++
            } 
        } 

        setCurrentAttempts(0)
        setBoxGrid(temp_arr)
        setTokenPattern(token_arr)
    }


    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        set_clock(0)
        randomize_layout()
        setTestStart(true)
        setShowData(true)
        setCurrentMessage("Click Boxes to Find Tokens")
    }


    // Checks if a response is correct or not
    // @param 'event': The click event from the response
    // @return: N/A
    function check_token(event: any){
        var grid_arr = BoxGrid
        if(grid_arr[event.target.id] == box_style[0]){
            event.target.id == TokenPattern[FoundCount] ? token_found(true, event) : token_found(false, event) 
        }
    }


    // Once a box is found, calls the necessary functions and sets the state variables according to the answer. Also builds the next round, builds the next round, and logs/resets the response time.
    // @param 'found': A boolean variable signifying if a correct response was given
    // @param 'event': The click event from the response
    // @return: N/A
    function token_found(found: any, event: any){
        var grid_arr = BoxGrid
        var pattern_arr = TokenPattern
        var round_arr = RoundAttempts
        
        FoundCount == 0 ? setCurrentAttempts(CurrentAttempts + 1) : null

        if(!TokensFound){
            if(found){
                console.log("\n\nToken Found")
                setCurrentMessage("Token Found")
                grid_arr[event.target.id] = box_style[1]
                setBoxGrid(grid_arr)
                setFoundCount(FoundCount + 1)

                console.log("\n\nRound Count")
                console.log(RoundCount)
                
                //pulsing graphics?
                if(FoundCount + 1 == RoundCount){
                    handle_answers()
                    round_arr.push(CurrentAttempts)
                    setRoundAttempts(round_arr)
                    console.log("\n\nAll Tokens Found")
                    setTokensFound(true)
                    reset_time()
                    setCurrentMessage("All Tokens Found")
                    if(CurrentRound + 1 > 10){ 
                        average_time(TestTime)
                        setEndTest(true)
                        setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
                        setReactionData(analysis["speed"](TimeArray, time_measure))

                        var num = 0
                        for(var i=0; i<RoundAttempts.length; i++){
                            num = num + RoundAttempts[i]
                        }

                        setTotalAttempts(num)

                        return true
                    }

                    build_next_round()
                    TimeArray.length < total_rounds ? reset_time() : null
                    setDelay(true)
                }

            }else{
                console.log("\n\nToken Not Found")
                setCurrentMessage("Incorrect Guess, Restart the Round")
              
                var i = 0
                while(i < pattern_arr.length){
                    console.log(pattern_arr[i])
                    grid_arr[pattern_arr[i]] = box_style[0]
                    i++
                }

                setFoundCount(0)  
            }
            setBoxGrid(grid_arr)
        }
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
        return RoundAttempts.length > 0 ? Math.abs(RoundAttempts.length - total_rounds) : 0
    }


  return(
    <div className="h-full">
        <div className="row">
            SPATIAL WORKING MEMORY
        </div>
        <div className="row mt-12 text-sky-400">
            The test begins with three colored boxes shown on the screen. One box contains a token. When the token is found, it is added to the 'found list' above the play area. The token is then moved to another box for the user to find again. The rate at which this occurs is equal to the amount boxes shown on the screen.
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
                                    <div>{CurrentMessage}</div>
                                    <div>Current Round: {CurrentRound}</div>
                                    <div>Attempts in Round: {CurrentAttempts}</div>
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
                        {!Delay ?
                            <div className="h-240 grid grid-flow-rows auto-rows-max mt-12 gap-12 bg-blue-400 border-24"> 
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
                                <div className="h-48 grid grid-cols-5 ml-12">
                                    <div id="10" className={BoxGrid[10]} onClick={(event) => check_token(event)}/>
                                    <div id="11" className={BoxGrid[11]} onClick={(event) => check_token(event)}/>
                                    <div id="12" className={BoxGrid[12]} onClick={(event) => check_token(event)}/>
                                    <div id="13" className={BoxGrid[13]} onClick={(event) => check_token(event)}/>
                                    <div id="14" className={BoxGrid[14]} onClick={(event) => check_token(event)}/>
                                </div>
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


                        :   
                            <div className="grid place-items-center h-240">
                                <div>
                                    Next Round:
                                </div>
                                <div className="mt-12 grid grid-rows-2">
                                    {DelayTime + 1}
                                    {DelayTime == 4 ? 
                                        <span>
                                            Go!
                                        </span>
                                    : null}
                                </div>
                            </div>
                        }
                    </div>
            : null
        :
            <div className="grid grid-rows-3 mt-24 place-items-center"> 
                <div className="mt-4 text-4xl">
                    The Test is Over
                </div> 

                <div className="mt-8 ml-12">
                    Total Time: {ClockDisplay}
                </div>

                <div className="mt-8 ml-12">
                    Average Time Per Round: {AverageTime}
                </div>

                <div className="mt-8 ml-12">
                    Total Attempts: {TotalAttempts}
                </div>

                <div className="mt-8 ml-12">
                    Average Attempts Per Round: {TotalAttempts/10}
                </div>

                {/* REPLACE WITH MAP? */}
                <div className="mt-16">
                    <span className="text-underline">
                        Round Attempts
                    </span>
                </div>
                <div className="mt-8 ml-12">
                    Round 1: {RoundAttempts[0]}
                </div>
                <div className="mt-8 ml-12">
                    Round 2: {RoundAttempts[1]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 3: {RoundAttempts[2]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 4: {RoundAttempts[3]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 5: {RoundAttempts[4]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 6: {RoundAttempts[5]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 7: {RoundAttempts[6]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 8: {RoundAttempts[7]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 9: {RoundAttempts[8]}
                </div>                
                <div className="mt-8 ml-12">
                    Round 10: {RoundAttempts[9]}
                </div> 
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData}/>
                </div>      
                <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                     Reset
                </Button>
            </div>
        }
        {TestStart && ShowData ?
            <div className="mt-12 grid place-items-center">
                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={total_rounds} CurrentPosition={get_position()} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
            </div>
        : null}
    </div>
  )

}

  