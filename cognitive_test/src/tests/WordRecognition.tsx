'use client'
import React, {useEffect} from 'react'
import {Button} from "@nextui-org/react"
import {words} from "../helpers/words"
import { analysis } from '@/helpers/Analysis'
import ProgressBar from '@/helpers/ProgressBar'
import ShowAnalysis from '@/helpers/ShowAnalysis'

export default function WordRecognition (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [AnswerCount, setAnswerCount] = React.useState(0)
    const [ShowPrompt, setShowPrompt] = React.useState(false)
    const [ShowCompare, setShowCompare] = React.useState(false)
    const [CompareMessage, setCompareMessage] = React.useState(false)
    const [ShowButtons, setShowButtons] = React.useState(false)
    const [Answered, setAnswered] = React.useState(true) 
    const [AnsweredString, setAnsweredString] = React.useState("")  
    const [CompareDigits, setCompareDigits] = React.useState(-1)
    const [ShownArray, setShownArray] = React.useState<any>([])
    const [StaticArray, setStaticArray] = React.useState([""])
    const [CurrentWord, setCurrentWord] = React.useState("")
    const [CompareArray, setCompareArray] = React.useState<any>([])
    const [Answer, setAnswer] = React.useState("")
    const [Digits, setDigits] = React.useState(-1)
    const [ShowMessage, setShowMessage] = React.useState(false)
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Answers, setAnswers] = React.useState<any>([])

    const answered_style = ["text-red-400", "text-green-400"]
    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])
    
    const list_length = 10
    const [CurrentMessage, setCurrentMessage] = React.useState("Try to memorize the next set of " + list_length + " words.")
    const start_digits = 24 
    const base_iteration = 21

    const proficiency = Math.round(list_length * .7)
    const interval = "sections"
    const time = 3
    const test_length = 5
    const time_measure = 1.5
    

    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(response_time)
    const [TimeArray, setTimeArray]: any = React.useState([])


    useEffect(() => {
        var count
        while(CompareDigits >= 0 && CurrentWord != "" && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime + response_time)
            }, response_time )

            return () => clearTimeout(timeoutId)
        }
    }, [CompareDigits, CurrentWord, ResponseTime])


    useEffect(() => {
        AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        AttentionData  ? console.log(analysis["decisiveness"](AttentionData["original_answers"])) : null
    }, [AttentionData])



    function reset_time(){
        var arr = TimeArray
        arr.push(ResponseTime*.001) 
        console.log("time")
        console.log(arr)
        setTimeArray(arr)
        setResponseTime(0)
    }


    useEffect(() => {
        var temp_arr: any = ShownArray

        while(Digits >= 0){
            const timeoutId = setTimeout(() => {

                Digits > base_iteration ? setShowMessage(true) : setShowMessage(false)
                Digits % 2 != 0 && Digits <= base_iteration + 1 && Digits ?current_word(1) : setCurrentWord("")
                setDigits(Digits - 1)
                
                if(Digits < 1){
                    setShowCompare(true)
                    setCompareMessage(true)
                    setShowMessage(true)
                    setCompareDigits(base_iteration + 1)
                    setCurrentMessage("What words from the following set were in the first set?")
                }

            }, 1500)

            return () => clearTimeout(timeoutId)
        }

        while(CompareDigits >= 0){
            const timeoutId = setTimeout(() => {
                if(CompareMessage){
                    CompareDigits == base_iteration ? setShowPrompt(false) : null 
                    CompareDigits == base_iteration ? setShowMessage(false) : null

                    if(CompareDigits % 2 != 0 && CompareDigits <= base_iteration + 1 && CompareDigits > 1){
                        setAnsweredString("Missed!")
                        setAnsweredStyle(answered_style[0])
                        setShowButtons(true)
                        temp_arr = StaticArray
                        temp_arr.includes(current_word(0)) ? setAnswer("Answer was: Yes, the word is in original set.") : setAnswer("Answer was: No, the word isn't in original set.")
                    }else{
                        check_answer(CurrentWord)
                        setShowButtons(false)
                        setCurrentWord("")
                        setAnswered(false)
                    }

                    CompareDigits == 1 ? setAnsweredString("") : null
                    if(CompareDigits < 1){
                        setEndTest(true)
                        setShowCompare(false)
                        setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
                        setReactionData(analysis["speed"](TimeArray, time_measure))
                    }  
                }

                setCompareDigits(CompareDigits - 1)

            }, 3000)

            return () => clearTimeout(timeoutId)
        }

    }, [Digits, CompareDigits, Answered])


    function build_array(){
        var temp_arr = []
        var shown_arr = []
        var compare_arr = []
        var place = null

        while(temp_arr.length < list_length){
            place = Math.floor(Math.random()*500)
            temp_arr.push(words[place])
            shown_arr.push(words[place])
            compare_arr.push(words[place])
            words.splice(place, 1)
        }

        setStaticArray(temp_arr)
        setShownArray(shown_arr)
        setCompareArray(build_compare(compare_arr))
    }


    function build_compare(temp_arr: any){
        var in_set = Math.floor(Math.random() *  5 + 2)
        var place: any = null
        var compare_arr = []
        var final_arr = []

        for(var i=0; i < in_set; i++){
            place = Math.floor(Math.random() * (temp_arr.length - 1))
            compare_arr.push(temp_arr[place])
            temp_arr.splice(place, 1)
        }

        while(compare_arr.length < list_length){
            place = Math.floor(Math.random() * (words.length - 1))
            !compare_arr.includes(words[place]) ? compare_arr.push(words[place]) : null
        }

        while(final_arr.length < list_length){
            place = Math.floor(Math.random() * (compare_arr.length - 1))
            final_arr.push(compare_arr[place])
            compare_arr.splice(place, 1)
        }

        return final_arr
    }


    //event parameter
    //0 for initial display of pictures
    //1 for compare display
    function current_word(event: any){
        var temp_arr: any = []
        var word: any = ""
        event ? temp_arr = ShownArray : temp_arr = CompareArray

        word = temp_arr[0]
        setCurrentWord(word)
        temp_arr.splice(0, 1)

        event ? setShownArray(temp_arr) : setCompareArray(temp_arr)

        return word
    }


    function yes_handler(){
        setAnsweredString("You answered: Yes")
        setAnswered(true)
        answer_handler(true)
        setShowButtons(false)
    }


    function no_handler(){
        setAnsweredString("You answered: No")
        setAnswered(true)
        answer_handler(false)
        setShowButtons(false)
    }


    function answer_handler(answer: any){
        setCurrentWord("")
        var temp_arr: any = StaticArray
        var answers: any = Answers

        if (answer && temp_arr.includes(CurrentWord) || (!answer && !temp_arr.includes(CurrentWord))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
            setShowCirclesGreen(true)
            answers.push(1)
        }else{
            setShowCirclesRed(true)
            answers.push(0)
        } 
        setAnswers(answers)
        TimeArray.length < list_length ? reset_time() : null
    }


    function start_handler(){
        console.log(analysis["attention"](interval, Answers, time, proficiency))
        console.log(analysis["speed"](TimeArray, time_measure))
        build_array()
        setDigits(start_digits)
        setShowMessage(true)
        setTestStart(true)
        setShowPrompt(true)
    }


    function calculate_ratio(){
        return Math.round((AnswerCount/list_length)*100)
    }


    function check_answer(compare: any){
        var temp_arr: any = StaticArray
        var time_arr: any = TimeArray

        temp_arr.includes(compare) ? setAnswer("Answer was: Yes, the word is in original set.") : setAnswer("Answer was: No, the word isn't in original set.")         

        if(!Answered){
            setShowCirclesRed(true)
            TimeArray.length < list_length ? time_arr.push(3) : null 
            setTimeArray(time_arr)
            TimeArray.length < list_length ? reset_time() : null
        } 

        compare == "" ? setAnswer("") : null
        compare == "" ? setAnsweredString("") : null
    }


    function reset_all(){
        props.setReset(true)
        // setEndTest(false)
        // setTestStart(false)
        // setAnswerCount(0)
        // setShowPrompt(false)
        // setShowCompare(false)
        // setCompareMessage(false)
        // setShowButtons(false)
        // setAnswered(true) 
        // setAnsweredString("")  
        // setCompareDigits(-1)
        // setShownArray([])
        // setStaticArray([""])
        // setCurrentWord("")
        // setCompareArray([])
        // setAnswer("")
        // setDigits(-1)
        // setCurrentMessage("Try to memorize the next set of 10 words.")
        // setShowMessage(false)
        // setAnsweredStyle(answered_style[0])
        // setRestart(true)
    }


    function get_position(){
        return CompareArray.length != 10 ? CompareArray.length : list_length + 1
    }



  return(
    <div className="h-[96em]">
        <div className="row">
            WORD RECOGNITION
        </div>
        <div className="row mt-12 text-sky-400">
            {list_length} words are displayed, one every 1.5 seconds. The player is told to memorize each word. Afterward, {list_length} more words are shown. This time the word set only contains some of the items from the original display. The player is asked if each word from the second set was in the original set.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="h-[48rem] mt-24">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowPrompt ?
                    <div className="mt-[150px] grid grid-rows-2 gap-4 place-items-center">
                        {ShowMessage ? 
                            <span>
                                {CurrentMessage} 
                            </span>
                        :   <span>
                                {CurrentWord}
                            </span>    
                        }
                    </div>    
                : ShowCompare ?
                    <div className="mt-[150px] grid grid-auto-rows place-items-center">
                        {CompareDigits >= 0 && CurrentWord != "" ? 
                            <div className="grid grid-auto-rows place-items-center">                   
                                <div>
                                    {CurrentWord}
                                </div>
                                <div className="mt-12 grid-cols-2 gap-x-[100px] gap-y-12 place-items-center">
                                    <Button className="bg-green-400 rounded px-10 h-12 text-white" onClick={yes_handler}>
                                        Yes
                                    </Button>
                                    <Button className="bg-red-400 rounded px-10 h-12 ml-12 text-white" onClick={no_handler}>
                                        No
                                    </Button>
                                </div> 
                            </div>
                        :
                            <div>
                                <div className="grid-cols-2 gap-x-[100px] place-items-center">
                                    <span className={AnsweredStyle}>
                                        {AnsweredString}
                                    </span>
                                    <span className="ml-48">
                                        {Answer}
                                    </span>
                                </div> 
                                <div className="h-24">
                                </div> 
                            </div>
                        }

                        {!EndTest && CompareDigits > 1 ?
                            <div>
                                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={list_length} CurrentPosition={get_position()} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
                            </div>
                        : null}

                    </div>  

            : null
        :
            <div className="grid grid-auto-rows mt-[150px] place-items-center"> 
                <span className="mt-12">
                    The Test is Over.
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of {list_length}. ({calculate_ratio()}%)
                </span>
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData} />
                </div>
                <Button className="mt-24 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                     Reset
                </Button>
            </div>
        }
    </div>
  )

}

  