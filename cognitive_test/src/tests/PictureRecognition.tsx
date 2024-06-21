'use client'
import React, {useEffect} from 'react';
import {Button, useTimeInput} from "@nextui-org/react"


export default function PictureRecognition (props: any) {

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
    const [PictureArray, setPictureArray] = React.useState([])
    const [ShownArray, setShownArray] = React.useState([])
    const [StaticArray, setStaticArray] = React.useState([""])
    const [CurrentPicture, setCurrentPicture] = React.useState("")
    const [CompareArray, setCompareArray] = React.useState([])
    const [CompareString, setCompareString] = React.useState("")
    const [Answer, setAnswer] = React.useState("")
    const [Digits, setDigits] = React.useState(-1)
    const [CurrentMessage, setCurrentMessage] = React.useState("Try to memorize the next set of 14 pictures.")
    const [ShowMessage, setShowMessage] = React.useState(false)

    const answered_style = ["text-red-400", "text-green-400"]

    const [AnsweredStyle, setAnsweredStyle] = React.useState(answered_style[0])


    useEffect(() => {
        var temp_arr: any = ShownArray
        var compare_arr: any = CompareArray

        while(Digits >= 0){

            console.log(Digits)

            const timeoutId = setTimeout(() => {

                Digits > 29 ? setShowMessage(true) : setShowMessage(false)

                if(Digits % 2 != 0 && Digits <= 28){
                    current_picture(1)
                }else{
                    setCurrentPicture("")
                }

                setDigits(Digits - 1)

                if(Digits < 1){
                    setCompareString("")
                    setShowPrompt(false)
                    setShowCompare(true)
                    setCompareMessage(true)
                    setCompareDigits(32)
                    setShowMessage(true)
                }

            }, 1500 )

            return () => clearTimeout(timeoutId)
        }

        while(CompareDigits >= 0 && (CompareMessage || CompareNumbers)){

            const timeoutId = setTimeout(() => {

                if(CompareMessage){

                    if(CompareDigits == 32){
                        setCompareString("Were the images from the following set in the first set?")
                    }
                    if(CompareDigits == 31){
                        setCompareString("")
                    }

                    if(CompareDigits % 2 != 0 && CompareDigits <= 28){
                        setAnsweredString("Missed!")
                        setAnsweredStyle(answered_style[0])
                        setShowButtons(true)
                        console.log(StaticArray)
                        StaticArray.includes(current_picture(0)) ? setAnswer("Answer was: Yes, picture is in original set.") : setAnswer("Answer was: No, picture isn't in original set.")
                    }else{
                        check_answer(CurrentPicture)
                        setShowButtons(false)
                        setCurrentPicture("")
                    }

                }

                CompareDigits == 0 ? setCompareDigits(32) :  setCompareDigits(CompareDigits - 1)

            }, 1500 )

            return () => clearTimeout(timeoutId)

        }

    }, [Digits, CompareDigits, Answered])



    //partially from chat gpt
    function build_array(){
        var temp_arr: any = []
        var shown_arr: any = []
        var copy_arr: any = []

        var i: any = 1
        while(i <= 50){
            var str: any = "/img/"
            if(i < 10){
                str = str + "0" + String(i) + ".jpg"
            }else{
                str = str + String(i) + ".jpg"
            }
            temp_arr.push(str)
            i++
        }

        temp_arr = shuffle_array(temp_arr, temp_arr.length)

        console.log("\n\ntemp arr")
        console.log(temp_arr)
        setPictureArray(temp_arr)

        shown_arr = temp_arr.splice(0,14)

        console.log("\n\nshown arr")
        console.log(shown_arr)

        console.log("\n\ntemp arr (after splice)")
        console.log(temp_arr)

        setCurrentPicture(shown_arr[0])

        shown_arr.splice(0, 1)

        setShownArray(shown_arr)


        for(var i: any = 0; i<shown_arr.length; i++){
            copy_arr.push(shown_arr[i])
        }

        setStaticArray(copy_arr)
        build_compare(temp_arr, copy_arr)
        
    }


    function build_compare(temp_arr: any, copy_arr: any){
        var temp_list: any  = []
        var i: any = 0
        var num: any = 0

        copy_arr = shuffle_array(copy_arr, copy_arr.length)

        console.log("\n\nshown arr (after shuffle)")
        console.log(copy_arr)

        while(i<10){
            num = Math.floor(Math.random() * ((2-1)+1)) 

            if(num == 0){
                temp_list.push(copy_arr[0])
                copy_arr.splice(0,1)
            }

            i++
        }

        console.log("\n\ncompare list")
        console.log(temp_list)

        while(temp_list.length < 14){
            temp_list.push(temp_arr[0])
            temp_arr.splice(0, 1)
        }

        console.log("\n\ncompare list (full)")
        console.log(temp_list)


        temp_list = shuffle_array(temp_list, temp_list.length)


        console.log("\n\ncompare list (shuffled)")
        console.log(temp_list)
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



    function create_string(){
        var str: any = ""

        for(var i=0; i<CompareArray.length; i++){
            str = str + " " + CompareArray[i]
        }

        setCompareString(str)
    }`  `


    //event parameter
    //0 for initial display of pictures
    //1 for compare display
    function current_picture(event: any){
        var temp_arr: any = []
        var img: any = ""
        event ? temp_arr = ShownArray : temp_arr = CompareArray
        console.log(event)
        console.log(temp_arr)
        img = temp_arr[0]
        setCurrentPicture(temp_arr[0])
        temp_arr.splice(0, 1)

        event ? setShownArray(temp_arr) : setCompareArray(temp_arr)

        return img
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

        var temp_arr: any = StaticArray
        if (answer && temp_arr.includes(CurrentPicture) || (!answer && !temp_arr.includes(CurrentPicture))){
            setAnswerCount(AnswerCount + 1)
            setAnsweredStyle(answered_style[1])
        }
        // setShowButtons(false)
    }



    function start_handler(){
        build_array()
        setDigits(32)
        setShowMessage(true)
        setTestStart(true)
        setShowPrompt(true)
    }



    function calculate_ratio(){
        return Math.round((AnswerCount/18)*100)
    }



    function check_answer(compare: any){
        console.log("\n\ncompare string")
        console.log(compare)
        var temp_arr: any = StaticArray

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



  return(
    <div>
        <div className="row">
            TEST #6: PICTURE RECOGNITION TEST
        </div>
        <div className="row mt-12 text-sky-400">
            Fourteen pictures are displayed, one every 1.5 seconds. The player is told to memorize each picture. Afterward, fourteen more pictures are shown. This time the picture set only contains some of the items from the original display. The player is asked if each displayed picture from the second set was in the original set.
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
                        {ShowMessage ? 
                            <span>
                                {CurrentMessage} 
                            </span>
                        : 
                            <img src={CurrentPicture}/> 
                        }

                    </div>    
                : ShowCompare ?

                <div className="mt-[200px] grid grid-rows-2">
                        { ShowMessage ? 
                            <span>
                                {CompareMessage} 
                            </span>
                        : 
                            <img src={CurrentPicture}/> 
                        }
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

  