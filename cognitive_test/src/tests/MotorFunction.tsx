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
    const [TestTime, setTestTime] = React.useState(0)
    const [FoundCount, setFoundCount] = React.useState(0)
    const [RoundCount, setRoundCount] = React.useState(3) 
    const [CurrentAttempts, setCurrentAttempts] = React.useState(0)
    const [TotalAttempts, setTotalAttempts] = React.useState(0)
    const [CurrentRound, setCurrentRound] = React.useState(1)
    const [DelayTime, setDelayTime] = React.useState<any>(0)
    const [RoundAttempts, setRoundAttempts] = React.useState<any[]>([])

    const [TokenPattern, setTokenPattern] = React.useState<any[]>([])
    const [BoxCount, setBoxCount] = React.useState(3)
    const [CurrentMessage, setCurrentMessage] = React.useState<any>("") 
    const [ClockDisplay, setClockDisplay] = React.useState<any>("") 
    const [CurrentShape, setCurrentShape] = React.useState<any>("") 
    const [CurrentPosition, setCurrentPosition] = React.useState(0)
    const [Pause, setPause] = React.useState(-1)
    const [AverageTime, setAverageTime] = React.useState(0)
    const [OriginalTime, setOriginalTime] = React.useState<any>(0)
    const [FoundTimes, setFoundTimes] = React.useState<any[]>([])


    // const box_style = ["h-32 w-32 bg-pink-400 cursor-pointer", "h-32 w-32 bg-yellow-400 cursor-pointer", "h-32 w-32 bg-cyan-400 cursor-pointer", "h-32 w-32 bg-green-400 cursor-pointer","h-32 w-32 bg-blue-400 cursor-pointer"]
    const box_style = ["bg-pink-400 cursor-pointer rectangle"]

    const shapes = ["circle", "square", "triangle", "heart", "star", "moon"]
    //const shapes = ["circle", "square", "star"]
    // const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'amber', 'emerald', 'fuchsia', 'cyan', 'lime', 'rose', 'sky', 'teal', 'violet']
    const colors = ['red', 'yellow', 'green', 'blue', 'pink']

    const sizes = ["h-16 w-16", "h-20 w-20", "h-24 w-24", "h-32 w-32", "h-40 w-40", "h-48 w-48", "h-56 w-56"]
      

    const [BoxGrid, setBoxGrid] = React.useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])  



    useEffect(() => {

        // if(CurrentRound <= 10){
        //     FoundCount == BoxCount ? setNextRound(true) : null
        //     NextRound ? build_next_round() : null
        // } 
        FoundTimes.length > 10 ? setEndTest(true) : null

        while(IsPaused && Pause > -1){
            const timeoutId = setTimeout(() => {
                if(Pause > 0){ 
                    setPause(Pause - 1)
                    console.log("\n\npause")
                    console.log(Pause - 1)
                }else{
                    setDelayTime(3)
                    create_item()
                    setPause(-1)
                    setIsPaused(false)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId)

        }



        while(Delay && DelayTime > -1){
            const timeoutId = setTimeout(() => {
   

                if(DelayTime > 0){
                    setDelayTime(DelayTime - (1/10))
                    console.log("delay time")
                    console.log(DelayTime - (1/10))
                    // console.log(Pause)
                    //console.log(IsPaused)
                }else{
                    var time_arr = FoundTimes
                    //setDelay(false)
                    setDelayTime(0)

                    
                    // !Found ? time_arr.push(0) : null
                    !Found ? token_found(false, null) : null
                    setFound(false)
                    clear_grid()

                    
                    // move_item()
                    // setTotalAttempts(TotalAttempts + CurrentAttempts)
                    // setCurrentRound(CurrentRound + 1)
                    // setCurrentAttempts(0)
                }
            }, 100 )

            return () => clearTimeout(timeoutId)
        }


        while(TestTime >= 0 && TestStart && !EndTest){
            const timeoutId = setTimeout(() => {
                if(CurrentRound <= 10){ 
                    set_clock(TestTime + 1)
                    setTestTime(TestTime + 1)
                }else{
                    setTestTime(-1)
                }

            }, 1000 )
    
            return () => clearTimeout(timeoutId)

        }





    }, [CurrentRound, Delay, DelayTime, TestTime, TestStart, EndTest, Pause, IsPaused, FoundTimes])






    function build_next_round(){
        setTokensFound(false)``
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


    function average_time(time: any){
        time = time/10
        var minutes: any = Math.floor(time/60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setAverageTime(display)
    }



    function start_handler(){
        set_clock(0)
        create_item()
        setTestStart(true)
        setDelay(true)
        setShowData(true)
        setCurrentMessage("Click Boxes to Find Tokens")
    }



    function check_token(event: any){
        event.target.className != "" ? token_found(true, event) : token_found(false, event)        
    }



    function token_found(found: any, event: any){
        var time_arr = FoundTimes
        var box_arr = BoxGrid

        
        if(found){'['
            console.log("\n\nSHAPE FOUND")
            time_arr.push(OriginalTime-DelayTime)
            setFound(true)
            

            ///set delay between clicks

        }else{
            console.log("\n\nINCORRECT CLICK")
            time_arr.push(0)
        }

        console.log("time array")
        console.log(time_arr)
        clear_grid()
        // create_item()
        setIsPaused(true)
        setPause(3)
        setFoundTimes(time_arr)

    }


    function clear_grid(){
        var temp_arr = BoxGrid
        for(var i=0; i<temp_arr.length; i++){
            temp_arr[i] = ""
        }
        setBoxGrid(temp_arr)
    }



    function create_item(){
        var box_arr = BoxGrid
        var position = Math.floor(Math.random() * BoxGrid.length)
        var style = random_style()
        var delay_time = Math.floor(Math.random() * 3) + 1
        // console.log("delay time")
        // console.log(delay_time)
        box_arr[position] = style

        // console.log(box_arr[position])
        setCurrentPosition(position)
        setCurrentShape(style)
        setBoxGrid(box_arr)
        setDelayTime(delay_time)
        setOriginalTime(delay_time)
        setDelay(true)
    }


    function random_style(){
        var shape = Math.floor(Math.random() * shapes.length)
        var color = Math.floor(Math.random() * colors.length)
        var size = Math.floor(Math.random() * sizes.length)

        //var str = shapes[shape] + " " + sizes[size] + " " + "bg-" + colors[color] + "-300 " + "cursor-pointer" 

        var str = shapes[shape] + " " + "bg-" + colors[color] + "-400 " + "cursor-pointer" 
        // console.log(str)
        return str
        
    }


    function move_item(){
        var shape = CurrentShape
        var box_arr = BoxGrid


        var position = Math.floor(Math.random() * BoxGrid.length)

        box_arr[position] = CurrentShape
        setCurrentPosition(position)


    }


  return(
    <div className="h-full">
        <div className="row">
            TEST #9: MOTOR FUNCTION
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
                        {Delay ? 
                            <div className="h-240 grid grid-flow-rows auto-rows-max mt-12 gap-12 bg-gray-400"> 
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

  