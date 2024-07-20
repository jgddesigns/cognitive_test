'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';


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

    return(
    <div className="h-full">
        <div className="row">
            LOGIN
        </div>


        <div className="mt-24 grid grid-rows-2 place-items-center gap-12">
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Username/Email {Username}
                </span>
                <textarea onChange={e => username_handler(e.target.value)} className="w-[200px] h-[50px]"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <span>
                    Password {Password}
                </span>
                <textarea onChange={e => password_handler(e.target.value)} className="w-[200px] h-[50px]"></textarea>
            </div>
        </div>
    </div>
    )

}

  