'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import Cognito from './Cognito'


export default function DigitVigilance(props: any) {


    useEffect(() => {

    }, [])

    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")


    function username_handler(text: any){
        setUsername(text)
    }

    function password_handler(text: any){
        setPassword(text)
    }

    function submit_handler(){
        
    }

    return(
    <div className="h-full">
        <div className="row">
            LOGIN
        </div>
        <div className="mt-24 grid grid-auto-rows place-items-center gap-12">
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Username/Email 
                </span>
                <textarea onChange={e => username_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Password 
                </span>
                <textarea onChange={e => password_handler(e.target.value)}/>
            </div>
            <div className="mt-12" onClick={e => submit_handler()}>
                <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer">
                    Submit
                </Button> 
            </div>
        </div>
    </div>
    )

}

  