// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function ChoiceReaction (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [Prompt, setPrompt] = React.useState(false)
    const [CurrentPrompt, setCurrentPrompt] = React.useState("")
    const [TestStart, setTestStart] = React.useState(false)
    const [Answer, setAnswer] = React.useState(false)
    const [YesCount, setYesCount] = React.useState(0)
    const [NoCount, setNoCount] = React.useState(0)
    const [AnswerCount, setAnswerCount] = React.useState(0)

    // const number_class = ["text-2xl bold", "text-2xl bold text-green-400"]
    // const [NumberClass, setNumberClass] = React.useState(number_class[0])

    const prompt_list = [
        //TRUE
        "New York is a city in the USA.", //1
        "A dog is an animal.", //2
        "Ice is frozen liquid.", //3
        "7 + 3 = 10", //4
        "Trees have leaves.", //5
        "An apple is a fruit.", //6
        "America has 50 states.", //7
        "Soda is a drink.", //8
        "Bread is a food.", //9
        "Basketball is a sport.", //10

        //FALSE
        "Green is not a color.", //11
        "Hamburgers aren't a food.", //12
        "25 is a letter.", //13,
        "America is a planet.", //14
        "Star Wars is not a movie.", //15
        "A person can live without water.", //16
        "1 + 5 = 16", //17
        "There are 180 days in a month.", //18
        "Computers have always existed.", //19
        "9 + 9 = 2" //20
    ]

    const [PromptList, setPromptList] = React.useState(prompt_list)



    // useEffect(() => {
    //     if(){

    //     }   
    // }, [])


    function get_prompt(){
        PromptList.length < 1 ? setEndTest(true) : null
        var temp_arr = PromptList
        console.log(PromptList)
        var pos = Math.floor(Math.random() * temp_arr.length)   
        var curr_prompt = temp_arr[pos]
        var spot = 0
        for(var i = 0; i < prompt_list.length; i++){
            if(prompt_list[i] == curr_prompt){
                spot = i
                // console.log("spot")
                // console.log(spot)
                break
            }
        }
        spot < 10 ? setAnswer(true) : setAnswer(false)
        // console.log("==========================")
        // console.log("Current Prompt:")
        // console.log(curr_prompt)
        setCurrentPrompt(curr_prompt)
        // console.log("==========================")
        temp_arr.splice(pos, 1)
        // console.log(temp_arr)
        setPromptList(temp_arr)
    }

    function start_handler(){
        get_prompt()
        setTestStart(true)
    }

    function yes_handler(){
        setYesCount(YesCount + 1)
        answer_handler(true)
        get_prompt()
    }

    function no_handler(){
        setNoCount(NoCount + 1)
        answer_handler(false)
        get_prompt()
    }

    function answer_handler(answer: any){
        // console.log("Answer Count")
        // console.log(AnswerCount)
        answer == Answer ? console.log("correct") : null
        answer == Answer ? setAnswerCount(AnswerCount + 1) : null
    }

    function calculate_ratio(){
        return Math.round((AnswerCount/20)*100)
    }

  return(
    <div>
        <div className="row">
            TEST #4: CHOICE REACTION TIME
        </div>
        <div className="row mt-12 text-sky-400">
            Either the word Yes or the word No is presented in the center of the screen. The user is presented a simple question and has to press the button corresponding to the answer as quickly as possible. There are 20 trials and the intertrial interval varies randomly between 1 and 2.5 seconds.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="mt-[200px]">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start
                    </Button>                                  
                </div>
            : 
                <div className="mt-[200px] grid grid-rows-2">
                    <span>
                        {CurrentPrompt}
                    </span>
                    <div className="mt-12 grid grid-cols-2">
                        <Button className="bg-green-400 rounded px-10 h-12 text-white" onClick={yes_handler}>
                            Yes
                        </Button>
                        <Button className="bg-red-400 rounded px-10 h-12 text-white" onClick={no_handler}>
                            No
                        </Button>
                    </div>
                </div>      
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

  