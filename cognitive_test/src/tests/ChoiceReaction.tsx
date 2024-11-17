'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import {analysis} from "../helpers/Analysis"
import ProgressBar from '@/helpers/ProgressBar';
import ShowAnalysis from '@/helpers/ShowAnalysis';

export default function ChoiceReaction (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [CurrentPrompt, setCurrentPrompt] = React.useState("")
    const [TestStart, setTestStart] = React.useState(false)
    const [Answer, setAnswer] = React.useState(false)
    const [YesCount, setYesCount] = React.useState(0)
    const [NoCount, setNoCount] = React.useState(0)
    const [AnswerCount, setAnswerCount] = React.useState(0)
    const [IntervalTime, setIntervalTime] = React.useState(0)
    const [Answers, setAnswers] = React.useState<any>([])
    const [Answers2, setAnswers2] = React.useState<any>([])
    const [ShowPrompt, setShowPrompt] = React.useState(false)
    const [ShowCirclesGreen, setShowCirclesGreen] = React.useState(false)
    const [ShowCirclesRed, setShowCirclesRed] = React.useState(false)
    const [Restart, setRestart] = React.useState(false)
    const response_time = 100
    const [ResponseTime, setResponseTime] = React.useState(0)
    const [TimeArray, setTimeArray] = React.useState<any>([])
    const [AttentionData, setAttentionData]  = React.useState<any>(null)
    const [DecisionData, setDecisionData] = React.useState<any>(null)
    const [ReactionData, setReactionData]  = React.useState<any>(null)
    const [Inserted, setInserted] = React.useState(false)

    const prompt_list = [
        //true questions
        "The sky is blue.",
        "Water freezes at 0 degrees Celsius.",
        "The sun provides energy for plants to grow.",
        "Humans need oxygen to survive.",
        "The Earth orbits the Sun.",
        "Dogs are mammals.",
        "Gold is a metal.",
        "Sharks live in the ocean.",
        "Fire requires oxygen to burn.",
        "The Eiffel Tower is in Paris.",
        "Diamonds are harder than glass.",
        "The Amazon River is the longest river in the world.",
        "The moon orbits the Earth.",
        "Sound travels faster in water than in air.",
        "Horses have hooves.",
        "Mount Everest is the highest mountain in the world.",
        "The human body is composed of over 60% water.",
        "The Atlantic Ocean is the second-largest ocean on Earth.",
        "Light travels faster than sound.",
        "The Great Wall of China is visible from space.",
        "Australia is both a country and a continent.",
        "The Grand Canyon is located in the United States.",
        "Giraffes are the tallest land animals.",
        "Venus is the hottest planet in the solar system.",
        "The human heart has four chambers.",
        "Polar bears live in the Arctic.",
        "Penguins cannot fly.",
        "Oxygen is the most abundant element in the Earth's crust.",
        "Bees produce honey.",
        "A kilometer is longer than a mile.",
        "Tomatoes are fruits.",
        "Spiders have eight legs.",
        "The Pacific Ocean is the largest ocean on Earth.",
        "The human eye can distinguish millions of different colors.",
        "Lightning is hotter than the surface of the sun.",
        "Saturn has rings.",
        "A leap year has 366 days.",
        "The Sahara is the largest desert in the world.",
        "Octopuses have three hearts.",
        "Copper is a good conductor of electricity.",
        "Mercury is the smallest planet in the solar system.",
        "Bats are the only mammals capable of sustained flight.",
        "Salt dissolves in water.",
        "Whales are mammals.",
        "The human brain is made up of billions of neurons.",
        "Ostriches can run faster than horses.",
        "Glass is made from sand.",
        "The North Pole is located in the Arctic Ocean.",
        "Butterflies undergo metamorphosis.",
        "Grass is green due to chlorophyll.",
        
        //false questions
        "The sun rises in the west.",
        "Cows can fly.",
        "The capital of France is Rome.",
        "Fish breathe air like humans do.",
        "Water boils at 50 degrees Celsius.",
        "The moon is made of cheese.",
        "The Earth is flat.",
        "Fire is cold.",
        "Bananas are vegetables.",
        "Humans have three eyes.",
        "Birds are mammals.",
        "The Pacific Ocean is the smallest ocean on Earth.",
        "Spiders have six legs.",
        "Tomatoes are vegetables.",
        "A kilometer is shorter than a mile.",
        "Bees produce milk.",
        "Oxygen is the most abundant gas in the Earth's atmosphere.",
        "Penguins can fly.",
        "Polar bears live in Antarctica.",
        "The human heart has five chambers.",
        "Venus is the coldest planet in the solar system.",
        "Giraffes are the shortest land animals.",
        "The Grand Canyon is located in Canada.",
        "Australia is a continent, but not a country.",
        "The Great Wall of China is not visible from space.",
        "Sound travels faster in air than in water.",
        "The moon orbits the Sun.",
        "The Amazon River is the shortest river in the world.",
        "Diamonds are softer than glass.",
        "The Eiffel Tower is in London.",
        "Fire does not require oxygen to burn.",
        "Sharks live in forests.",
        "Gold is a type of plant.",
        "Dogs are reptiles.",
        "The Earth orbits the moon.",
        "Humans do not need oxygen to survive.",
        "The sun does not provide energy for plants to grow.",
        "Water boils at 100 degrees Fahrenheit.",
        "The sky is green.",
        "Copper is a poor conductor of electricity.",
        "Octopuses have one heart.",
        "The Sahara is the smallest desert in the world.",
        "A leap year has 365 days.",
        "Saturn has no rings.",
        "Lightning is cooler than the surface of the sun.",
        "The human eye can only distinguish a few colors.",
        "The Pacific Ocean is the smallest ocean on Earth.",
        "Spiders have six legs.",
        "Tomatoes are vegetables.",
        "'Star Wars' is not a movie"
    ];
    

    const [PromptList, setPromptList] = React.useState([])

    const list_length = 20
    const [Position, setPosition] = React.useState(list_length + 1)


    //proficient overall score
    const proficiency = 14

    const interval = "sections"

    //section interval, every 4 questions.. 5 sections total
    const time = 5

    const time_measure = .5

    const test_name = "choice_reaction"


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

    useEffect(() => {

        PromptList.length == list_length ? get_prompt() : null

    }, [PromptList])


    useEffect(() => {

        !DecisionData && AttentionData  ? setDecisionData(analysis["decisiveness"](AttentionData["original_answers"])) : null
        !Inserted && AttentionData && ReactionData && DecisionData ? handle_insert() : null

    }, [Inserted, AttentionData, ReactionData, DecisionData])


    useEffect(() => {
        Inserted ? props.setInsert(true): null
    }, [Inserted])


    useEffect(() => {
        var count
        while(ShowPrompt && ResponseTime >= 0){
            const timeoutId = setTimeout(() => {
                count = ResponseTime
                setResponseTime(ResponseTime + response_time)
            }, response_time )

            return () => clearTimeout(timeoutId)
        }
    
    }, [ShowPrompt, ResponseTime])

    // Sets the state variable from /src/app/page.tsx to the an array containing the post-test analysis and sets the test name to the current test.
    // @param: N/A
    // @return: N/A
    function handle_insert(){
        console.log("inserting to database")
        props.setData([AttentionData, DecisionData, ReactionData])
        props.setTestName(test_name)
        setInserted(true)
    }

    // Builds the list of prompts within the test
    // @param: N/A
    // @return: N/A
    function create_prompts(){
        var temp_list = prompt_list
        var temp_arr: any = []

        while(temp_arr.length < list_length){
            let num = Math.floor(Math.random() * ((temp_list.length-1)+1)) 
            if(temp_list[num]){
                temp_arr.push(temp_list[num])
                temp_list.splice(num, 1)
                console.log(temp_list.length)
            }
        }
        setPromptList(temp_arr)
    }

    // Pushes the most recent reaction time to the TimeArray state variable and sets the response time variable back to 0. 
    // @param: N/A
    // @return: N/A
    function reset_time(){
        var arr = TimeArray
        arr.push(ResponseTime*.001) 
        console.log("time")
        console.log(arr)
        setTimeArray(arr)
        setResponseTime(0)
    }

    // Gets the current prompt to display and removes it from the list of unshown prompts
    // @param: N/A
    // @return: N/A
    function get_prompt(){
        if(PromptList.length < 1){
            setEndTest(true)
            setAttentionData(analysis["attention"](interval, Answers, time, proficiency))
            setReactionData(analysis["speed"](TimeArray, time_measure))
        } 
        PromptList.length < 1 && ShowPrompt ? setEndTest(true) : null
        var temp_arr = PromptList
        console.log(PromptList)
        var pos = Math.floor(Math.random() * temp_arr.length)   
        var curr_prompt = temp_arr[pos]
        var spot = 0
        for(var i = 0; i < prompt_list.length; i++){
            if(prompt_list[i] == curr_prompt){
                spot = i
                break
            }
        }
        spot < 50 ? setAnswer(true) : setAnswer(false)
        setCurrentPrompt(curr_prompt)
        setPosition(Position - 1)
        temp_arr.splice(pos, 1)
        setPromptList(temp_arr)
    }

    // Calls the functions and sets the variables needed to start the test
    // @param: N/A
    // @return: N/A
    function start_handler(){
        create_prompts()
        setTestStart(true)
        setShowPrompt(true)
    }

    // If an answer is correct, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function yes_handler(){
        setYesCount(YesCount + 1)
        answer_handler(true)
        get_prompt()
    }

    // If an answer is wrong, calls the functions and sets the variables accordingly
    // @param: N/A
    // @return: N/A
    function no_handler(){
        setNoCount(NoCount + 1)
        answer_handler(false)
        get_prompt()
    }

    // Once a prompt is answered, takes the answer and determines if it is correct or not. Logs the response time.
    // @param 'answer': N/A
    // @return: N/A
    function answer_handler(answer: any){
        var temp_arr = Answers
        var temp_arr2 = Answers2
        if(answer == Answer){
            temp_arr.push(1)
            setAnswerCount(AnswerCount + 1)
            setShowCirclesGreen(true)
        }else{
            temp_arr.push(0)
            setShowCirclesRed(true)
        }
        setAnswers(temp_arr)
        setAnswers2(temp_arr2)
        setShowPrompt(false)
        set_interval()
        TimeArray.length < list_length ? reset_time() : null
    }

    // Calculates the user's test score based on correct answers and list count
    // @param: N/A
    // @return 'integer': The correct percentage
    function calculate_ratio(){
        return Math.round((AnswerCount/list_length)*100)
    }

    // Sets the interval between prompts
    // @param: N/A
    // @return: N/A
    function set_interval(){
        setIntervalTime(Math.random() * 2.5)
    }

    // Resets the test based on its state within /src/app/page.tsx'
    // @param: N/A
    // @return: N/A
    function reset_all(){
        props.setReset(true)
        // setEndTest(false)
        // setCurrentPrompt("")
        // setTestStart(false)
        // setAnswer(false)
        // setYesCount(0)
        // setNoCount(0)
        // setAnswerCount(0)
        // setIntervalTime(0)
        // setShowPrompt(false)
        // setShowCirclesGreen(false)
        // setShowCirclesRed(false)
        // setRestart(true)
        // setTimeArray([])
        // setResponseTime(response_time)
    }



  return(
    <div>
        <div className="row">
            CHOICE REACTION TIME
        </div>
        <div className="row mt-12 text-sky-400">
            Either the word Yes or the word No is presented in the center of the screen. The user is presented a simple question and has to press the button corresponding to the answer as quickly as possible. There are {list_length} trials and the intertrial interval varies randomly between 1 and 2.5 seconds.
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
                    <div className="mt-[200px] grid grid-rows-2">
                        <span className="invisible">
                            {CurrentPrompt}
                        </span>
                        <div className="mt-12 grid grid-cols-2">
                            <Button className="bg-green-400 rounded px-10 h-12 text-white invisible" onClick={yes_handler}>
                                Yes
                            </Button>
                            <Button className="bg-red-400 rounded px-10 h-12 text-white invisible" onClick={no_handler}>
                                No
                            </Button>
                        </div>
                    </div>   
        :
            <div className="grid grid-auto-rows place-items-center mt-[100px]"> 
                <span className="mt-12 text-4xl">
                    The Test is Over
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

        {TestStart ? 
            <div className="grid place-items-center">
                <ProgressBar setRestart={setRestart} Restart={Restart} LengthValue={list_length} CurrentPosition={Position} ShowCirclesGreen={ShowCirclesGreen} setShowCirclesGreen={setShowCirclesGreen} ShowCirclesRed={ShowCirclesRed} setShowCirclesRed={setShowCirclesRed}/>
            </div>
        : null}
    </div>
  )

}

  