'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';
import "../helpers/shapes.css"
//import { show_circles } from "../helpers/ProgressBar"
import ProgressBar from '../helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';

export default function PictureRecognition (props: any) {

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
    const [ShownArray, setShownArray] = React.useState([])
    const [StaticArray, setStaticArray] = React.useState([""])
    const [CurrentPicture, setCurrentPicture] = React.useState("")
    const [CompareArray, setCompareArray] = React.useState([])
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
    const [Inserted, setInserted] = React.useState(false)
    
    const table = "test_results"

    const answered_style = ["text-red-400", "text-green-400"]

    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])

    const pictures_value = 20
    const [CurrentMessage, setCurrentMessage] = React.useState("Try to memorize the next set of " + pictures_value + " pictures.")
    const digits_value = pictures_value * 2
    const message_value = digits_value + 1
    const prompt_value = digits_value + 2


    //proficient overall score
    const proficiency = Math.round(pictures_value * .7)

    const interval = "sections"

    const time_measure = 1.5

    //section interval, every 3 digits, 6 sections total
    const time = 5

    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(response_time)
    const [TimeArray, setTimeArray]: any = React.useState([])

    const test_name = "picture_recognition"


    useEffect(() => {

        !DecisionData && AttentionData ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
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



    useEffect(() => {
        ShowButtons ? setResponseTime(response_time) : null
    }, [ShowButtons])


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


    function reset_time(missed=false){
        var arr = TimeArray
        missed ? arr.push(3) : arr.push(ResponseTime*.001) 
        console.log("time")
        console.log(ResponseTime*.001)
        console.log(arr)
        setTimeArray(arr)
        setResponseTime(0)
    }



    useEffect(() => {
        var temp_arr: any = ShownArray

        while(Digits >= 0){

            const timeoutId = setTimeout(() => {

                Digits > message_value ? setShowMessage(true) : setShowMessage(false)

                if(Digits % 2 != 0 && Digits <= digits_value){
                    current_picture(1)
                }else{
                    setCurrentPicture("")
                }

                setDigits(Digits - 1)

                if(Digits < 1){
                    setShowCompare(true)
                    setCompareMessage(true)
                    setShowMessage(true)
                    setCompareDigits(digits_value + 3)
                    setCurrentMessage("What images from the following set were in the first set?")
                }

            }, 1500 )

            return () => clearTimeout(timeoutId)
        }

        while(CompareDigits >= 0){

            const timeoutId = setTimeout(() => {

                if(CompareMessage){
                    CompareDigits == prompt_value ? setShowPrompt(false) : null     
                    CompareDigits == message_value ? setShowMessage(false) : null

                    if(CompareDigits % 2 != 0 && CompareDigits <= digits_value){
                        setAnsweredString("Missed!")
                        setAnsweredStyle(answered_style[0])
                        setShowButtons(true)
                        setAnswered(false)
                        temp_arr = StaticArray
                        temp_arr.includes(current_picture(0)) ? setAnswer("Answer was: Yes, picture is in original set.") : setAnswer("Answer was: No, picture isn't in original set.")
                    }else{
                        check_answer(CurrentPicture)
                        setShowButtons(false)
                        setCurrentPicture("")
                    }

                    if(CompareDigits < 1 && !EndTest){
                        setEndTest(true)
                        setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
                        setReactionData(analysis["speed"](TimeArray, time_measure))
                    } 
                }

                setCompareDigits(CompareDigits - 1)

            }, 3000 )

            return () => clearTimeout(timeoutId)
        }

    }, [Digits, CompareDigits, Answered, EndTest])



    //partially from chat gpt
    function build_array(){
        var temp_arr: any = []
        var shown_arr: any = []
        var copy_arr: any = []
        var static_arr: any = []

        var i: any = 1
        while(i <= 100){
            var str: any = "/img/"
            if(i < (pictures_value/2)){
                str = str + "0" + String(i) + ".jpg"
            }else{
                str = str + String(i) + ".jpg"
            }
            temp_arr.push(str)
            i++
        }

        temp_arr = shuffle_array(temp_arr, temp_arr.length)
        shown_arr = temp_arr.splice(0, pictures_value + 1)
        setCurrentPicture(shown_arr[0])
        shown_arr.splice(0, 1)
        setShownArray(shown_arr)

        for(var i: any = 0; i<shown_arr.length; i++){
            copy_arr.push(shown_arr[i])
            static_arr.push(shown_arr[i])
        }

        setStaticArray(static_arr)
        build_compare(temp_arr, copy_arr)
    }



    function build_compare(temp_arr: any, copy_arr: any){
        var temp_list: any  = []
        var i: any = 0
        var num: any = 0

        copy_arr = shuffle_array(copy_arr, copy_arr.length)

        while(i < (pictures_value/2)){
            num = Math.floor(Math.random() * ((2-1)+1)) 

            if(num == 0){
                temp_list.push(copy_arr[0])
                copy_arr.splice(0,1)
            }

            i++
        }

        while(temp_list.length < pictures_value){
            temp_list.push(temp_arr[0])
            temp_arr.splice(0, 1)
        }

        temp_list = shuffle_array(temp_list, temp_list.length)

        setCompareArray(temp_list)
    }



    function shuffle_array(list: any, size: any){
        var new_list: any = []
        var num: any = 0

        while(new_list.length < size){
            num = Math.floor(Math.random() * ((list.length-1)+1)) + 1
            new_list.push(list[num-1])
            list.splice(num-1, 1)
        }

        setShowPrompt(true)
        return new_list
    }


    //event parameter
    //0 for initial display of pictures
    //1 for compare display
    function current_picture(event: any){
        var temp_arr: any = []
        var img: any = ""
        event ? temp_arr = ShownArray : temp_arr = CompareArray

        img = temp_arr[0]
        setCurrentPicture(img)
        temp_arr.splice(0, 1)

        event ? setShownArray(temp_arr) : setCompareArray(temp_arr)

        return img
    }


    // If an answer is correct, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function yes_handler(){
        setAnsweredString("You answered: Yes")
        setAnswered(true)
        answer_handler(true)
        setShowButtons(false)
    }


    // If an answer is wrong, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function no_handler(){
        setAnsweredString("You answered: No")
        setAnswered(true)
        answer_handler(false)
        setShowButtons(false)
    }


    // Once a prompt is answered, takes the answer and determines if it is correct or not. Logs the response time.
    // @param 'answer': N/A
    // @return: N/A
    function answer_handler(answer: any){
        setCurrentPicture("")
        var temp_arr: any = StaticArray
        var answers = Answers
        if (answer && temp_arr.includes(CurrentPicture) || (!answer && !temp_arr.includes(CurrentPicture))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
            setShowCirclesGreen(true)
            answers.push(1)
        }else{
            setShowCirclesRed(true)
            answers.push(0)
        }
        console.log("answers")
        console.log(answers)
        TimeArray.length <= pictures_value ? setAnswers(answers) : null
        TimeArray.length < pictures_value ? reset_time() : null
    }


    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        build_array()
        setDigits(digits_value + 2)
        setShowMessage(true)
        setTestStart(true)
        setShowPrompt(true)
    }
    
 
    // Calculates the user's test score based on correct answers and list count
    // @param: N/A
    // @return 'integer': The correct percentage
    function calculate_ratio(){
        return Math.round((AnswerCount/pictures_value)*100)
    }


    function check_answer(compare: any){
        var temp_arr: any = StaticArray

        temp_arr.includes(compare) ? setAnswer("Answer was: Yes, picture is in original set.") : setAnswer("Answer was: No, picture isn't in original set.")              
 
        if(compare == ""){
            setAnswer("")
            setAnsweredString("")
        }

        if(AnsweredString == "Missed!" && CompareDigits % 2 == 0 && !Answered){     let answers = Answers 
            answers.push(0)
            setShowCirclesRed(true)
            TimeArray.length < pictures_value ? reset_time(true) : null 
            TimeArray.length <= pictures_value ? setAnswers(answers) : null 
        } 

        AnsweredString == "Missed!" && CompareDigits % 2 == 0 && !Answered ? console.log("missed") : null  
    }


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
        // setShowButtons(false)
        // setAnswered(true) 
        // setAnsweredString("")  
        // setCompareDigits(-1)
        // setShownArray([])
        // setStaticArray([""])
        // setCurrentPicture("")
        // setCompareArray([])
        // setAnswer("")
        // setDigits(-1)
        // setCurrentMessage("Try to memorize the next set of " + pictures_value + " pictures.")
        // setShowMessage(false)
        // setAnsweredStyle(answered_style[0])
        // setRestart(true)
    }



  return(
    <div className="h-[96em]">
        <div className="row">
            PICTURE RECOGNITION
        </div>
        <div className="row mt-12 text-sky-400">
            {pictures_value} pictures are displayed, one every 1.5 seconds. The player is told to memorize each picture. Afterward, fourteen more pictures are shown. This time the picture set only contains some of the items from the original display. The player is asked if each displayed picture from the second set was in the original set.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="h-[48rem] mt-24">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowPrompt ?
                    <div className="h-[60%] mt-12 grid grid-rows-2 gap-4 place-items-center">
                        {ShowMessage ? 
                            <span>
                                {CurrentMessage} 
                            </span>
                        : 
                            <img src={CurrentPicture} className="h-[518px]"/> 
                        }
                    </div>    
                : ShowCompare ?
                    <div className="h-[40%] mt-12 grid grid-auto-rows gap-12 place-items-center">
                        <div className="h-[100%] mt-[20px]">
                            {CompareDigits >= 0 && CurrentPicture != "" ? 
                                <img src={CurrentPicture} className="h-[518px]"/> 
                            :
                                <div className="h-[15%] mt-[200px] grid-cols-2 gap-x-[100px] place-items-center">
                                    <span className={AnsweredStyle}>
                                        {AnsweredString}
                                    </span>
                                    <span className="ml-48">
                                        {Answer}
                                    </span>
                                </div>  
                            }
                        </div>
                        <div className="h-[55%] mt-[75px]">
                            {ShowButtons ?
                                <div className="grid-cols-2 gap-x-[100px] place-items-center">
                                    <Button className="bg-green-400 rounded px-10 h-12 text-white" onClick={yes_handler}>
                                        Yes
                                    </Button>
                                    <Button className="bg-red-400 rounded px-10 h-12 ml-12 text-white" onClick={no_handler}>
                                        No
                                    </Button>
                                </div>
                            : null}
                        </div>
                    </div>
                : null
        :
            <div className="grid h-[40%] mt-12 grid-auto-rows gap-12 place-items-center"> 
                <span className="mt-12">
                    The Test is Over.
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of {pictures_value}. ({calculate_ratio()}%)
                </span>
                <div className="w-[100%]">
                    <ShowAnalysis AttentionData={AttentionData} DecisionData={DecisionData} ReactionData={ReactionData} />
                </div> 
                <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                     Reset
                </Button>
            </div>
        }
        {ShowCompare && !EndTest ? 
            <div className="grid place-items-center">
                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={pictures_value} CurrentPosition={Math.ceil(CompareDigits/2)} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
            </div>
        : null} 
    </div>
  )
}



