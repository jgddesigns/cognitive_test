'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import Cognito from './Cognito'

export default function DigitVigilance(props: any) {


    useEffect(() => {

    }, [])

    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [Email, setEmail] = React.useState("")
    const [Submit, setSubmit] = React.useState(false)


    function username_handler(text: any){
        setUsername(text)
        console.log("USERNAME")
        console.log(text)
    }

    function email_handler(text: any){
        setEmail(text)
        console.log("EMAIL")
        console.log(text)
    }

    function password_handler(text: any){
        setPassword(text)
        console.log("PASSWORD")
        console.log(text)
    }

    function password_validate(text: any){
        text != Password ? console.log("passwords don't match") : console.log("passwords match")
    }

    function submit_handler(){
        console.log("SUBMIT")
        // setSubmit(true)
        Email != "" && Password != "" ? setSubmit(true) : setSubmit(false)
    }
    
    return(
    <div className="h-full">
        <div className="row">
            SIGN UP
        </div>
        <div className="mt-24 grid grid-rows-2 place-items-center gap-12">
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Username 
                </span>
                <textarea onChange={e => username_handler(e.target.value)}/>
            </div>
            <div className="resize-none grid grid-cols-2 gap-12">
                <span>
                    Email 
                </span>
                <textarea onChange={e => email_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Password 
                </span>
                <textarea onChange={e => password_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Re-Enter Password 
                </span>
                <textarea onChange={e => password_validate(e.target.value)}/>
            </div>
            <div className="mt-12">
                <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer" onClick={e => submit_handler()}>
                    Submit
                </Button>     
            </div>
        </div>
        <Cognito setSubmit={setSubmit} Submit={Submit} Username={Username} Email={Email} Password={Password}/>
    </div>
    )

}

  