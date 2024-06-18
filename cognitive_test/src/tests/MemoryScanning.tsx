'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function ChoiceReaction (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [CurrentPrompt, setCurrentPrompt] = React.useState("")
    const [TestStart, setTestStart] = React.useState(false)
    const [Answer, setAnswer] = React.useState(false)
    const [YesCount, setYesCount] = React.useState(0)
    const [NoCount, setNoCount] = React.useState(0)
    const [AnswerCount, setAnswerCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)
    const [ShowPrompt, setShowPrompt] = React.useState(false)

    const [DigitList, setDigitList] = React.useState([])
    const [CompareList, setCompareList] = React.useState([])

    // const number_class = ["text-2xl bold", "text-2xl bold text-green-400"]
    // const [NumberClass, setNumberClass] = React.useState(number_class[0])



    useEffect(() => {
        var count = 1
        while(IntervalTime > 0){
            const timeoutId = setTimeout(() => {
                setIntervalTime(IntervalTime-.5)
                count = IntervalTime
                if(count <= .5){
                    set_interval()
                    setShowPrompt(true) 
                }
            }, 500 )

            return () => clearTimeout(timeoutId)
        }

    }, [IntervalTime])

    //partially from chat gpt
    function create_list(){
        var temp_list: any = []

        var i = 0
        while(i < 3){
            temp_list.push(Math.floor(Math.random() * ((1000-1)+1)) + 1)
            i++
        }
        setDigitList(temp_list)
        compare_list(temp_list)
    }


    function compare_list(list: any){
        console.log(list)
        var temp_list: any  = []
        temp_list = temp_list.concat(list)

        var i = list.length
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
        return new_list
    }




    // function get_prompt(){
    //     PromptList.length < 1 ? setEndTest(true) : null
    //     var temp_arr = PromptList
    //     console.log(PromptList)
    //     var pos = Math.floor(Math.random() * temp_arr.length)   
    //     var curr_prompt = temp_arr[pos]
    //     var spot = 0
    //     for(var i = 0; i < prompt_list.length; i++){
    //         if(prompt_list[i] == curr_prompt){
    //             spot = i
    //             break
    //         }
    //     }
    //     spot < 10 ? setAnswer(true) : setAnswer(false)
    //     setCurrentPrompt(curr_prompt)
    //     temp_arr.splice(pos, 1)
    //     setPromptList(temp_arr)
    // }

    function start_handler(){
        create_list()

        // shuffle_list(DigitList, DigitList.length)
        // setTestStart(true)
        // setShowPrompt(true)
        // get_prompt()
    }

    // function yes_handler(){
    //     setYesCount(YesCount + 1)
    //     answer_handler(true)
    //     get_prompt()
    // }

    // function no_handler(){
    //     setNoCount(NoCount + 1)
    //     answer_handler(false)
    //     get_prompt()
    // }

    function answer_handler(answer: any){
        answer == Answer ? console.log("correct") : null
        answer == Answer ? setAnswerCount(AnswerCount + 1) : null
        setShowPrompt(false)
        set_interval()
    }

    function calculate_ratio(){
        return Math.round((AnswerCount/20)*100)
    }

    function set_interval(){
        setIntervalTime(2.5)
    }

  return(
    <div>
        <div className="row">
            TEST #5: MEMORY SCANNING TASK TEST
        </div>
        <div className="row mt-12 text-sky-400">
            Three digits are presented singly at the rate of one every 2.5 seconds for the patient to remember. A series of 18 digits is then presented. For each, the patient must press Yes or No according to whether the digit is thought to be one of the three presented initially.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="mt-[200px]">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start
                    </Button>  
                    {/* <div>Digits: {DigitList}</div>  
                    <div>Compare: {CompareList} </div>                              */}
                </div>
            :   ShowPrompt ?
                    <div className="mt-[200px] grid grid-rows-2">
                        <span>
                            {CurrentPrompt}
                        </span>
                        {/* <div className="mt-12 grid grid-cols-2">
                            <Button className="bg-green-400 rounded px-10 h-12 text-white" onClick={yes_handler}>
                                Yes
                            </Button>
                            <Button className="bg-red-400 rounded px-10 h-12 text-white" onClick={no_handler}>
                                No
                            </Button>
                        </div> */}
                    </div>    
                : null  
        :
            <div className="grid grid-rows-3 mt-[200px]"> 
                <span className="mt-12">
                    Test is Over
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of 20. ({calculate_ratio()}%)
                </span>
            </div>
        }
    </div>
  )

}

  