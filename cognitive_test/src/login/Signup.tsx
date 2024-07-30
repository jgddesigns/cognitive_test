'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import Cognito from './Cognito'

export default function DigitVigilance(props: any) {


    useEffect(() => {

    }, [])

    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [PasswordMatch, setPasswordMatch] = React.useState("")
    const [Email, setEmail] = React.useState("")
    const [Submit, setSubmit] = React.useState(false)

    const classes = ["", "bg-gray-400 cursor-none", "bg-red-400", "bg-green-400"]

    const [PasswordClass, setPasswordClass] = React.useState(classes[0])
    const [MatchDisable, setMatchDisable] = React.useState(true)

    const [MatchClass, setMatchClass] = React.useState(classes[0])

    const [UsernameMessage, setUsernameMessage] = React.useState("")
    const [UsernameClass, setUsernameClass] = React.useState(classes[0])

    const [EmailMessage, setEmailMessage] = React.useState("")
    const [EmailClass, setEmailClass] = React.useState(classes[0])

    const pw_messages = ["", "Password must contain at least 1 number.", "Password must contain at least 1 letter.", "Password must have at least 8 digits.", "Passwords don't match."]

    const [PasswordMessage, setPasswordMessage] = React.useState("")

    //cognito needs it to be an email. change?
    function username_handler(text: any){
        setUsername(text)

        if(text.length < 4){
            setUsernameMessage("Username must have at least 4 digits.")
            setUsernameClass(classes[2])
        }else{
            setUsernameMessage("")
            setUsernameClass(classes[3])
        }

        console.log("USERNAME")
        console.log(text)
    }

    function email_handler(text: any){
        setEmail(text)
        validate_email(text)
        console.log("EMAIL")
        console.log(text)
    }

    function validate_email(value: any){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    
        if (!re.test(value)){
          setEmailClass(classes[2])
          setEmailMessage("Email has an invalid format. Example: email@example.com")
          return false
        }

        setEmailClass(classes[3])
        setEmailMessage("")

        return true
    }

    function password_handler(text: any){
        console.log(text)
        var message: any = ""
        var num = false
        var letter = false
        setPassword(text)

        for(var i=0; i<text.length; i++){
            if(isNaN(text[i])){
                console.log("letter")
                letter = true
            }else{
                console.log("number")
                num = true
            }    
        }

        if(!num){
            setPasswordClass(classes[2])
            setMatchDisable(true)
            message = message + pw_messages[1]
        } 
        
        if(!letter){
            setPasswordClass(classes[2])
            setMatchDisable(true)
            message = message + "\n" + pw_messages[2]
        }

        if(text.length < 8){
            setPasswordClass(classes[2])
            setMatchDisable(true)
            message = message + "\n" + pw_messages[3]
        }

        console.log(message)

        text != PasswordMatch ? message = message + "\n" + pw_messages[4] : null

        // text.length < 1 ? setPasswordMessage("") : setPasswordMessage(message)
        setPasswordMessage(message)
        if(!message.includes(pw_messages[1]) && !message.includes(pw_messages[2]) && !message.includes(pw_messages[3])){
            console.log(message)
            setMatchDisable(false)
            setPasswordClass(classes[3])
        }

        text == PasswordMatch ? setMatchClass(classes[0]) : setMatchClass(classes[2])
        
        return message
    }

    function msg_refresh(text: any){
        setPasswordMessage(text)
    }

    function password_match(text: any){
        setPasswordMatch(text)
        var message: any = ""
        message = password_handler(Password)
        if(text != Password){
            !message.includes(pw_messages[4]) ? message = message + "\n" + pw_messages[4] : null
            setPasswordMessage(message)
            setMatchClass(classes[2])
        }else{
            setPasswordMessage("")
            setMatchClass(classes[0])
            setMatchClass(classes[3])
        }

    }

    //call props.sign_up and get return to determine success message
    function submit_handler(){
        console.log("SUBMIT")
        Username != "" && Email != "" && Password != "" && UsernameMessage.length < 1 && EmailMessage.length < 1 && PasswordMessage.length < 1 ? setSubmit(true) : setSubmit(false)
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
                <textarea className={UsernameClass} onChange={e => username_handler(e.target.value)}/>
            </div>
            <div className="resize-none grid grid-cols-2 gap-12">
                <span>
                    Email 
                </span>
                <textarea className={EmailClass} onChange={e => email_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Password 
                </span>
                <textarea className={PasswordClass} onChange={e => password_handler(e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Re-Enter Password 
                </span>
                <textarea className={MatchClass}  onChange={e => password_match(e.target.value)} disabled={MatchDisable}/>
            </div>
            <div className="mt-12">
                <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer" onClick={e => submit_handler()}>
                    Submit
                </Button>     
            </div>
            {UsernameMessage.length > 0 ?
                <div className="text-red-400">
                    {UsernameMessage}
                </div>
            : null}
            {EmailMessage.length > 0 ?
                <div className="text-red-400">
                    {EmailMessage}
                </div>
            : null}
            {PasswordMessage.length > 0 ?
                <div className="text-red-400">
                    {PasswordMessage}
                </div>
            : null}
        </div>
        <Cognito setSubmit={setSubmit} Submit={Submit} Username={Username} Email={Email} Password={Password}/>
    </div>
    )

}

  