'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';
import {descriptions} from '../helpers/test_descriptions'


export default function MemoryScanning (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [AnswerCount, setAnswerCount] = React.useState(0)
    const [ShowPrompt, setShowPrompt] = React.useState(false)
    const [ShowCompare, setShowCompare] = React.useState(false)
    const [CompareMessage, setCompareMessage] = React.useState(false)
    const [CompareNumbers, setCompareNumbers] = React.useState(false)
    const [ShowButtons, setShowButtons] = React.useState(false)
    const [Answered, setAnswered] = React.useState(true) 
    const answers = ["Answer was: Yes, number is original digit.", "Answer was: No, number isn't original digit.", "Missed!", "You answered: Yes", "You answered: No"]
    const [AnsweredString, setAnsweredString] = React.useState("")  
    const [CompareDigits, setCompareDigits] = React.useState(-2)
    const [DigitList, setDigitList] = React.useState([])
    const [StaticList, setStaticList] = React.useState([])
    const [CurrentDigit, setCurrentDigit] = React.useState<any>("4")
    const [CompareList, setCompareList] = React.useState([])
    const [CompareString, setCompareString] = React.useState("")
    const [Answer, setAnswer] = React.useState("")
    const [Digits, setDigits] = React.useState(-1)
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Answers, setAnswers] = React.useState([])
    const [Inserted, setInserted] = React.useState(false)
    
    const table = "test_results"

    const answered_style = ["text-red-400", "text-green-400"]

    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])

    //proficient overall score
    const proficiency = 12

    const interval = "sections"

    //change to 4 digits, 5 sections, 20 total answers
    //section interval, every 3 digits, 6 sections total
    const time = 6

    const total_digits = 18

    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(0)
    const [TimeArray, setTimeArray]: any = React.useState([])

    const time_measure = 1.5

    const test_name = "memory_scanning"

    useEffect(() => {

        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        !Inserted && AttentionData && ReactionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])



    useEffect(() => {
        var count
        while(ShowButtons && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime + response_time)
            }, response_time )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowButtons, ResponseTime])


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

    // Pushes the most recent reaction time to the TimeArray state variable and sets the response time variable back to 0. 
    // @param: N/A
    // @return: N/A
    function reset_time(missed=false){
        var arr = TimeArray
        missed ? arr.push(3) : arr.push(ResponseTime*.001) 
        console.log("time")
        console.log(arr)
        setTimeArray(arr)
        setResponseTime(0)
    }


    useEffect(() => {
        var temp_arr: any = DigitList
        var compare_arr: any = CompareList

        while(Digits >= 0){

            const timeoutId = setTimeout(() => {

                if(Digits % 2 != 0){
                    setCurrentDigit(DigitList[DigitList.length-1]) 
                    temp_arr.pop(0)
                    setDigitList(temp_arr)
                }else{
                    setCurrentDigit("")
                }

                setDigits(Digits - 1)

                if(Digits < 1){
                    setCurrentDigit(null)
                    setCompareString("")
                    setShowPrompt(false)
                    setShowCompare(true)
                    setCompareMessage(true)
                    setCompareDigits(4)
                }

            }, 2500 )

            return () => clearTimeout(timeoutId)
        }

        while(CompareDigits >= -1 && (CompareMessage || CompareNumbers)){

            const timeoutId = setTimeout(() => {

                if(CompareMessage){
                    if(CompareDigits == 4){
                        setCompareString("Compare the digits to the next 18 numbers.")
                    }
                    if(CompareDigits == 3){
                        setCompareString("")
                    }
                    if(CompareDigits == 2){
                        create_string()
                    }
                    if(CompareDigits == -1){
                        setCompareString("")

                        setCompareNumbers(true)
                        setCompareMessage(false)
                        setCompareDigits(36)
                    }
                }


                if(CompareNumbers){
                    var temp_arr: any = Answers
                    compare_arr = CompareList

                    if(CompareDigits % 2 != 0){
                        setAnswered(false)
                        setAnsweredString(answers[2])
                        setAnsweredStyle(answered_style[0])
                        setShowButtons(true)
                        setCompareString(CompareList[CompareList.length-1])
                        StaticList.includes(CompareList[CompareList.length-1]) ? setAnswer(answers[0]) : setAnswer(answers[1])             
                        compare_arr.pop(0)
                        setCompareList(compare_arr)
                    }else{
                        setShowButtons(false)
                        setCompareString("")

                        if(!Answered){
                            setShowCirclesRed(true)
                            temp_arr.push(0)
                            setAnswers(temp_arr)
                            TimeArray.length < total_digits ? reset_time(true) : null
                        }
                    }

                    if(CompareDigits == -1){
                        setShowCompare(false)
                        setCompareNumbers(false)
                        setEndTest(true)
                        setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
                        setReactionData(analysis["speed"](TimeArray, time_measure))
                    }
                }
            
                CompareDigits == -1 ? setCompareDigits(36) :  setCompareDigits(CompareDigits - 1)

            }, 2500 )

            return () => clearTimeout(timeoutId)

        }

    }, [Digits, DigitList, CompareDigits, Answered])


    // Creates the list of initial digits to memorize
    // @param: N/A
    // @return: N/A
    function create_list(){
        var temp_list: any = []
        var static_list: any = []

        var i = 0
        while(i < 3){
            var num: any = Math.floor(Math.random() * ((1000-1)+1)) + 1
            temp_list.push(num)
            static_list.push(num)
            i++
        }

        setCurrentDigit(temp_list[temp_list.length-1])
        setStaticList(static_list)
        temp_list.pop(0)
        setDigitList(temp_list)
        compare_list(static_list)
    }

    // Creates the list of digits to compare against the initial set
    // @param: N/A
    // @return: N/A
    function compare_list(list: any){
        var temp_list: any  = []
        temp_list = temp_list.concat(list)
        var i = temp_list.length

        while(i < total_digits){
            var num: any = Math.floor(Math.random() * ((1000-1)+1)) 
            if(!temp_list.includes(num)){
                temp_list.push(num)
                i++
            }
        }
        temp_list = shuffle_list(temp_list, temp_list.length)

        setCompareList(temp_list)
    }

    // Randomizes the compare list
    // @param 'list': The compare list
    // @param 'size': The size of the desired list
    // @return: N/A
    function shuffle_list(list: any, size: any){
        var new_list: any = []

        while(new_list.length < size){
            var num = Math.floor(Math.random() * ((list.length-1)+1)) + 1
            new_list.push(list[num-1])
            list.splice(num-1, 1)
        }

        setShowPrompt(true)
        return new_list
    }

    // Creates the string to display of numbers to compare against the originals
    // @param: N/A
    // @return: N/A
    function create_string(){
        var str: any = ""

        for(var i=0; i<CompareList.length; i++){
            str = str + " " + CompareList[i]
        }

        setCompareString(str)
    }


    // If an answer is correct, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function yes_handler(){
        setAnsweredString(answers[3])
        setAnswered(true)
        answer_handler(true)
        setShowButtons(false)
    }


    // If an answer is wrong, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function no_handler(){
        setAnsweredString(answers[4])
        setAnswered(true)
        answer_handler(false)
        setShowButtons(false)
    }


    // Once a prompt is answered, takes the answer and determines if it is correct or not. Logs the response time.
    // @param 'answer': N/A
    // @return: N/A
    function answer_handler(answer: any){
        setCompareString("")

        var temp_arr: any = StaticList
        var temp_arr2: any = Answers
        if (answer && temp_arr.includes(CompareString) || (!answer && !temp_arr.includes(CompareString))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
            setShowCirclesGreen(true)
            temp_arr2.push(1) 
        }else{
            setShowCirclesRed(true)
            temp_arr2.push(0)
        } 

        setAnswers(temp_arr2)
        setResponseTime(0)
        TimeArray.length < total_digits ? reset_time() : null
    }


    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        create_list()
        setDigits(4)
        setTestStart(true)
        setShowPrompt(true)
        setRestart(true)
    }


    // Calculates the user's test score based on correct answers and list count
    // @param: N/A
    // @return 'integer': The correct percentage
    function calculate_ratio(){
        return Math.round((AnswerCount/total_digits)*100)
    }


    // function check_answer(compare: any){
    //     console.log("\n\ncompare string")
    //     console.log(compare)
    //     var temp_arr: any = StaticList
    //     console.log(temp_arr)
    //     compare == "" ? setAnswer("") : temp_arr.includes(compare) ? setAnswer(answers[0]) : setAnswer(answers[1])
    //     compare == "" ? setAnsweredString("") : null
    //     setCompareString("")
    // }


    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
        // setEndTest(false)
        // setTestStart(false)
        // setAnswerCount(0)
        // setShowPrompt(false)
        // setShowCompare(false)
        // setCompareMessage(false)
        // setCompareNumbers(false)
        // setShowButtons(false)
        // setAnswered(true) 
        // setAnsweredString("")  
        // setCompareDigits(-1)
        // setDigitList([])
        // setStaticList([])
        // setCurrentDigit("4")
        // setCompareList([])
        // setCompareString("")
        // setAnswer("")
        // setDigits(-1)
        // setRestart(true)
    }


  return(
    <div>
        <div className="row">
            MEMORY SCANNING 
        </div>
        <div className="row mt-12 text-sky-400">
            {descriptions["memory_scanning"]}
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="mt-[150px]">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowPrompt ?
                <div className="mt-[150px] grid grid-rows-2 place-items-center text-2xl bold">
                <span>
                    {CurrentDigit}
                </span>
                </div> 
                : ShowCompare ?
                    <div className="mt-[50px] h-72 grid grid-rows-2 text-xl">
                        {!ShowButtons && CompareString == "" ?
                            <div className="mt-12 grid grid-rows-2 place-items-center gap-24">
                                <span className={AnsweredStyle}>
                                    {AnsweredString}
                                </span>
                                <span>
                                    {Answer}
                                </span>
                            </div>  
                        : 
                            <span className="grid place-items-center text-2xl bold">
                                {CompareString}
                            </span> 
                        }
                        {ShowButtons ?
                            <div className="grid grid-rows-2">
                                <div className="grid place-items-center text-2xl bold">
                                    <span>
                                        {CurrentDigit}
                                    </span>
                                </div> 
                                <div className="grid grid-cols-2 place-items-center gap-4">
                                    <Button className="w-36 bg-green-400 rounded h-12 text-white" onClick={yes_handler}>
                                        Yes
                                    </Button>
                                    <Button className="w-36 bg-red-400 rounded h-12 text-white" onClick={no_handler}>
                                        No
                                    </Button>
                                </div>
                            </div>
                        :  null}
                    </div>    
            : null
        :
            <div className="grid grid-auto-rows mt-[150px] place-items-center"> 
                <span className="mt-12">
                    The Test is Over.
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of {total_digits}. ({calculate_ratio()}%)
                </span>
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData} />
                </div>
                <Button className="mt-24 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                     Reset
                </Button>
            </div>
        }

        {ShowCompare || EndTest ?
            <div className="grid place-items-center">
                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={total_digits} CurrentPosition={Math.ceil(CompareDigits/2)} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
            </div>
        : null}

    </div>
  )

}

  