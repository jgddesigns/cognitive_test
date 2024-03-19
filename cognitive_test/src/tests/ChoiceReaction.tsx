// Import AWS SDK and configure
'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"


export default function ChoiceReaction (props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [Prompt, setPrompt] = React.useState(false)

    // const number_class = ["text-2xl bold", "text-2xl bold text-green-400"]
    // const [NumberClass, setNumberClass] = React.useState(number_class[0])

    // useEffect(() => {
    //     if(){

    //     }   
    // }, [])

 
    const prompt_list = [
        //TRUE
        "New York is a city in the USA.", //1
        "Is a dog a mammal?", //2
        "Does water freeze at 32 degrees farenheit?", //3
        "7 + 3 = 10", //4
        "Trees have leaves.", //5
        "An apple (food, not computer) is a fruit.", //6
        "America has 50 states.", //7
        "Tequila is a type of alcohol.", //8
        "Pancakes (traditional) are made with flour.", //9
        "Basketball is a sport.", //10

        //FALSE
        "Super Mario is a documentary based on a famous celebrity.", //11
        "Hamburgers aren't a food.", //12
        "Paris is a city in Japan.", //13,
        "America was founded in 1993.", //14
        "Star Wars is not a popular movie.", //15
        "A person can live up to 3 months without water.", //16
        "1 + 5 = 16", //17
        "There are 180 total playing cards in a deck.", //18
        "Computers were first invented in 1765.", //19
        "9 X 9 = 88" //20
    ]

    const [PromptList, setPromptList] = React.useState(prompt_list)



    function get_prompt(){
        var temp_arr = PromptList
        var pos = Math.floor(Math.random() * temp_arr.length)   
        var curr_prompt = temp_arr[pos]
        console.log("==========================")
        console.log("Current Prompt:")
        console.log(curr_prompt)
        console.log("==========================")
        temp_arr.splice(pos, 1)
        setPromptList(temp_arr)
        temp_arr.length > 0 ? get_prompt() : null
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
            <div className="mt-[200px] grid grid-cols-3">
                {/* <span>{Statement}</span> */}
                <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={get_prompt}>Start</Button>
                                                  
            </div>
        :
            <div className="grid grid-rows-1 mt-[200px]">
                <div className="mt-12"> 
                    <span>
                        Test is Over
                    </span>
                </div>     
            </div>
        }

    </div>
  )

}

  