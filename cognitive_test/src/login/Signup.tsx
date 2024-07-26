'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


export default function DigitVigilance(props: any) {


    useEffect(() => {

    }, [])

    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [Email, setEmail] = React.useState("")


    function username_handler(text: any){
        setUsername(text)
    }

    function email_handler(text: any){
        setEmail(text)
    }

    function password_handler(text: any){
        setPassword(text)
    }

    function password_handler2(text: any){
        text != Password ? console.log("passwords don't match") : console.log("passwords match")
    }

    function submit_handler(){

    }
    
    return(
    <div className="h-full">
        <div className="row">
            SIGN UP
        </div>


        <div className="mt-24 grid grid-rows-2 place-items-center gap-12">
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Username {Username}
                </span>
                <textarea onChange={e => username_handler(e.target.value)}/>
            </div>
            <div className="resize-none grid grid-cols-2 gap-12">
                <span>
                    Email {Email}
                </span>
                <textarea onChange={e => email_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Password {Password}
                </span>
                <textarea onChange={e => password_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Re-Enter Password {Password}
                </span>
                <textarea onChange={e => password_handler2(e.target.value)}/>
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

  