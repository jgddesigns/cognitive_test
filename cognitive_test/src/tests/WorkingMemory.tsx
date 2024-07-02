'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


export default function WorkingMemory(props: any) {
    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [NextRound, setNextRound] = React.useState(false)
    const [Delay, setDelay] = React.useState(false)
    const [TokensFound, setTokensFound] = React.useState(false)
    const [TestTime, setTestTime] = React.useState(0)
    const [FoundCount, setFoundCount] = React.useState(0)
    const [RoundCount, setRoundCount] = React.useState(3) //boxes in round (subtract 2 for round num)
    const [CurrentAttempts, setCurrentAttempts] = React.useState(0)
    const [TotalAttempts, setTotalAttempts] = React.useState(0)
    const [CurrentRound, setCurrentRound] = React.useState(1)
    const [DelayTime, setDelayTime] = React.useState(0)
    const [RoundAttempts, setRoundAttempts] = React.useState<any[]>([])
    const [TokenPlace, setTokenPlace] = React.useState<any[]>([])
    const [TokenPattern, setTokenPattern] = React.useState<any[]>([])
    const [BoxCount, setBoxCount] = React.useState(3)
    const [CurrentMessage, setCurrentMessage] = React.useState<any>("") 
    const [ClockDisplay, setClockDisplay] = React.useState<any>("") 

    const box_style = ["h-32 w-32 bg-gray-400 cursor-pointer", "h-32 w-32 bg-yellow-400", "h-32 w-32 bg-cyan-400"]

    const [Boxes, setBoxes] = React.useState<any[]>([box_style[0], box_style[0], box_style[0]]) 
    const [BoxGrid, setBoxGrid] = React.useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])  
    const [BoxesFound, setBoxesFound] = React.useState<any[]>([]) 
    const [BoxesFoundMap, setBoxesFoundMap] = React.useState<any[]>([]) 


    useEffect(() => {

        if(CurrentRound > 10){
            setEndTest(true)

            var num = 0
            for(var i=0; i<RoundAttempts.length; i++){
                num = num + RoundAttempts[i]
            }

            setTotalAttempts(num)
        }else{
            FoundCount == BoxCount ? setNextRound(true) : null
            NextRound ? build_next_round() : null
        } 

        // while(CurrentRound <= 10){
        //     const timeoutId2 = setTimeout(() => {
        //         console.log("1")
        //     }, 1000 )

        //     return () => clearTimeout(timeoutId2)
        // }

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

    }, [FoundCount, NextRound, Delay, DelayTime, RoundCount, EndTest, CurrentRound])




    useEffect(() => {
        while(TestTime >= 0){
            const timeoutId2 = setTimeout(() => {
                if(CurrentRound<=10){
                    console.log("\ntest time")
                    console.log(TestTime + 1)
                    set_clock(TestTime + 1)
                    setTestTime(TestTime + 1)
                }else{
                    setTestTime(-1)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId2)
            
        }

        
    }, [TestTime])




    function build_next_round(){
        setTokensFound(false)
        setFoundCount(0)

        setRoundCount(RoundCount + 1)
        setBoxCount(BoxCount + 1)
        setNextRound(false)
        add_token(RoundCount + 1)
    }


    function reset_grid(token_arr: any){
        var grid_arr = BoxGrid

        for(var i=0; i<token_arr.length; i++){
            grid_arr[token_arr[i]] = box_style[0]
        }
    }


    function add_token(count: any){
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


    function set_clock(time: any){
        var minutes: any = Math.floor(time/60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setClockDisplay(display)
    }


    function build_token(){
        var token_arr = []
        var num = null

        var i = 0
        while(i < BoxCount){
            num = Math.floor(Math.random() * BoxCount)
            token_arr.push(num)
            i++
        }

        setTokenPattern(token_arr)
    }



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


    function start_handler(){
        randomize_layout()
        setTestStart(true)
        setShowData(true)
        setCurrentMessage("Click Boxes to Find Tokens")
    }



    function check_token(event: any){
        var grid_arr = BoxGrid
        if(grid_arr[event.target.id] == box_style[0]){
            console.log("\n\n\nbox id:")
            console.log(event.target.id)
            console.log("token pattern:")
            console.log(TokenPattern)
            event.target.id == TokenPattern[FoundCount] ? token_found(true, event) : token_found(false, event) 
        }
    }



    function token_found(found: any, event: any){
        var found_arr = BoxesFound
        var grid_arr = BoxGrid
        var token_arr = TokenPlace
        var pattern_arr = TokenPattern
        var round_arr = RoundAttempts
        
        FoundCount == 0 ? setCurrentAttempts(CurrentAttempts + 1) : null

        if(!TokensFound){
            if(found){
                console.log("\n\nToken found.")
                setCurrentMessage("Token Found")
                grid_arr[event.target.id] = box_style[1]
                setBoxGrid(grid_arr)
                setFoundCount(FoundCount + 1)

                console.log("\n\nround count")
                console.log(RoundCount)
                
                //pulsing graphics
                if(FoundCount + 1 == RoundCount){
                    console.log("\n\nall tokens found")
                    setTokensFound(true)
                    setCurrentMessage("All Tokens Found")
                    build_next_round()
                    setDelay(true)

                    round_arr.push(FoundCount + 1)
                    setRoundAttempts(round_arr)
                    

                    
                }

                // CurrentAttempts < 1 ? setCurrentAttempts(1) : null
            }else{
                console.log("\n\nToken not found.")
                setCurrentMessage("Incorrect Guess, Restart the Round")
              
                var i = 0
                while(i < pattern_arr.length){
                    console.log(pattern_arr[i])
                    grid_arr[pattern_arr[i]] = box_style[0]
                    i++
                }

                setFoundCount(0)


                console.log("\n\nfound count")
                console.log(FoundCount)

                // setCurrentAttempts(CurrentAttempts + 1)
                console.log(CurrentAttempts + 1)
                // reset_round()     
            }
            setBoxGrid(grid_arr)
        }
    }


    function end_test(){

    }


  return(
    <div className="h-full">
        <div className="row">
            TEST #8: SPATIAL WORKING MEMORY
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

                        <div className="h-12">
                            {BoxesFound.length > 0 ? 
                                //boxes found map
                                <span className="grid place-items-center"></span>
                                
                            : null}
                        </div> 

                        {!Delay ?
                            <div className="h-240 grid grid-flow-rows auto-rows-max mt-12 gap-12 bg-blue-400"> 
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
                            <div className="grid place-items-center">
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
                <div className="mt-4 text-xl">
                    The Test is Over
                </div> 

                <div className="mt-8 ml-12">
                    Total Time: {ClockDisplay}
                </div>

                <div className="mt-8 ml-12">
                    Total Attempts: {TotalAttempts}
                </div>

                <div className="mt-8 ml-12">
                    Average Attempts Per Round: {TotalAttempts/10}
                </div>

                <div className="mt-16">
                    <span className="text-underline">Round Attempts</span>
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


            </div>
        }
    </div>
  )

}

  