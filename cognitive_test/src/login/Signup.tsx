'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import Cognito from './Cognito'
import Connect from '../database/Connect'
import {validate} from '../helpers/Validation'


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

    const classes = ["", "bg-gray-400 cursor-none", "bg-red-400", "bg-green-400", "bg-gray-400 rounded px-10 h-12 text-white cursor-none", "bg-blue-400 rounded px-10 h-12 text-white cursor-pointer"]

    const [PasswordClass, setPasswordClass] = React.useState(classes[0])
    const [MatchDisable, setMatchDisable] = React.useState(true)

    const [MatchClass, setMatchClass] = React.useState(classes[0])
    const [SubmitClass, setSubmitClass] = React.useState(classes[4])
    const [SubmitDisable, setSubmitDisable] = React.useState(true)
    const [SubmitConfirmClass, setSubmitConfirmClass] = React.useState(classes[4])
    const [ConfirmDisable, setConfirmDisable] = React.useState(true)

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
                    setConfirmSuccess(false)
                    props.setLoggedIn(true)
                } 
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
    }, [SignupSuccess, SignupTimer, ConfirmSuccess])


    useEffect(() => {
        if(Username != "" && Name != "" && Password != "" && UsernameMessage.length < 1 && NameMessage.length < 1 && PasswordMessage.length < 1){
            setSubmitClass(classes[5])
            setSubmitDisable(false)
        }else{
            setSubmitClass(classes[4])
            setSubmitDisable(true)
        }
    }, [Username, Name, Password, UsernameMessage, NameMessage, EmailMessage, PasswordMessage])


    useEffect(() => {
        if(ConfirmCode.length > 0){
            if(ConfirmCode.length < 6){
                setConfirmClass(classes[2])
                setSubmitConfirmClass(classes[4])
                setConfirmDisable(true)
            }else{
                setConfirmClass(classes[3])
                setSubmitConfirmClass(classes[5])
                setConfirmDisable(false)
            }
        }
    }, [ConfirmCode])


    // When a username is changed, this function handles the text input
    // @param 'text': The text in the input field
    // @return: N/A
    function username_handler(text: any){
        props.setUsername(text)
        setUsername(text)

        if(!validate["username"](text)){
            setUsernameMessage("Username must have at least 4 digits.")
            setUsernameClass(classes[2])
        }else{
            setUsernameMessage("")
            setUsernameClass(classes[3])
        }

        console.log("USERNAME")
        console.log(text)
    }


    // When a name is changed, this function handles the text input
    // @param 'text': The text in the input field
    // @return: N/A
    function name_handler(text: any){
        setName(text)

        if(!validate["name"](text)){
            setNameMessage("Name must have at least 2 digits.")
            setNameClass(classes[2])
        }else{
            setNameMessage("")
            setNameClass(classes[3])
        }

        console.log("NAME")
        console.log(text)
    }


    // When a email is changed, this function handles the text input
    // @param 'text': The text in the input field
    // @return: N/A
    function email_handler(text: any){
        setEmail(text)
        if(!validate["email"](text)){
            setEmailClass(classes[2])
            setEmailMessage("Email has an invalid format. Example: email@example.com")
        }else{
            setEmailClass(classes[3])
            setEmailMessage("")
        }

        console.log("EMAIL")
        console.log(text)
    }


    // When a password is changed, this function handles the text input
    // @param 'text': The text in the input field
    // @return: N/A
    function password_handler(text: any){
        console.log(text)
        var message: any = ""
        props.setPassword(text)
        setPassword(text)

        if(!validate["password"](text)[0]){
            setPasswordClass(classes[2])
            setMatchDisable(true)
            message = message + "\n" + pw_messages[1]
        } 
        
        if(!validate["password"](text)[1]){
            setPasswordClass(classes[2])
            setMatchDisable(true)
            message = message + "\n" + pw_messages[2]
        }

        if(validate["password"](text)[2] < 8){
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

    // Checks the confirm code entry and sets the displayed message and style accordingly
    // @param 'text': The text from the confirm field
    // @return: N/A
    function confirm_handler(text: any){
        setConfirmCode(text)

        if(!validate["confirm"](text)){
            setConfirmMessage(pw_messages[5])
            setConfirmClass(classes[2])
        }else{
            setConfirmMessage(pw_messages[0])
            setConfirmClass(classes[3])
        }

        console.log("CONFIRM CODE")
        console.log(text)
    }

    // Checks the validation for the confirm password field and sets the displayed message and style accordingly.
    // @param 'text': The text from the confirm field
    // @return: N/A
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

    // Once pressed, sets the Submit state variable to true
    // @param: N/A
    // @return: N/A
    function submit_handler(){
        console.log("SUBMIT")
        setSubmit(true) 
    }

    // Once the confirm code button has been pressed, sets the related state variable to true and starts the signup timer transition. 
    function submit_confirm(){
        console.log("CONFIRM")
        setCheckConfirm(true) 
        setSignupTimer(5) 
    }

    
    return(
        <div className="h-full grid grid-auto-rows">
            <div className="row left-0">
                SIGN UP
            </div>
            <div className="row">
                {!SignupSuccess ? 
                    <div className="mt-24 grid grid-rows-2 place-items-center gap-12">
                        <div className="grid grid-cols-2 gap-12">
                            <span>
                                Email 
                            </span>
                            <textarea className={UsernameClass} onChange={e => username_handler(e.target.value)}/>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                            <span>
                                Name 
                            </span>
                            <textarea className={NameClass} onChange={e => name_handler(e.target.value)}/>
                        </div>
                        {/* <div className="resize-none grid grid-cols-2 gap-12">
                            <span>
                                Email 
                            </span>
                            <textarea className={EmailClass} onChange={e => email_handler(e.target.value)}/>
                        </div> */}
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
                            <textarea className={MatchClass} onChange={e => password_match(e.target.value)} disabled={MatchDisable}/>
                        </div>
                        <div className="mt-12">
                            <Button className={SubmitClass} disabled={SubmitDisable} onClick={e => submit_handler()}>
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
                        {/* {EmailMessage.length > 0 ?
                            <div className="text-red-400">
                                {EmailMessage}
                            </div>
                        : null} */}
                        {PasswordMessage.length > 0 ?
                            <div className="text-red-400" style={{ whiteSpace: 'pre-wrap' }}>
                                {PasswordMessage}
                            </div>
                        : null}
                    </div>
                :
                    <div>
                        {!ShowConfirm ? 
                            <div className="mt-24 grid grid-rows-2 gap-12 place-items-center">
                                <div className="mt-12">
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
                                            <Button className={SubmitConfirmClass} disabled={ConfirmDisable} onClick={e => submit_confirm()}>
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
                                        <div className="mt-12">
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
                                        <div className="text-green-400 text-base">
                                            Logging in...
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>

            <Connect setSubmit={setSubmit} Submit={Submit} setLoggedIn={props.setLoggedIn} setSignupSuccess={setSignupSuccess} setConfirmSuccess={setConfirmSuccess} ConfirmSuccess={ConfirmSuccess} setCheckConfirm={setCheckConfirm} CheckConfirm={CheckConfirm} ConfirmCode={ConfirmCode} Username={Username} Name={Name} Email={Email} Password={Password}/>

        </div>
    )

}

  