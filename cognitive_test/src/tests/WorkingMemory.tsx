'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


export default function WorkingMemory(props: any) {
    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [NextRound, setNextRound] = React.useState(false)
    const [Token, setToken] = React.useState(0)
    const [FoundCount, setFoundCount] = React.useState(0)
    const [RoundCount, setRoundCount] = React.useState(1)
    const [CurrentAttempts, setCurrentAttempts] = React.useState(0)
    const [RoundAttempts, setRoundAttempts] = React.useState<any[]>([])
    const [TokenPlace, setTokenPlace] = React.useState<any[]>([])
    const [TokenPattern, setTokenPattern] = React.useState<any[]>([])
    const [BoxCount, setBoxCount] = React.useState(3)

    const box_style = ["h-32 w-32 bg-gray-400", "h-32 w-32 bg-yellow-400", "h-32 w-32 bg-cyan-400"]

    const [Boxes, setBoxes] = React.useState<any[]>([box_style[0], box_style[0], box_style[0]]) 
    const [BoxGrid, setBoxGrid] = React.useState<any[]>([box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0], box_style[0]])  
    const [BoxesFound, setBoxesFound] = React.useState<any[]>([box_style[0], box_style[0], box_style[0]]) 
    const [BoxesFoundMap, setBoxesFoundMap] = React.useState<any[]>([]) 


    useEffect(() => {

        FoundCount == BoxCount ? setNextRound(true) : null

        NextRound ? build_next_round() : null

    }, [NextRound])



    // function create_box_map(temp_arr: any, type: any){
    //     const box_map = temp_arr.map((index:any) => {
    //         return {
    //           box: temp_arr[index],
    //           key: uuidv4()
    //         }
    //     })

    //     type ? setBoxMap(box_map) : setBoxesFoundMap(box_map)
    // }



    function build_next_round(){
        setCurrentAttempts(1)
        setBoxCount(BoxCount + 1)
        var temp_arr = Boxes 



        setBoxes(temp_arr)
        setNextRound(false)
    }



    function build_token(value: any){
        var token_arr = []
        var num = null
        var i = 0

        while(i < BoxCount){
            num = Math.floor(Math.random() * BoxCount)
            token_arr.push(num)
        }

        setTokenPattern(token_arr)
    }



    function randomize_layout(){
        var temp_arr = BoxGrid 

        var i = 0
        while(i < BoxCount){
            var num = Math.floor(Math.random() * 24) 
            temp_arr[num] = box_style[0]
            i++
        } 

       setBoxGrid(temp_arr)
    }


    function reset_round(){
        var grid_arr = BoxGrid
        setCurrentAttempts(CurrentAttempts + 1)

        for(var i=0; i<grid_arr.length; i++){
            grid_arr[i] = box_style[0]
        }

        setBoxGrid(grid_arr)
    }


    function start_handler(){
        randomize_layout()
        setTestStart(true)
        setShowData(true)
    }


    function check_token(event: any){
        event.target.id == TokenPattern[0] ? token_found(true, event) : token_found(false, event) 
    }


    function token_found(found: any, event: any){
        var found_arr = BoxesFound
        var grid_arr = BoxGrid
        var token_arr = TokenPlace
        var pattern_arr = TokenPattern
        var round_arr = RoundAttempts

        if(found){
            console.log("\n\nToken found.")
            pattern_arr.splice(0, 1)
            grid_arr[event.target.id] = box_style[1]
            setTokenPattern(pattern_arr)
            setBoxGrid(grid_arr)
            setFoundCount(FoundCount + 1)

            if(FoundCount + 1 == RoundCount){
                //set next round
                round_arr.push(CurrentAttempts)
                setRoundAttempts(round_arr)
                setRoundCount(RoundCount + 1)
            }
        }else{
            console.log("\n\nToken not found.")

            //show INCORRECT popup
            // boxes_arr[event.target.id] = box_style[2]     
            reset_round()     
        }
        setBoxGrid(boxes_arr)
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
                <div className="h-[48rem] mt-24">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowData ?
                    <div className="h-full grid grid-flow-rows auto-rows-max mt-24 gap-y-12">
                        <div className="grid grid-cols-5">
                            <div id="0" style={BoxGrid[0]} onClick={(event) => check_token(event)}/>
                            <div id="1" style={BoxGrid[1]} onClick={(event) => check_token(event)}/>
                            <div id="2" style={BoxGrid[2]} onClick={(event) => check_token(event)}/>
                            <div id="3" style={BoxGrid[3]} onClick={(event) => check_token(event)}/>
                            <div id="4" style={BoxGrid[4]} onClick={(event) => check_token(event)}/>
                        </div>
                        <div className="grid grid-cols-5">
                            <div id="5" style={BoxGrid[5]} onClick={(event) => check_token(event)}/>
                            <div id="6" style={BoxGrid[6]} onClick={(event) => check_token(event)}/>
                            <div id="7" style={BoxGrid[7]} onClick={(event) => check_token(event)}/>
                            <div id="8" style={BoxGrid[8]} onClick={(event) => check_token(event)}/>
                            <div id="9" style={BoxGrid[9]} onClick={(event) => check_token(event)}/>
                        </div>
                        <div className="grid grid-cols-5">
                            <div id="10" style={BoxGrid[10]} onClick={(event) => check_token(event)}/>
                            <div id="11" style={BoxGrid[11]} onClick={(event) => check_token(event)}/>
                            <div id="12" style={BoxGrid[12]} onClick={(event) => check_token(event)}/>
                            <div id="13" style={BoxGrid[13]} onClick={(event) => check_token(event)}/>
                            <div id="14" style={BoxGrid[14]} onClick={(event) => check_token(event)}/>
                        </div>
                        <div className="grid grid-cols-5">
                            <div id="15" style={BoxGrid[15]} onClick={(event) => check_token(event)}/>
                            <div id="16" style={BoxGrid[16]} onClick={(event) => check_token(event)}/>
                            <div id="17" style={BoxGrid[17]} onClick={(event) => check_token(event)}/>
                            <div id="18" style={BoxGrid[18]} onClick={(event) => check_token(event)}/>
                            <div id="19" style={BoxGrid[19]} onClick={(event) => check_token(event)}/>
                        </div>
                        <div className="grid grid-cols-5">
                            <div id="20" style={BoxGrid[20]} onClick={(event) => check_token(event)}/>
                            <div id="21" style={BoxGrid[21]} onClick={(event) => check_token(event)}/>
                            <div id="22" style={BoxGrid[22]} onClick={(event) => check_token(event)}/>
                            <div id="23" style={BoxGrid[23]} onClick={(event) => check_token(event)}/>
                            <div id="24" style={BoxGrid[24]} onClick={(event) => check_token(event)}/>
                        </div>
                    </div>
            : null
        :
            <div className="grid grid-rows-3 mt-24 place-items-center"> 
                <span className="mt-4 text-xl">
              
                </span> 
                <span className="mt-16">
                    
                </span>
                <span className="mt-12">
                   
                </span>
            </div>
        }
    </div>
  )

}

  