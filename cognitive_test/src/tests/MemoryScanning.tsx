'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import { analysis } from '@/helpers/Analysis';


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
    const [AnsweredString, setAnsweredString] = React.useState("")  
    const [CompareDigits, setCompareDigits] = React.useState(-1)
    const [DigitList, setDigitList] = React.useState([])
    const [StaticList, setStaticList] = React.useState([])
    const [CurrentDigit, setCurrentDigit] = React.useState("4")
    const [CompareList, setCompareList] = React.useState([])
    const [CompareString, setCompareString] = React.useState("")
    const [Answer, setAnswer] = React.useState("")
    const [Digits, setDigits] = React.useState(-1)

    const answered_style = ["text-red-400", "text-green-400"]

    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])

    //proficient overall score
    const proficiency = 12

    const interval = "sections"

    //change to 4 digits, 5 sections, 20 total answers
    //section interval, every 3 digits, 6 sections total
    const time = 6


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
                    setCompareString("")
                    setShowPrompt(false)
                    setShowCompare(true)
                    setCompareMessage(true)
                    setCompareDigits(4)
                }

            }, 2500 )

            return () => clearTimeout(timeoutId)
        }

        while(CompareDigits >= 0 && (CompareMessage || CompareNumbers)){

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
                    if(CompareDigits == 0){
                        setCompareString("")
                        setCompareNumbers(true)
                        setCompareMessage(false)
                        setCompareDigits(36)
                    }
                }


                if(CompareNumbers){
                    compare_arr = CompareList

                    if(CompareDigits %2 != 0){
                        setAnsweredString("Missed!")
                        setAnsweredStyle(answered_style[0])
                        setShowButtons(true)
                        setCompareString(CompareList[CompareList.length-1])
                        StaticList.includes(CompareList[CompareList.length-1]) ? setAnswer("Answer was: Yes, number is original digit.") : setAnswer("Answer was: No, number isn't original digit.")              
                        compare_arr.pop(0)
                        setCompareList(compare_arr)
                    }else{
                        check_answer(CompareString)
                        setShowButtons(false)   
                    }

                    if(CompareDigits == 0){
                        setShowCompare(false)
                        setCompareNumbers(false)
                        setEndTest(true)
                    }

                }
            
                CompareDigits == 0 ? setCompareDigits(36) :  setCompareDigits(CompareDigits - 1)

            }, 2500 )

            return () => clearTimeout(timeoutId)

        }

    }, [Digits, DigitList, CompareDigits, Answered])



    //partially from chat gpt
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



    function compare_list(list: any){
        var temp_list: any  = []
        temp_list = temp_list.concat(list)
        var i = temp_list.length

        while(i < 18){
            var num: any = Math.floor(Math.random() * ((1000-1)+1)) 
            if(!temp_list.includes(num)){
                temp_list.push(num)
                i++
            }
        }
        temp_list = shuffle_list(temp_list, temp_list.length)

        setCompareList(temp_list)
    }



    function shuffle_list(list: any, size: any){
        var new_list: any = []

        while(new_list.length < size){
            var num = Math.floor(Math.random() * ((list.length-1)+1)) + 1
            console.log(num)
            new_list.push(list[num-1])
            list.splice(num-1, 1)
            console.log(new_list)
        }

        setShowPrompt(true)
        return new_list
    }



    function create_string(){
        var str: any = ""

        for(var i=0; i<CompareList.length; i++){
            str = str + " " + CompareList[i]
        }

        setCompareString(str)
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
        setCompareString("")

        var temp_arr: any = StaticList
        if (answer && temp_arr.includes(CompareString) || (!answer && !temp_arr.includes(CompareString))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
        }
        // setShowButtons(false)
    }



    function start_handler(){
        console.log(analysis["attention"](interval, [[1,1,1], [1,1,1], [1,1,1], [1,1,1], [1,0,0], [0,0,0]], time, proficiency))
        create_list()
        setDigits(4)
        setTestStart(true)
        setShowPrompt(true)
    }



    function calculate_ratio(){
        return Math.round((AnswerCount/18)*100)
    }



    function check_answer(compare: any){
        console.log("\n\ncompare string")
        console.log(compare)
        var temp_arr: any = StaticList

        if(temp_arr.includes(compare)){
            setAnswer("Answer was: Yes, number is original digit.")          
        }

        if(!temp_arr.includes(compare)){
            setAnswer("Answer was: No, number isn't original digit.")              
        }

        if(compare == ""){
            setAnswer("")
        }

        setCompareString("")
    }

    function resetAll(){
        setEndTest(false)
        setTestStart(false)
        setAnswerCount(0)
        setShowPrompt(false)
        setShowCompare(false)
        setCompareMessage(false)
        setCompareNumbers(false)
        setShowButtons(false)
        setAnswered(true) 
        setAnsweredString("")  
        setCompareDigits(-1)
        setDigitList([])
        setStaticList([])
        setCurrentDigit("4")
        setCompareList([])
        setCompareString("")
        setAnswer("")
        setDigits(-1)





    }

  return(
    <div>
        <div className="row">
            TEST #5: MEMORY SCANNING 
        </div>
        <div className="row mt-12 text-sky-400">
            Three digits are presented singly at the rate of one every 2.5 seconds for the player to remember. A series of 18 digits is then presented. For each, the player must press Yes or No according to whether the digit is thought to be one of the three presented initially.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="mt-[200px]">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowPrompt ?

                    <div className="mt-[200px] grid grid-rows-2">
                        <span>
                           {CurrentDigit}
                        </span>

                    </div>    
                : ShowCompare ?

                <div className="mt-[200px] grid grid-rows-2">
                    <span>
                       {CompareString}
                    </span>
                    {ShowButtons ?
                        <div className="mt-12 grid grid-cols-2">
                            <Button className="bg-green-400 rounded px-10 h-12 text-white" onClick={yes_handler}>
                                Yes
                            </Button>
                            <Button className="bg-red-400 rounded px-10 h-12 text-white" onClick={no_handler}>
                                No
                            </Button>
                        </div>
                    :  CompareDigits >= 0 ?
                    <div className="mt-12 grid grid-cols-2">
                        <span className={AnsweredStyle}>
                            {AnsweredString}
                        </span>
                        <span>
                            {Answer}
                        </span>
                    </div>  
                
                
                
                : null}

                </div>    
            : null
        :
            <div className="grid grid-rows-3 mt-[200px]"> 
                <span className="mt-12">
                    The Test is Over.
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of 18. ({calculate_ratio()}%)
                </span>
                <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={resetAll}>
                     Reset
                </Button>
            </div>
        }
    </div>
  )

}

  