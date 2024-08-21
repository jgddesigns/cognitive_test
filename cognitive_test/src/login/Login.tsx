'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import Cognito from './Cognito'


export default function Login(props: any) {
    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const [LoginMessage, setLoginMessage] = React.useState("")
    const [LoginClass, setLoginClass] = React.useState("")
    const [LoginTimer, setLoginTimer] = React.useState<any>(null)
    const [LoginAttempt, setLoginAttempt] = React.useState(false)
    const [LoginSuccess, setLoginSuccess] = React.useState(false)



    useEffect(() => {
        LoginSuccess ? setLoginTimer(5) : setLoginTimer(null)
    }, [LoginSuccess])

    useEffect(() => {
        while(LoginSuccess && LoginTimer >= 0 ){
            const timeoutId = setTimeout(() => {
                setLoginTimer(LoginTimer - 1)
                LoginTimer < 1 ? props.setLoggedIn(true) : null
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
    }, [LoginTimer])

    function username_handler(text: any){
        setUsername(text)
        props.setUsername(text)
    }

    function password_handler(text: any){
        setPassword(text)
        props.setPassword(text)
    }

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
                <div className="mt-12">
                    <Button className="bg-blue-400 rounded px-10 h-12 text-white cursor-pointer" onClick={e => submit_handler()}>
                        Submit
                    </Button> 
                </div>
            </div>
        : 
            <div className="grid grid-rows-2 gap-12 place-items-center">
                <div className="mt-48">
                    Logging in...
                </div>
                <div>
                  {LoginTimer > 0 ? 
                      <div>
                          {LoginTimer} 
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

        <Cognito setLoginSuccess={setLoginSuccess} setLoginMessage={setLoginMessage} setLoginClass={setLoginClass} setLoginAttempt={setLoginAttempt} LoginAttempt={LoginAttempt} Username={Username} Password={Password}/>
    </div>
    )

}

  