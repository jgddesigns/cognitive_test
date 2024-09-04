'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


export default function DigitVigilance(props: any) {
    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [Numbers, setNumbers] = React.useState<any[]>([])
    const [SearchNumbers, setSearchNumbers] = React.useState<any[]>([]) 
    const [Found, setFound] = React.useState(0)
    const [CorrectMarks, setCorrectMarks] = React.useState(0)
    const [IncorrectMarks, setIncorrectMarks] = React.useState(0)
    const [PossibleFound, setPossibleFound] = React.useState(0)
    const [TotalTime, setTotalTime] = React.useState(0)
    const [EndDelay, setEndDelay] = React.useState(-1)
    const [ClockDisplay, setClockDisplay] = React.useState("0:00")
    const [NumberMap, setNumberMap] = React.useState<any[]>([])  
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const number_style = ["ml-[10px] cursor-pointer", "ml-[10px] text-green-400", "ml-[10px] text-red-400"]



    useEffect(() => {

        Numbers.length > 0 && NumberMap.length < 1 ? create_number_map() : null

        while(TestStart && TotalTime <= 180){
            const timeoutId = setTimeout(() => {
                setTotalTime(TotalTime + 1)

                if(TotalTime < 180){
                    set_clock(TotalTime + 1)
                }else{
                    setClockDisplay("Time's Up!")
                    setEndDelay(5)
                }
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }

        while(EndDelay >= 0){
            const timeoutId = setTimeout(() => {
                setEndDelay(EndDelay - 1)
                console.log(EndDelay)
                console.log(EndTest)
                EndDelay == 0 ? setEndTest(true) : null

            }, 1000 )


            return () => clearTimeout(timeoutId)
        }

    }, [Numbers, TotalTime, EndDelay])



    function set_clock(time: any){
        var minutes: any = Math.floor(time/60)
        var seconds: any = Math.floor(time % 60)
        seconds < 10 ? seconds = "0" + seconds : null

        var display: any = minutes + ":" + seconds

        setClockDisplay(display)
    }



    function create_number_map(){

        const number_map = Numbers.map((name:any, index:any) => {
            return {
              row: Numbers[index],
              key: uuidv4()
            }
        })

        setNumberMap(number_map)
    }



    function check_number(value: any){
        if(value.target.className == number_style[0]){
            if(SearchNumbers.includes(value.target.id)){
                value.target.className = number_style[1]
                setCorrectMarks(CorrectMarks + 1)
                setFound(Found + 1)
            }else{
                value.target.className = number_style[2]
                setIncorrectMarks(IncorrectMarks + 1)
                setFound(Found - 1)
            }
        }
    }



    function create_list(){
        var number_array = []
        var row_array: any = []
        var search_numbers = get_search_numbers()

        while(number_array.length < 25){
            while(row_array.length < 50){
                row_array.push(create_row(search_numbers))
            }

            const row_map = row_array.map((name: any, index: any) => {
                return {
                  number: row_array[index],
                  key: uuidv4()
                }
            })

            number_array.push(row_map)
            row_array = []
        }

        get_possible_found(number_array, search_numbers[0])

        setNumbers(number_array)
    }


    function get_possible_found(numbers: any, find: any){
        var count = 0
        for(var i=0; i<numbers.length; i++){
            for(var j=0; j<numbers[i].length; j++){
                numbers[i][j]["number"] == find[0] || numbers[i][j]["number"] == find[1] ? count++ : null
            }
        }
        setPossibleFound(count)
    }




    function create_row(numbers: any){
        var chance = Math.floor(Math.random() * 20)
        var random = Math.floor(Math.random() * 7)

        if(chance == 0 || chance == 1){
            setPossibleFound(PossibleFound + 1)
            return numbers[0][chance]
        }

        return numbers[1][random]
    }



    function get_search_numbers(){
        var search = []
        var place = null

        while(search.length < 2){
            place = Math.floor(Math.random() * 9)

            if(numbers[place]){
                search.push(numbers[place])
                numbers.splice(place, 1)
            }
        
        }

        search[1] < search[0] ? setSearchNumbers([search[1], search[0]]) : setSearchNumbers(search)

        return [search, numbers]
    }



    function start_handler(){
        setTestStart(true)
        setShowData(true)
        create_list()
    }
    function resetAll(){
        setEndTest(false);
        setTestStart(false);
        setShowData(false);
        setNumbers([]);
        setSearchNumbers([]);
        setFound(0);
        setCorrectMarks(0);
        setIncorrectMarks(0);
        setPossibleFound(0);
        setTotalTime(0);
        setEndDelay(-1);
        setClockDisplay("0:00");
        setNumberMap([]);

}



  return(
    <div className="h-full">
        <div className="row">
            TEST #7: DIGIT VIGILANCE
        </div>
        <div className="row mt-12 text-sky-400">
            Players are asked to find two specified numbers, which appear randomly within fifty rows of fifty single digits. The goal is to find as many of the numbers as possible.
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
                        <div className="grid grid-cols-4">
                            <span className="text-center">
                                Search for Numbers: {SearchNumbers[0]}, {SearchNumbers[1]}
                            </span>
                            <span></span>
                            <span></span>
                            <span className="text-center">
                                Timer: {ClockDisplay}
                            </span>
                        </div>
                        <div className="mt-12 italic grid place-items-center">
                            <span className="">
                                Find a number by clicking on it
                            </span>
                        </div>
                        <div>
                            {NumberMap.map(result => {         
                            return (
                                <div className="max-w-[4rem]" key={result.key}>{result.row.map((result2: {
                                    key: null | undefined; number: any | string | number | 
                                      null | undefined; }) => {
                                    return(
                                        <span className="ml-[10px] cursor-pointer" onClick={(e) => check_number(e)} id={result2.number} key={result2.key}>
                                            {result2.number}
                                        </span>
                                    )
                                })}</div>
                            )
                            })}
                        </div>
                    </div>
            : null
        :
            <div className="grid grid-rows-3 mt-24 place-items-center"> 
                <span className="mt-4 text-4xl">
                    The Test is Over
                </span> 
                <span className="mt-16">
                    {Found} numbers were found in 3 minutes.
                </span>
                {CorrectMarks > 0 && IncorrectMarks > 0 ?
                    <div className="mt-12">
                        <span className="text-green-400">
                            {CorrectMarks} Correct Marks
                        </span>  
                        <span className="mx-4">
                            -
                        </span>
                        <span className="text-red-400">
                            {IncorrectMarks} Incorrect Marks
                        </span> = {Found} Numbers Found  
                    </div>
                : 
                    <div className="mt-12">
                        <span>You didn't try to complete the test!</span>  
                    </div>
                }
                <span className="mt-12">
                    {PossibleFound} possible numbers out of {Numbers.length * Numbers[0].length} total digits.
                </span>
                <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={resetAll}>
                     Reset
                </Button>
            </div>
        }
    </div>
  )

}

  