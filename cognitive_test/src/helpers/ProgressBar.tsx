'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../helpers/shapes.css"

// Creates the display for the progress bar
// Needs props Restart, setRestart, LengthValue, CurrentPosition, ShowCirclesGreen, setShowCirclesGreen, ShowCirclesRed, setShowCirclesRed
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


    // Clears the circle array and map
    // @param: N/A
    // @return: N/A
    function clear_circles(){
        setCircleArray([])
        setCircleMap([])
    }

    // Starts the process to display the progress bar circles. First the circles are cleared, then the 'show_circles' function is called based on the needed length (LengthValue prop). 
    // @param: N/A
    // @return: N/A
    function display_circles(){
        props.setRestart(false)
        clear_circles()
        var i = 0
        while(i < props.LengthValue){
            show_circles(false, true)
            i++
        }  
    }

    // Creates a circle to be added to the array. Called whenever a change is made (set to gray, red, green etc...). Used in combination with 'show_circles' function.
    // @param 'condition': True if circle is to be green. False if it is to be red.
    // @return HTML Object: The div containing one circle
    function create_circle(condition: any, start: any = null){
        var class_txt: any = null
        start ? class_txt = "progress_gray" : condition ? class_txt = "progress_green" : class_txt = "progress_red"
        return (
            <div className="w-8">
                <div className={class_txt}>
                </div>
            </div>
        )
    }


    // Creates all needed circles and adds them to the circle map. 
    // @param 'condition': True if the circle is to be green, false if red
    // @param 'start': Only set if it is the initial display, null if otherwise
    // @return: N/A 
    function show_circles(condition: any, start: any = null){
        var shown_arr: any = CircleArray 
        !start ? shown_arr[Math.abs(props.LengthValue - props.CurrentPosition) - 1] = create_circle(condition) : shown_arr.push(create_circle(condition, start))
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
        <div className="mt-[150px] grid place-items-center" style={{ gridTemplateColumns: 'repeat(' + props.LengthValue + ', 30px)' }}>
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


