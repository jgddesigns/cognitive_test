'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import { analysis } from '@/helpers/Analysis';
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';


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
    const [CurrentPosition, setCurrentPosition] = React.useState(0)
    const [TotalTime, setTotalTime] = React.useState(0)
    const [EndDelay, setEndDelay] = React.useState(-1)
    const [ClockDisplay, setClockDisplay] = React.useState("0:00")
    const [NumberMap, setNumberMap] = React.useState<any[]>([])  
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const number_style = ["ml-[10px] cursor-pointer", "ml-[10px] text-green-400", "ml-[10px] text-red-400"]
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [TotalFound, setTotalFound] = React.useState<any[]>() 
    const [FoundArray, setFoundArray] = React.useState<any[]>([]) 
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Inserted, setInserted] = React.useState(false)
    
    const test_table = "test_results"
    
    //proficient overall score
    

    const interval = "time"

    //section interval, every 36 seconds, 5 sections total
    const time = 5

    const time_value = 180

    const per_minute = 25

    const proficiency = Math.round(time_value/60) * per_minute

    const number_value = 25

    const high_level = 100

    const row_value = number_value * 2

    const test_name = "digit_vigilance"



    useEffect(() => {

        Numbers.length > 0 && NumberMap.length < 1 ? create_number_map() : null

        while(TestStart && TotalTime <= time_value){
            const timeoutId = setTimeout(() => {
                var temp_arr: any = []
                setTotalTime(TotalTime + 1)

                if(TotalTime % (time_value / time) == 0 && TotalTime > 0){
                    console.log(TotalFound)
                    TotalFound && TotalFound.length > 0 ? temp_arr = TotalFound : null
                    temp_arr.push(FoundArray)
                    setTotalFound(temp_arr)
                    setFoundArray([])
                }

                if(TotalTime % 20 == 0){
                     setShowCirclesGreen(true) 
                     get_position()
                }

                if(TotalTime < time_value){
                    set_clock(TotalTime + 1)
                }else{
                    setClockDisplay("Time's Up!")
                    setEndDelay(3)
                }
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }

        while(EndDelay >= 0){
            const timeoutId = setTimeout(() => {
                setEndDelay(EndDelay - 1)
                console.log(EndDelay)
                console.log(EndTest)
                if(EndDelay == 0){
                    setEndTest(true)
                    setAttentionData(analysis["attention"](interval, Found, time_value, proficiency, true, high_level))
                    setReactionData(analysis["speed"](Found, time_value, false, per_minute, high_level))
                }

            }, 1000 )


            return () => clearTimeout(timeoutId)
        }

    }, [Numbers, TotalTime, EndDelay])


    useEffect(() => {

        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"], time_value, per_minute, high_level)) : null
        !Inserted && AttentionData && ReactionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])


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

    // Sets the map of numbers to display based on the values created in the 'create_list' function
    // @param: N/A
    // @return: N/A
    function create_number_map(){
        const number_map = Numbers.map((name:any, index:any) => {
            return {
              row: Numbers[index],
              key: uuidv4()
            }
        })
        setNumberMap(number_map)
    }

    // Checks if a clicked number is one of the numbers to search for
    // @param 'value': The number to check
    // @return: N/A
    function check_number(value: any){
        var temp_arr: any = FoundArray
        if(EndDelay < 0){
            if(value.target.className == number_style[0]){
                if(SearchNumbers.includes(value.target.id)){
                    value.target.className = number_style[1]
                    setCorrectMarks(CorrectMarks + 1)
                    setFound(Found + 1)
                    temp_arr.push(1)
                }else{
                    value.target.className = number_style[2]
                    setIncorrectMarks(IncorrectMarks + 1)
                    setFound(Found - 1)
                    temp_arr.push(0)
                }
            }
        }
        setFoundArray(temp_arr)
    }

    // Creates the list of random numbers to display
    // @param: N/A
    // @return: N/A
    function create_list(){
        var number_array = []
        var row_array: any = []
        var search_numbers = get_search_numbers()

        while(number_array.length < number_value){
            while(row_array.length < row_value){
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

    // Retrieves the total amount of possible found numbers
    // @param: N/A
    // @return: N/A
    function get_possible_found(numbers: any, find: any){
        var count = 0
        for(var i=0; i<numbers.length; i++){
            for(var j=0; j<numbers[i].length; j++){
                numbers[i][j]["number"] == find[0] || numbers[i][j]["number"] == find[1] ? count++ : null
            }
        }
        setPossibleFound(count)
    }

    // Creates a row of random numbers to display. This is called for each row in the total display (created in the create_list function).
    // @param: N/A
    // @return : N/A
    function create_row(numbers: any){
        var chance = Math.floor(Math.random() * 20)
        var random = Math.floor(Math.random() * 7)

        if(chance == 0 || chance == 1){
            setPossibleFound(PossibleFound + 1)
            return numbers[0][chance]
        }

        return numbers[1][random]
    }

    // Determines what numbers will be searchable
    // @param: N/A
    // @return 'array': [The numbers to search for, the set of possible numbers]
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



    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        console.log(analysis["attention"](interval, 92, time_value, proficiency, true, high_level))
        setTestStart(true)
        setShowData(true)
        create_list()
        setRestart(true)
    }

    
    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
        // setEndTest(false);
        // setTestStart(false);
        // setShowData(false);
        // setNumbers([]);
        // setSearchNumbers([]);
        // setFound(0);
        // setCorrectMarks(0);
        // setIncorrectMarks(0);
        // setPossibleFound(0);
        // setTotalTime(0);
        // setEndDelay(-1);
        // setClockDisplay("0:00");
        // setNumberMap([]);
        // setRestart(true)
    }

    // For the progress bar graphic. Gets the position based on the elapsed time vs total time.
    // @param: N/A
    // @return: N/A
    // For the progress bar display. Determines how much of the test is completed.
    // @param: N/A
    // @return: N/A 
    function get_position(){
        return TotalTime % 20 == 0 ? setCurrentPosition(TotalTime/(time_value/9) + 11) : null
    }


  return(
    <div className="h-full">
        <div className="row">
            DIGIT VIGILANCE
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
                        <div className="grid place-items-center">
                            <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={10} CurrentPosition={CurrentPosition} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
                        </div>
                    </div>
            : null
        :
            <div className="grid grid-auto-rows mt-24 place-items-center"> 
                <span className="mt-4 text-4xl">
                    The Test is Over
                </span> 
                <span className="mt-16">
                    {Found} numbers were found in 3 minutes.
                </span>
                {CorrectMarks > 0 || IncorrectMarks > 0 ?
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

  