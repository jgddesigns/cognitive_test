'use client'
import React, {useEffect, useRef} from 'react';
import {Button} from "@nextui-org/react"
import { v4 as uuidv4 } from 'uuid';
import Login from '@/login/Login';
import Signup from '@/login/Signup';


export default function DigitVigilance(props: any) {
    const [LoginClicked, setLoginClicked] = React.useState(false)
    const [SignupClicked, setSignupClicked] = React.useState(false)
    const [Numbers, setNumbers] = React.useState<any[]>([])


    useEffect(() => {





    }, [])




    function login_handler(){
        setLoginClicked(!LoginClicked)
    }


    function signup_handler(){
        setSignupClicked(!SignupClicked)
    }

    function reset_page(){
        setLoginClicked(false)
        setSignupClicked(false)
    }




  return(
    <div className="h-full">
        <div className="row">
            WELCOME TO THE FLOURISH SCIENCE COGNITIVE TEST
        </div>
        <div className="row mt-12 text-sky-400">
            This application includes a series of assessments that measure the mental prowess of a given subject. A baseline is first established by conducting the tests under normal circumstances. Afterward, tests are conducted after various variables are introduced. Examples include following the ingestion of certain herbal supplements, or after experiencing a period of time in nature.
        </div>


        {/* {!LoginClicked && !SignupClicked ? 
            <div className="grid place-items-center gap-8 grid-cols-2 mt-24">
                <div className="cursor-pointer text-blue-400 underline" onClick={e => login_handler()}>Login</div>
                <div className="cursor-pointer text-blue-400 underline" onClick={e => signup_handler()}>Signup</div>
            </div>
        :   
            LoginClicked ?
                <div className="grid place-items-center gap-8 grid-rows-2 mt-24">
                    <div>
                        <Login/>
                    </div>
                    <div className="mt-12 cursor-pointer text-blue-400 underline" onClick={e => reset_page()}>
                        Go Back
                    </div>
                </div>
            :
                <div className="grid place-items-center gap-8 grid-rows-2 mt-24">
                    <div>
                        <Signup/>
                    </div>
                    <div className="mt-12 cursor-pointer text-blue-400 underline" onClick={e => reset_page()}>
                        Go Back
                    </div>
                </div>
        } */}
    </div>
       



  )

}

  