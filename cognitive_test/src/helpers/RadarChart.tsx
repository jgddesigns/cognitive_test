'use client'
import { Button, Checkbox, Radio } from '@nextui-org/react';
import React, {useEffect} from 'react';
import { start } from 'repl';


export default function RadarChart (props: any) {
    const [PointsOriginal, setPointsOriginal] = React.useState<any>(null)
    const [PointsAdjusted, setPointsAdjusted] = React.useState<any>(null)
    const [PercentArray, setPercentArray] = React.useState<any>([])
    const [DisplayedRadar, setDisplayedRadar] = React.useState<any>({})
    const [DisplayedStyle, setDisplayedStyle] = React.useState<any>("")
    const [TextValues, setTextValues] = React.useState<any>(["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"])
    const [PointValue, setPointValue] = React.useState<any>(5)

    const colors = ["red", "yellow", "blue", "green", "orange", "purple"]

    const [Color, setColor] = React.useState("")

    const [Values, setValues] = React.useState([[5, 10], [3, 5], [6, 10], [8, 10], [5, 7]])

                           //0     //1      //2       //3     //4       //5          //6         //7        //8          //9        
    const ending_points = [[0, 0], [25, 0], [50, 0], [75, 0], [100, 0], [87.5, 12.5], [100, 25], [100, 50], [100, 62.5], [100, 75], [100, 100], [75, 100], [50, 100], [25, 100], [0, 62.5], [0, 100], [0, 75], [0, 50], [0, 25], [12.5, 12.5]]
    //10        //11       //12       //13       //14       //15      //16     //17     //18     //19

    const points_array: any = {
        "3": [2, 10, 15],
        "4": [0, 4, 10, 15],
        "5": [2, 7, 11, 13, 17],
        "6": [1, 3, 7, 11, 13, 17],
        "7": [2, 5, 8, 11, 13, 14, 19],
        "8": [1, 3, 6, 9, 11, 13, 16, 18]
    }

    const start_value = "polygon("

    const end_value = ")"
    


    useEffect(() => {
        calculate_points(PointValue)
    }, [])


    useEffect(() => {
        PointsOriginal ? console.log("point array: " + PointsOriginal) : null
        PointsOriginal ? adjust_points([], Values) : null
    }, [PointsOriginal])


    useEffect(() => {
        PointsAdjusted ? console.log("points adjusted: " + PointsAdjusted) : null
        PointsAdjusted ? build_display() : null
    }, [PointsAdjusted])


    function build_values(values: any){
        console.log(values)
        let temp_arr: any = []
        for(let i=0; i<values.length; i++){
            temp_arr.push(ending_points[values[i]])
        }
        console.log("built array")
        console.log(temp_arr)
        setPointsOriginal(temp_arr)
        return temp_arr
    }


    function build_display(){
        let temp_arr = PointsAdjusted
        let temp_display: any = start_value
        let temp_style = ""

        console.log("temp adjusted")
        console.log(temp_arr)

        for(let i=0; i<temp_arr.length; i++){
            console.log(temp_arr[i])
            i != temp_arr.length - 1 ? temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%, " : temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%" 
        }

        temp_display = temp_display + end_value 
        temp_style = get_color() + " " + get_dimensions()

        console.log("temp display")
        console.log(temp_display)

        setDisplayedRadar(temp_display)
        setDisplayedStyle(temp_style)
    }


    function get_color(){
        return "bg-blue-400"
    }


    function get_dimensions(){
        return "w-12 h-12"
    }


    function calculate_points(points: any){
        build_values(points_array[points])
    }


    function adjust_points(points_arr: any, values: any){
        let temp_arr: any = PointsOriginal
        console.log("points array")
        console.log(points_arr)
        console.log("percent")
        console.log(values)
        for(let i = 0; i < temp_arr.length; i++){
            console.log("previous")
            console.log(get_percent(values[i]))
            console.log(temp_arr[i])
            temp_arr[i][0] != 0 ? temp_arr[i][0] = temp_arr[i][0] * get_percent(values[i]) : temp_arr[i][0] = temp_arr[i][0] + (50 - (50 * get_percent(values[i])))
            temp_arr[i][1] != 0 ? temp_arr[i][1] = temp_arr[i][1] * get_percent(values[i]) : temp_arr[i][1] = temp_arr[i][1] + (50 - (50*get_percent(values[i])))

            console.log(temp_arr[i][0])
            temp_arr[i][0] == 0 ? console.log(50 * get_percent(values[i])) : null
            console.log("new")
            console.log(temp_arr[i])
        }
        console.log("temp array")
        console.log(temp_arr)
        setPointsAdjusted(temp_arr)
    }


    function get_percent(values: any){
        return values[0]/values[1]
    }


    function get_values(values_arr: any){
        
    }


    return(
        
            <div className="w-full h-full grid grid-auto-rows grid-auto-cols place-items-center gap-96">
                <div className="grid grid-flow-col gap-48">
                    <span>
                        Text 1
                    </span>
                    <span>
                        Text 2
                    </span>
                    <span>
                        Text 3
                    </span>
                </div>
                <div className="grid grid-flow-col w-[50%] place-items-center gap-96">
                    <div>
                        Text 4
                    </div>
                    <div>
                        <div style={{clipPath: DisplayedRadar}} className={DisplayedStyle}/>
                    </div>
                    <div>
                        Text 5
                    </div>
                </div>
                <div className="grid grid-flow-col gap-48">
                    <span>
                        Text 6
                    </span>
                    <span>
                        Text 7
                    </span>
                    <span>
                        Text 8
                    </span>
                </div>
            </div>
        
    )
}


