'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function MemoryScanning (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [CurrentPrompt, setCurrentPrompt] = React.useState("")
    const [TestStart, setTestStart] = React.useState(false)
    const [Answer, setAnswer] = React.useState(false)
    const [YesCount, setYesCount] = React.useState(0)
    const [NoCount, setNoCount] = React.useState(0)
    const [AnswerCount, setAnswerCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)
    const [ShowPrompt, setShowPrompt] = React.useState(false)
    const [ShowCompare, setShowCompare] = React.useState(false)
    const [CompareMessage, setCompareMessage] = React.useState(false)
    const [CompareNumbers, setCompareNumbers] = React.useState(false)
    const [ShowButtons, setShowButtons] = React.useState(false)  
    const [CompareDigits, setCompareDigits] = React.useState(-1)
    const [DigitList, setDigitList] = React.useState([])
    const [StaticList, setStaticList] = React.useState([])
    const [CurrentDigit, setCurrentDigit] = React.useState("4")
    const [CompareList, setCompareList] = React.useState([])
    const [CompareString, setCompareString] = React.useState("ftstsg")
    const [Digits, setDigits] = React.useState(-1)




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
                console.log(StaticList)

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
                        console.log("12345")
                    }
                }

                if(CompareNumbers){
                    compare_arr = CompareList
                    console.log("\n\ncompare list")
                    console.log(compare_arr)
                    console.log(StaticList)
                    if(CompareDigits %2 != 0){
                        setShowButtons(true)
                        setShowCompare(true)  
                        setCompareString(CompareList[CompareList.length-1])
                        compare_arr.pop(0)
                        setCompareList(compare_arr)
                    }else{
                        setShowButtons(false)
                        setShowCompare(false) 
                        setCompareString("")      
                    }

                    if(CompareDigits == 0){
                        setCompareNumbers(false)
                        setEndTest(true)
                    }

                }
                console.log(CompareDigits)

                    CompareDigits == 0 ? setCompareDigits(36) :              setCompareDigits(CompareDigits - 1)



            }, 2500 )

            return () => clearTimeout(timeoutId)

        }



    }, [IntervalTime, Digits, DigitList, CompareDigits])

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
        console.log("temp list set compare")
        console.log(list)
        var temp_list: any  = []
        temp_list = temp_list.concat(list)
        console.log(temp_list)

        var i = temp_list.length
        while(i < 18){
            var num: any = Math.floor(Math.random() * ((1000-1)+1)) 
            if(!temp_list.includes(num)){
                temp_list.push(num)
                i++
            }
        }
        console.log(temp_list)
        temp_list = shuffle_list(temp_list, temp_list.length)

        setCompareList(temp_list)
    }

    function shuffle_list(list: any, size: any){
        console.log(list)
        var new_list: any = []

        while(new_list.length < size){
            var num = Math.floor(Math.random() * ((list.length-1)+1)) + 1
            console.log(num)
            new_list.push(list[num-1])
            list.splice(num-1, 1)
            console.log(new_list)
        }

        console.log("new list")
        console.log(new_list)

        setShowPrompt(true)
        return new_list
    }


    function create_string(){
        var temp_arr: any = CompareList
        console.log("compare create string")
        console.log(temp_arr)
        console.log(CompareList)
        var str: any = ""

        for(var i=0; i<CompareList.length; i++){
            str = str + " " + CompareList[i]
        }

        setCompareString(str)
    }


    function yes_handler(){
        // setYesCount(YesCount + 1)
        answer_handler(true)
        // get_prompt()
    }


    function no_handler(){
        // setNoCount(NoCount + 1)
        answer_handler(false)
        // get_prompt()
    }


    function answer_handler(answer: any){
        setCompareString("")
        setShowButtons(false)
        var temp_arr: any = StaticList
        console.log(StaticList)
        console.log(CompareString)
        console.log(answer)
        answer && temp_arr.includes(CompareString) || (!answer && !temp_arr.includes(CompareString)) ? setAnswerCount(AnswerCount + 1) : null

    }


    function start_handler(){
        create_list()
        setDigits(4)
        setTestStart(true)
        setShowPrompt(true)
    }


    function calculate_ratio(){
        return Math.round((AnswerCount/18)*100)
    }


  return(
    <div>
        <div className="row">
            TEST #5: MEMORY SCANNING TASK TEST
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
                    : null}
                </div>    
            : null
        :
            <div className="grid grid-rows-3 mt-[200px]"> 
                <span className="mt-12">
                    Test is Over
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of 18. ({calculate_ratio()}%)
                </span>
            </div>
        }
    </div>
  )

}

  