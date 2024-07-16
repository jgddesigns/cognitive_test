'use client'
import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react"
import {words} from "../helpers/words"

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
    const [ShownArray, setShownArray] = React.useState<any>([])
    const [StaticArray, setStaticArray] = React.useState([""])
    const [CurrentWord, setCurrentWord] = React.useState("")
    const [CompareArray, setCompareArray] = React.useState<any>([])
    const [Answer, setAnswer] = React.useState("")
    const [Digits, setDigits] = React.useState(-1)
    const [CurrentMessage, setCurrentMessage] = React.useState("Try to memorize the next set of 10 words.")
    const [ShowMessage, setShowMessage] = React.useState(false)

    const answered_style = ["text-red-400", "text-green-400"]

    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])

    const base_length = 10

    const start_digits = 24 

    const base_iteration = 21
    

    useEffect(() => {

        var temp_arr: any = ShownArray

        while(Digits >= 0){

            const timeoutId = setTimeout(() => {

                Digits > base_iteration ? setShowMessage(true) : setShowMessage(false)

                if(Digits % 2 != 0 && Digits <= base_iteration + 1 && Digits > 1){
                    current_picture(1)
                }else{
                    setCurrentWord("")
                }

                setDigits(Digits - 1)

                if(Digits < 1){
                    setShowCompare(true)
                    setCompareMessage(true)
                    setShowMessage(true)
                    setCompareDigits(base_iteration + 1)
                    setCurrentMessage("What words from the following set were in the first set?")
                }

            }, 1500 )

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
                        temp_arr.includes(current_picture(0)) ? setAnswer("Answer was: Yes, the word is in original set.") : setAnswer("Answer was: No, the word isn't in original set.")
                    }else{
                        check_answer(CurrentWord)
                        setShowButtons(false)
                        setCurrentWord("")
                    }

                    CompareDigits == 0 ? setEndTest(true) : null
                }

                setCompareDigits(CompareDigits - 1)

            }, 3000 )

            return () => clearTimeout(timeoutId)
        }

    }, [Digits, CompareDigits, Answered])


    function build_array(){
        var temp_arr = []
        var shown_arr = []
        var compare_arr = []
        var place = null


        while(temp_arr.length < base_length){
            place = Math.floor(Math.random()*500)
            temp_arr.push(words[place])
            shown_arr.push(words[place])
            compare_arr.push(words[place])
            words.splice(place, 1)
        }

        console.log("INITIAL ARRAY")
        console.log(temp_arr)

        setStaticArray(temp_arr)
        setShownArray(shown_arr)
        setCompareArray(build_compare(compare_arr))

    }


    function build_compare(temp_arr: any){
        var in_set = Math.floor(Math.random() *  5 + 2)
        var place: any = null
        var compare_arr = []
        var final_arr = []


        for(var i=0; i<in_set; i++){
            place = Math.floor(Math.random() * (temp_arr.length - 1))
            compare_arr.push(temp_arr[place])
            temp_arr.splice(place, 1)
        }

        console.log("INCLUDED WORDS")
        console.log(compare_arr)

        while(compare_arr.length < base_length){
            place = Math.floor(Math.random() * (words.length - 1))
            !compare_arr.includes(words[place]) ? compare_arr.push(words[place]) : null
        }

        console.log("COMPARE ARRAY")
        console.log(compare_arr)

        while(final_arr.length < 10){
            place = Math.floor(Math.random() * (compare_arr.length - 1))
            final_arr.push(compare_arr[place])
            compare_arr.splice(place, 1)
        }

        console.log("FINAL SORTED ARRAY")
        console.log(final_arr)

        return final_arr
    }


    //event parameter
    //0 for initial display of pictures
    //1 for compare display
    function current_picture(event: any){
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
        if (answer && temp_arr.includes(CurrentWord) || (!answer && !temp_arr.includes(CurrentWord))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
        }
    }



    function start_handler(){
        build_array()
        setDigits(start_digits)
        setShowMessage(true)
        setTestStart(true)
        setShowPrompt(true)
    }



    function calculate_ratio(){
        return Math.round((AnswerCount/base_length)*100)
    }



    function check_answer(compare: any){
        // console.log("\n\ncompare string")
        // console.log(compare)
        var temp_arr: any = StaticArray

        if(temp_arr.includes(compare)){
            setAnswer("Answer was: Yes, the word is in original set.")          
        }

        if(!temp_arr.includes(compare)){
            setAnswer("Answer was: No, the word isn't in original set.")              
        }

        if(compare == ""){
            setAnswer("")
        }

    }



  return(
    <div className="h-[96em]">
        <div className="row">
            TEST #10: WORD RECOGNITION
        </div>
        <div className="row mt-12 text-sky-400">
            Ten words are displayed, one every 1.5 seconds. The player is told to memorize each word. Afterward, ten more words are shown. This time the word set only contains some of the items from the original display. The player is asked if each word from the second set was in the original set.
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
                        :   <span>
                                {CurrentWord}
                            </span>    
                        }
                    </div>    
                : ShowCompare ?
                    <div className="h-[30%] mt-[50px] grid grid-auto-rows place-items-center">
                        <div className="h-[40%] mt-[20px]">
                            {CompareDigits >= 0 && CurrentWord != "" ? 
                                <span className="h-[15%] mt-[200px]">
                                    {CurrentWord}
                                </span>
                            :
                                <div className="h-[15%] mt-24 grid-cols-2 gap-x-[100px] place-items-center">
                                    <span className={AnsweredStyle}>
                                        {AnsweredString}
                                    </span>
                                    <span className="ml-48">
                                        {Answer}
                                    </span>
                                </div>  
                            }
                        </div>

                        <div>
                            {ShowButtons ?
                                <div className="h-[55%]  grid-cols-2 gap-x-[100px] place-items-center">
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
            <div className="grid grid-rows-3 mt-[200px] place-items-center"> 
                <span className="mt-12">
                    The Test is Over.
                </span> 
                <span className="mt-12">
                    {AnswerCount} answers correct out of 10. ({calculate_ratio()}%)
                </span>
            </div>
        }
    </div>
  )

}

  