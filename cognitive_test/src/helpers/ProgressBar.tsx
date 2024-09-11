'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../helpers/shapes.css"

export default function ProgressBar (props: any) {

    const [CircleArray, setCircleArray] = React.useState([])
    const [CircleMap, setCircleMap] = React.useState<any>([])


    useEffect(() => {
        CircleArray.length < 1 ? display_circles() : null  
    }, [CircleArray])

    useEffect(() => {
        props.ShowCirclesGreen ? show_circles(true) : null  
    }, [props.ShowCirclesGreen])

    useEffect(() => {
        props.ShowCirclesRed ? show_circles(false) : null  
    }, [props.ShowCirclesRed])



    function display_circles(){
        var i = 0
        while(i < props.LengthValue){
            show_circles(false, true)
            i++
        }
        setCircleArray    
    }


    function create_circle(condition: any, start: any = null){
        console.log(condition)
        console.log(start)
        var class_txt: any = null
        start ? class_txt = "circle bg-gray-400 w-4 h-4" : condition ? class_txt = "circle bg-green-400 w-4 h-4" : class_txt = "circle bg-red-400 w-4 h-4"
        console.log(class_txt)
        return (
            <div className="w-8">
                <div className={class_txt}>
                </div>
            </div>
        )
    }


    function show_circles(condition: any, start: any = null){
        var shown_arr: any = CircleArray 
        console.log(Math.floor(props.CurrentPosition/2))
        !start ? shown_arr[props.LengthValue - Math.ceil(props.CurrentPosition/2) - 1] = create_circle(condition) : shown_arr.push(create_circle(condition, start))
        const circle_map = shown_arr.map((name:any, index:any) => {
            return {
              obj: shown_arr[index],
              key: uuidv4()
            }
        })
        setCircleArray(shown_arr)
        setCircleMap(circle_map)
        props.setShowCirclesGreen(false)
        props.setShowCirclesRed(false)
    }





  return(
    <div>
        <div className="mt-[200px] sticky grid justify-center" style={{ gridTemplateColumns: 'repeat(20, 30px)' }}>
            {CircleMap.map((result: { key: React.Key | null | undefined; obj: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) =>  {         
                    return(
                        <div key={result.key}>
                            {result.obj}
                        </div>
                    )
                })
            }
        </div> 
    </div>
  )
}


