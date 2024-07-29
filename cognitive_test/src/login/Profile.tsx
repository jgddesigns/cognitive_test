'use client'
import React, {useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Profile(props: any) {
    const classes = ["cursor-not-allowed"]
    const [Username, setUsername] = React.useState(get_username())
    const [UsernameClass, setUsernameClass] = React.useState(classes[0])
    const [Email, setEmail] = React.useState(get_email())
    const [EmailClass, setEmailClass] = React.useState(classes[0])
    const [Password, setPassword] = React.useState(get_password())
    const [PasswordClass, setPasswordClass] = React.useState("w-[250px] h-[50px] p-4 rounded")
    const [PasswordType, setPasswordType] = React.useState("password")
    const [Tests, setTests] = React.useState<any>(null)
    const [TestMap, setTestMap] = React.useState<any>(null)
    const [TestsTaken, setTestsTaken] = React.useState(get_tests_taken())
    const [RepeatedAmount, setRepeatedAmount] = React.useState(get_repeated_amount())
    const [TestsRepeated, setTestsRepeated] = React.useState(get_repeated_tests())

    const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false) 
    const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false) 
    const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false)  
    const [ShowMotorFunction, setShowMotorFunction] = React.useState(false)
    const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false)
    const [ShowPictureRecognition, setShowPictureRecognition] = React.useState(false)
    const [ShowReactionTime, setShowReactionTime] = React.useState(false)
    const [ShowVerbalLearning, setShowVerbalLearning] = React.useState(false)
    const [ShowWordRecogntion, setShowWordRecognition] = React.useState(false)
    const [ShowWorkingMemory, setShowWorkingMemory] = React.useState(false)

    const tests: any = [[ShowChoiceReaction, setShowChoiceReaction], [ShowDigitVigilance, setShowDigitVigilance], [ShowMemoryScanning, setShowMemoryScanning],  [ShowMotorFunction, setShowMotorFunction], [ShowNumberVigilance, setShowNumberVigilance], [ShowPictureRecognition, setShowPictureRecognition], [ShowReactionTime, setShowReactionTime], [ShowVerbalLearning, setShowVerbalLearning], [ShowWordRecogntion, setShowWordRecognition], [ShowWorkingMemory, setShowWorkingMemory]]

    //db retrieval data
    const data = null

    useEffect(() => {

    }, [])


    function username_handler(value: any){

    }

    function email_handler(value: any){

    }

    function password_handler(value: any){

    }

    function change_username(){

    }

    function change_email(){

    }

    function change_password(){

    }

    function test_results_handler(test: any){
        tests[test][1](!tests[test][0])
    }

    function create_test_map(){
        const test_map = Tests.map((name:any, index:any) => {
            return {
              test: Tests[index],
              key: uuidv4()
            }
        })

        setTestMap(test_map)
    }

    function get_username(){
        return "Username"
    }

    function get_email(){
        return "username@example.com"
    }

    function get_password(){
        return "password"
    }

    function get_tests_taken(){
        return 6
    }

    function get_repeated_amount(){
        return 0
    }

    function get_repeated_tests(){
        return "(" + RepeatedAmount + " repeated)"
    }

    function get_completion(){
        return Math.round(TestsTaken/10 * 100) + "%"
    }

    function get_time(){
        return "34:29"
    }

    function get_best_score(test: any){
        //return data["scores"][test]
        return test
    }

    return(
        <div className="h-full">
            <div className="row">
                USER PROFILE
            </div>

            <div className="mt-24 grid grid-auto-rows place-items-center gap-12">
                
                <div className="grid grid-cols-2">
                    <div>
                        Username
                    </div>
                    <textarea onChange={e => username_handler(e.target.value)} value={Username} className="disabled:cursor-not-allowed" disabled/>
                </div>

                <div className="grid grid-cols-2">
                    <div>
                        Email 
                    </div>
                    <textarea onChange={e => email_handler(e.target.value)} value={Email} className={EmailClass} disabled/>
                </div>

                <div className="grid grid-cols-2">
                    <div>
                        Password 
                    </div>
                        {/* adjust to input with type 'password' (style error exists)*/}
                    <input type="password" className={PasswordClass} value={Password} onChange={e => password_handler(e.target.value)} disabled/>
                </div>

                <div className="mt-24 grid grid-auto-rows gap-12 w-[50%]">
                    <div className="underline">
                        STATISTICS
                    </div> 
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            Tests Taken: 
                        </div> 
                        <div className="grid grid-cols-2">
                            <div>
                                {TestsTaken}
                            </div> 
                            <div>
                                {TestsRepeated} 
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            Completed: 
                        </div> 
                        <div className="grid grid-cols-2">
                            {get_completion()}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            Total Testing Time: 
                        </div> 
                        <div className="grid grid-cols-2">
                            {get_time()}
                        </div>
                    </div>
                    <div className="grid grid-auto-rows">
                        <div>
                            Tests: 
                        </div> 
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(0)}>
                                    Choice Reaction Time
                                </div>
                                {ShowChoiceReaction?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(0)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(1)}>
                                    Digit Vigilance
                                </div>
                                {ShowDigitVigilance?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(1)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(2)}>
                                    Memory Scanning
                                </div>
                                {ShowMemoryScanning?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(2)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(3)}>
                                    Motor Function
                                </div>
                                {ShowMotorFunction?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(3)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(4)}>
                                    Number Vigilance
                                </div>
                                {ShowNumberVigilance?
                                    <div className="grid grid-auto-rows gap-8 w-48 mt-4 mb-12 bg-blue-400">
                                        {/* <div className="ml-8 p-8"> */}
                                            <span className="ml-12 p-[10px]">
                                                Test data
                                            </span>
                                        {/* </div> */}
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(4)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(5)}>
                                    Picture Recognition
                                </div>
                                {ShowPictureRecognition?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(5)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(6)}>
                                    Visual Reaction Time
                                </div>
                                {ShowReactionTime?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(6)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(7)}>
                                    Verbal Learning
                                </div>
                                {ShowVerbalLearning?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(7)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(8)}>
                                    <span className="text-blue-600">Word Recognition</span>
                                </div>
                                {ShowWordRecogntion?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(8)}
                            </div>
                        </div>
                        <div className="grid ml-12 mt-8 grid-cols-2">
                            <div className="grid grid-auto-rows">
                                <div className="text-blue-600 cursor-pointer" onClick={e => test_results_handler(9)}>
                                    Working Memory
                                </div>
                                {ShowWorkingMemory?
                                    <div>
                                    </div>
                                : null}
                            </div>
                            <div>
                                Best Score: {get_best_score(9)}
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    {/* {TestMap.map(result => {         
                    return (
                        <div className="max-w-[4rem]" key={result.key}>{result.row.map((result2: {
                            key: null | undefined; number: any | string | number | 
                                null | undefined; }) => {
                            return(
                                <div className="ml-[10px] cursor-pointer" onClick={(e) => check_number(e)} id={result2.number} key={result2.key}>
                                    {result2.number}
                                </div>
                            )
                        })}</div>
                    )
                    })} */}
                </div>
            </div>
                     
        </div>
    )

}

  