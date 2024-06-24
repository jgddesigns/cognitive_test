'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


export default function DigitVigilance(props: any) {

    const [EndTest, setEndTest] = React.useState(false)
    const [TestStart, setTestStart] = React.useState(false)
    const [ShowData, setShowData] = React.useState(false)
    const [Numbers, setNumbers] = React.useState<any[]>([])
    const [SearchNumbers, setSearchNumbers] = React.useState<any[]>([]) 
    const [Points, setPoints] = React.useState(0)
    const [NumberMap, setNumberMap] = React.useState<any[]>([])  
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const number_style = ["ml-[10px]", "ml-[10px] text-green-400", "ml-[10px] text-red-400"]


    useEffect(() => {

        Numbers.length > 0 ? create_number_map() : null


    }, [Numbers])



    function create_number_map(){
        var str = ""

        for(var i=0; i<Numbers.length; i++){
            for(var j=0; j<Numbers[i].length; j++){
                str = str + "<button className='bg-opacity-0' onClick='{check_number}' id=Numbers[i][j]>" + Numbers[i][j] + "</button>  "
            }
            str = str + "<br>"
            
        }
        console.log(uuidv4())
        const number_map = Numbers.map((name:any, index:any) => {
            return {
              row: Numbers[index],
              key: uuidv4()
            }
        })

        setNumberMap(number_map)
    }


    function check_number(value: any){
        if(value.target.className == "ml-[10px]"){
            console.log(Points)
            if(SearchNumbers.includes(value.target.id)){
                console.log(value.target.id)
                value.target.className = number_style[1]
                setPoints(Points + 1)
            }else{
                value.target.className = number_style[2]
                setPoints(Points - 1)
            }
        }
    }


    function create_list(){
        var number_array = []
        var row_array: any = []
        var search_numbers = get_search_numbers()

        var key = 1000
        while(number_array.length < 50){
            while(row_array.length < 50){

                row_array.push(create_row(search_numbers))
            }

            const row_map = row_array.map((name: any, index: any) => {

                return {
                  number: row_array[index],
                  key: uuidv4()
                }
            })
            number_array.push(row_map)
            // number_array.push(row_array)
            row_array = []
        }

        setNumbers(number_array)
    }



    function create_row(numbers: any){
        var chance = Math.floor(Math.random() * 20)
        var random = Math.floor(Math.random() * 7)

        if(chance == 0 || chance == 1){
           return numbers[0][chance]
        }

        return numbers[1][random]
    }



    function get_search_numbers(){
        var search = []
        var place = null

        while(search.length < 2){
            place = Math.floor(Math.random() * 9)

            if(numbers[place]){
                search.push(numbers[place])
                numbers.splice(place, 1)
            }
        
        }

        setSearchNumbers(search)
        // setWrongNumbers(numbers)

        return [search, numbers]
    }



    function start_handler(){
        setTestStart(true)
        setShowData(true)
        create_list()
    }



    // function calculate_ratio(){
    //     return Math.round((AnswerCount/14)*100)
    // }



    // function check_answer(compare: any){

    //     var temp_arr: any = StaticArray

    //     if(temp_arr.includes(compare)){
    //         setAnswer("Answer was: Yes, picture is in original set.")          
    //     }

    //     if(!temp_arr.includes(compare)){
    //         setAnswer("Answer was: No, picture isn't in original set.")              
    //     }

    //     if(compare == ""){
    //         setAnswer("")
    //     }

    // }



  return(
    <div className="h-full">
        <div className="row">
            TEST #7: DIGIT VIGILANCE TEST
        </div>
        <div className="row mt-12 text-sky-400">
            Players are asked to find two specified numbers, which appear randomly within one-hundred rows of twenty single digits. The goal is to find as many of the numbers as possible.
        </div>
        {!EndTest ?
            !TestStart ? 
                <div className="h-[48rem] mt-24">              
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white" onClick={start_handler}>
                        Start   
                    </Button>  
                </div>
            :   ShowData ?

                    <div className="h-full grid grid-flow-rows auto-rows-max mt-48 gap-y-12">
                        <div>
                            <span>Search Numbers: {SearchNumbers[0]}, {SearchNumbers[1]}</span>
                        </div>

                        <div>
                            {NumberMap.map(result => {         
                            return (
                                <div className="max-w-[4rem]" key={result.key}>{result.row.map((result2: {
                                    key: null | undefined; number: any | string | number | 
                                      null | undefined; }) => {
                                    return(
                                        <span className="ml-[10px]" onClick={(e) => check_number(e)} id={result2.number} key={result2.key}>{result2.number}</span>
                                    )
                                })}</div>
                            )
                            })}
                        </div>

                        {/* <div ref={numberRef} className="mt-24" dangerouslySetInnerHTML={{ __html: NumberMap }}/> */}
                    </div>
            : null
        :
            <div className="grid grid-rows-3 mt-[200px] place-items-center"> 
                <span className="mt-12">
                    Test is Over
                </span> 
                <span className="mt-12">
                    {Points} were obtained in 3 minutes.
                </span>
            </div>
        }
    </div>
  )

}

  