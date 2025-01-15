'use client'
import { Button, Checkbox, Radio } from '@nextui-org/react';
import React, {useEffect} from 'react';



export default function HerbSelector (props: any) {

    const [SelectionClasses, setSelectionClasses] = React.useState([false, false, false, false, false, false])


    const herbs = ["Herb1", "Herb2", "Herb3", "Herb4", "Herb5", "Herb6",]

    const classes = [false, true]

    
    useEffect(() => {
       
    }, [])


    // 
    // @param: N/A
    // @return: N/A
    function variable_handler(selection: any){
        console.log("previous herb: " + props.Herb)
        var temp_arr: any = SelectionClasses
        for(let i=0; i<herbs.length; i++){
            if(selection.id == i){
                props.setHerb(herbs[i])
                console.log("new herb: " + herbs[i])
                temp_arr[i] = classes[1]
            }else{
                temp_arr[i] = classes[0]
            }
        }
        console.log(temp_arr)
        
        setSelectionClasses(temp_arr)
    }

    function submit_handler(){
        props.setShowSelector(false)
    }

    return(
        <div className="grid grid-auto-rows place-items-center bg-gray-400 p-12">
            <div className="grid grid-auto-rows ml-[50%] text-white">
                <span>
                    Choose a pre-test variable for {props.TestTitle}: 
                </span>
                <div className="grid grid-auto-rows place-items-center mt-24 ml-12 gap-4">
                    <div className="grid grid-cols-2 gap-4">       
                        <span>
                            Herb 1
                        </span>                   
                        <div>
                            <input type="radio" id="0" className="w-[12px] h-[12px] appearance-none" checked={SelectionClasses[0]} onChange={e => variable_handler(e.target)}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span>  
                            Herb 2
                        </span>
                        <input type="radio" id="1" className="h-4" checked={SelectionClasses[1]} onChange={e => variable_handler(e.target)}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span>
                            Herb 3
                        </span>
                        <input type="radio" id="2" className="h-4" checked={SelectionClasses[2]} onChange={e => variable_handler(e.target)}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span>
                            Herb 4
                        </span>
                        <input type="radio" id="3" className="h-4" checked={SelectionClasses[3]} onChange={e => variable_handler(e.target)}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span>
                            Herb 5
                        </span>
                        <input type="radio" id="4" className="h-4" checked={SelectionClasses[4]} onChange={e => variable_handler(e.target)}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span>
                            Herb 6
                        </span>
                        <input type="radio" id="5" className="h-4" checked={SelectionClasses[5]} onChange={e => variable_handler(e.target)}/>
                    </div>
                    <div className="mt-12 ml-[45%] gap-4">
                        <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer" onClick={e => submit_handler()}>
                            Submit
                        </Button>
                    </div>            
                </div>
            </div>
        </div>
    )
}


