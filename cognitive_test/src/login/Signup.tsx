'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import Cognito from './Cognito'
import Connect from '../database/Connect'


export default function Signup(props: any) {
    const [Username, setUsername] = React.useState("")
    const [Name, setName] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [PasswordMatch, setPasswordMatch] = React.useState("")
    const [Email, setEmail] = React.useState("")
    const [ConfirmCode, setConfirmCode] = React.useState("")
    const [Submit, setSubmit] = React.useState(false)
    const [SignupSuccess, setSignupSuccess] = React.useState(false)
    const [ShowConfirm, setShowConfirm] = React.useState(false) 
    const [ConfirmSuccess, setConfirmSuccess] = React.useState(false)
    const [SignupTimer, setSignupTimer] = React.useState<any>(5)

    const classes = ["", "bg-gray-400 cursor-none", "bg-red-400", "bg-green-400"]

    const [PasswordClass, setPasswordClass] = React.useState(classes[0])
    const [MatchDisable, setMatchDisable] = React.useState(true)

    const [MatchClass, setMatchClass] = React.useState(classes[0])

    const [UsernameMessage, setUsernameMessage] = React.useState("")
    const [UsernameClass, setUsernameClass] = React.useState(classes[0])

    const [NameMessage, setNameMessage] = React.useState("")
    const [NameClass, setNameClass] = React.useState(classes[0])

    const [EmailMessage, setEmailMessage] = React.useState("")
    const [EmailClass, setEmailClass] = React.useState(classes[0])

    const [ConfirmMessage, setConfirmMessage] = React.useState("")
    const [ConfirmClass, setConfirmClass] = React.useState(classes[0])

    const [CheckConfirm, setCheckConfirm] = React.useState(false)

    const pw_messages = ["", "Password must contain at least 1 number.", "Password must contain at least 1 letter.", "Password must have at least 8 digits.", "Passwords don't match.", "Confirmation code must be 6 digits."]

    const [PasswordMessage, setPasswordMessage] = React.useState("")

    useEffect(() => {
        while(SignupSuccess && !ConfirmSuccess && SignupTimer >= 0 ){
            const timeoutId = setTimeout(() => {
                setSignupTimer(SignupTimer - 1)
                SignupTimer <= 0 ? setShowConfirm(true) : null
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
        while(ConfirmSuccess && SignupTimer >= 0 ){
            const timeoutId = setTimeout(() => {
                setSignupTimer(SignupTimer - 1)
                if(SignupTimer <= 0){
                    console.log("asdf")
                    setConfirmSuccess(false)
                    //needs to actually login
                    props.toggle_login(true)
                    props.link_handler(4)
                } 
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
    }, [SignupSuccess, SignupTimer, ConfirmSuccess])

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

    function name_handler(text: any){
        setName(text)

        if(text.length < 0){
            setNameMessage("Name must have at least 1 digits.")
            setNameClass(classes[2])
        }else{
            setNameMessage("")
            setNameClass(classes[3])
        }

        console.log("NAME")
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

        setPasswordMessage(message)
        if(!message.includes(pw_messages[1]) && !message.includes(pw_messages[2]) && !message.includes(pw_messages[3])){
            console.log(message)
            setMatchDisable(false)
            setPasswordClass(classes[3])
        }

        text == PasswordMatch ? setMatchClass(classes[0]) : setMatchClass(classes[2])
        
        return message
    }

    function confirm_handler(text: any){
        setConfirmCode(text)

        if(text.length != 6){
            setConfirmMessage(pw_messages[5])
            setConfirmClass(classes[2])
        }else{
            setConfirmMessage(pw_messages[0])
            setConfirmClass(classes[3])
        }

        console.log("CONFIRM CODE")
        console.log(text)
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
        Username != "" && Name != "" && Email != "" && Password != "" && UsernameMessage.length < 1 && NameMessage.length < 1 && EmailMessage.length < 1 && PasswordMessage.length < 1 ? setSubmit(true) : setSubmit(false)
    }

    function submit_confirm(){
        console.log("CONFIRM")
        ConfirmCode != "" && ConfirmMessage.length < 1 ? setCheckConfirm(true) : null
        ConfirmCode != "" && ConfirmMessage.length < 1 ? setSignupTimer(5) : null
    }


    
    return(
    <div className="h-full">
        <div className="row">
            SIGN UP
        </div>
        {!SignupSuccess ? 
            <div className="mt-24 grid grid-rows-2 place-items-center gap-12">
                <div className="grid grid-cols-2 gap-12">
                    <span>
                        Username 
                    </span>
                    <textarea className={UsernameClass} onChange={e => username_handler(e.target.value)}/>
                </div>
                <div className="grid grid-cols-2 gap-12">
                    <span>
                        Name 
                    </span>
                    <textarea className={NameClass} onChange={e => name_handler(e.target.value)}/>
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
                {NameMessage.length > 0 ?
                    <div className="text-red-400">
                        {NameMessage}
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
        :
            <div>
                {!ShowConfirm ? 
                    <div className="mt-24 grid grid-rows-2 gap-12 place-items-center">
                        <div className="mt-48">
                            Awaiting Confirmation...
                        </div>
                        <div>
                            {SignupTimer > 0 ? 
                                <div>
                                    {SignupTimer} 
                                </div>
                            : 
                                <div>
                                    Go!
                                </div>
                            }
                        </div>
                    </div>
                :   <div>
                        {!ConfirmSuccess ? 
                            <div className="mt-24 grid grid-auto-rows place-items-center gap-12">
                                <div className="grid grid-cols-2 gap-12">
                                    <span>
                                        Confirmation Code
                                    </span>
                                    <textarea className={ConfirmClass} onChange={e => confirm_handler(e.target.value)}/>
                                </div>
                                <div className="italic text-sm mt-12">
                                    <span>
                                        Check your inbox for the verification credentials
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer" onClick={e => submit_confirm()}>
                                        Confirm
                                    </Button>     
                                </div>
                                {ConfirmMessage.length > 0 ?
                                    <div className="text-red-400">
                                        {ConfirmMessage}
                                    </div>
                                : null}
                            </div>
                        : 
                            <div className="mt-24 grid grid-rows-2 gap-12 place-items-center">
                                <div className="mt-48">
                                    Confirmation Success!
                                </div>
                                <div>
                                    {SignupTimer > 0 ? 
                                        <div>
                                            {SignupTimer} 
                                        </div>
                                    : 
                                        <div>
                                            Go!
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }

                {/* {ConfirmSuccess ? 
                    <div className="mt-24 grid grid-rows-2 gap-12 place-items-center">
                        <div className="mt-48">
                            Awaiting Confirmation...
                        </div>
                        <div>
                            {SignupTimer > 0 ? 
                                <div>
                                    {SignupTimer} 
                                </div>
                            : 
                                <div>
                                    Go!
                                </div>
                            }
                        </div>
                    </div>
                : null} */}

            </div>

        }

        <Connect setSubmit={setSubmit} Submit={Submit} setSignupSuccess={setSignupSuccess} setConfirmSuccess={setConfirmSuccess} ConfirmSuccess={ConfirmSuccess} CheckConfirm={CheckConfirm} ConfirmCode={ConfirmCode} Username={Username} Name={Name} Email={Email} Password={Password}/>
    </div>
    )

}

  