'use client'
import { Button, Checkbox, Radio } from '@nextui-org/react';
import React, {useEffect} from 'react';



export default function ID (props: any) {

    const input_classes = ["scrollbar-hidden w-48 h-[80%] mt-4 mb-4 p-12 rounded"]

    const bg_classes: any = [{backgroundColor: "#fff", overflowY: "hidden"}, {backgroundColor: "#f87171", overflowY: "hidden"}, {backgroundColor: "#34d399", overflowY: "hidden"}]

    const button_class = [
        "bg-gray-400 rounded px-10 h-12 text-white cursor-default mt-4 disabled",
        "bg-blue-400 rounded px-10 h-12 text-white cursor-pointer mt-4"
    ];

    const errors = [
        "",
        "ID must contain only numbers",
        "ID must be 1-3 characters",
        "ID cannot lead with '0'"
    ]

    const [InputClass, setInputClass] = React.useState(input_classes[0])
    const [InputBackground, setInputBackground] = React.useState(bg_classes[0])
    const [TestButtonClass, setTestButtonClass] = React.useState<any>(button_class[0])
    const [ErrorMessage, setErrorMessage] = React.useState(errors[0])


    function id_handler(value: any){
        props.setEventID(value)
        validate(value)
    }

    function validate(value: any){
        if(!isNaN(value) && value.length <= 3 && value > 0 && value[0] != 0){
            setInputBackground(bg_classes[2])
            setTestButtonClass(button_class[1])
            setErrorMessage(errors[0])
            return true
        }

        if(value.length < 1){
            setInputBackground(bg_classes[0])
            setErrorMessage(errors[0])
        }else{
            setInputBackground(bg_classes[1])
        }
        
        isNaN(value) ? setErrorMessage(errors[1]) : null
        value.length > 3 ? setErrorMessage(errors[2]) : null
        value[0] == 0 ? setErrorMessage(errors[3]) : null
        
        setTestButtonClass(button_class[0])
        return false
    }

    function event_handler(){
        props.setEventLogin(true)
    }


    return(
        <div className="mb-12">
            <div className="grid grid-auto-rows text-black">
                <div className="grid place-items-start">
                    Enter Event ID: 
                </div>
                <div className={InputClass}>
                    <textarea className={InputClass} style={InputBackground} onChange={e => id_handler(e.target.value)}></textarea>
                </div>
                <div className="grid place-items-center grid-rows-2">
                  <button className={TestButtonClass} onClick={e => event_handler()}>Start Tests</button>
                </div>
                <div className="text-red-400 text-base italic">
                    {ErrorMessage}
                </div>
            </div>
        </div>
    )
}


