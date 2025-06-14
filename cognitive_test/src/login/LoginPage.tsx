'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import Cognito from './Cognito'
import {validate} from '../helpers/Validation'

// Login form and related functions 
export default function LoginPage(props: any) {
    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [LoginMessage, setLoginMessage] = React.useState("")
    const [LoginClass, setLoginClass] = React.useState("")
    const [LoginAttempt, setLoginAttempt] = React.useState(false)
    const [LoginSuccess, setLoginSuccess] = React.useState(false)
    const [DisabledStatus, setDisabledStatus] = React.useState(true)

    const classes = ["", "bg-gray-400 cursor-none", "bg-red-400", "bg-green-400", "bg-gray-400 rounded px-10 h-12 text-white cursor-none", "bg-blue-400 rounded px-10 h-12 text-white cursor-pointer"]

    const [UsernameMessage, setUsernameMessage] = React.useState("")
    const [UsernameClass, setUsernameClass] = React.useState(classes[0])
    const [PasswordClass, setPasswordClass] = React.useState(classes[0])
    const [MatchClass, setMatchClass] = React.useState(classes[4])

    const pw_messages = ["", "Password must contain at least 1 number.", "Password must contain at least 1 letter.", "Password must have at least 8 digits.", "Passwords don't match.", "Confirmation code must be 6 digits."]

    const [PasswordMessage, setPasswordMessage] = React.useState(pw_messages[0])


    useEffect(() => {
        LoginSuccess ? props.setLoginTimer(5) : props.setLoginTimer(null)
    }, [LoginSuccess])


    useEffect(() => {
        while(LoginSuccess && props.LoginTimer >= 0 ){
            const timeoutId = setTimeout(() => {
                props.setLoginTimer(props.LoginTimer - 1)
                props.LoginTimer < 1 ? props.setLoggedIn(true) : null
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
    }, [props.LoginTimer])


    useEffect(() => {
        if(Username != "" && Password != "" && UsernameMessage.length < 1 && PasswordMessage.length < 1){
            setDisabledStatus(false)
            setMatchClass(classes[5])
        }  
    }, [Username, Password, UsernameMessage, PasswordMessage])


    // Sets the 'Username' state variable based on the input from the text field. Uses validation from 'src/helpers/Validation.tsx'
    // @param 'text': The text input from the username field
    // @return: N/A
    function username_handler(text: any){
        props.setUsername(text)
        setUsername(text)

        if(!validate["email"](text)){
            setUsernameMessage("Username must have at least 4 digits.")
            setUsernameClass(classes[2])
        }else{
            setUsernameMessage("")
            setUsernameClass(classes[3])
        }

        console.log("USERNAME")
        console.log(text)
    }


    // Sets the 'Password' state variable based on the input from the text field. Uses validation from 'src/helpers/Validation.tsx'
    // @param 'text': The text input from the password field
    // @return 'string': A validation based message regarding correctness of input
    function password_handler(text: any){
        console.log(text)
        var message: any = ""
        props.setPassword(text)
        setPassword(text)

        if(!validate["password"](text)[1]){
            setPasswordClass(classes[2])
            message = message + "\n" + pw_messages[1]
        } 
        
        if(!validate["password"](text)[0]){
            setPasswordClass(classes[2])
            message = message + "\n" + pw_messages[2]
        }

        if(validate["password"](text)[2] < 8){
            setPasswordClass(classes[2])
            message = message + "\n" + pw_messages[3]
        }

        setPasswordMessage(message)
        if(!message.includes(pw_messages[1]) && !message.includes(pw_messages[2]) && !message.includes(pw_messages[3])){
            console.log(message)
            setPasswordClass(classes[3])
        }

        return message
    }

    // Sets the 'LoginAttempt' state variable after an attempted login
    // @param: N/A
    // @return: N/A
    function submit_handler(){
        setLoginAttempt(true) 
    }


    return(
        <div className="h-full grid grid-auto-rows">
            {!LoginSuccess ?
                <div className="row">
                    LOGIN
                </div>
            : null}

            {!LoginSuccess ? 
                <div className="mt-24 grid grid-auto-rows place-items-center gap-12">
                    <div className="grid grid-cols-2 gap-12">
                        <span>
                            Email 
                        </span>
                        <textarea className={UsernameClass} onChange={e => username_handler(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <span>
                            Password 
                        </span>
                        <textarea className={PasswordClass} onChange={e => password_handler(e.target.value)}/>
                    </div>
                    <div className="mt-12">
                        <Button className={MatchClass} onClick={e => submit_handler()} disabled={DisabledStatus}>
                            Submit
                        </Button> 
                    </div>
                </div>
            : 
                <div className="grid grid-rows-2 gap-12 place-items-center">
                    <div className="mt-12">
                        Logging in...
                    </div>
                    <div>
                    {props.LoginTimer > 0 ? 
                        <div>
                            {props.LoginTimer} 
                        </div>
                    : 
                        <div>
                            Go!
                        </div>
                    }
                </div>
                </div>
            }
            <div className={LoginClass}>
                <div>
                    {LoginMessage}
                </div>
            </div>

            <Cognito setLoginSuccess={setLoginSuccess} setLoginMessage={setLoginMessage} setLoginClass={setLoginClass} setLoginAttempt={setLoginAttempt} LoggedIn={props.LoggedIn} LoginAttempt={LoginAttempt} Username={Username} Password={Password} CookiesChecked={props.CookiesChecked}/>
        </div>
    )

}

  