
'use client'
import React, {useEffect, useRef} from 'react';
import Cognito from '@/login/Cognito';
import { Prosto_One } from 'next/font/google';

export default function MongoDB(props: any) {
    const [InsertSuccess, setInsertSuccess] = React.useState(false)
    const [RetrieveAllSuccess, setRetrieveAllSuccess] = React.useState(false)
    const [RetrieveOneSuccess, setRetrieveOneSuccess] = React.useState(false)


    const user_table = "users"
     
    const test_table = "test_results"


    useEffect(() => {
        // test()
        if(InsertSuccess){
            console.log("insert success. resetting variables.")
            // props.setSubmit(false)
            props.setTestName(null)
            props.setTable(null)
            props.setHerb(null)
            props.setUsernameVerified(false)
            setInsertSuccess(false)
        }
    }, [InsertSuccess, RetrieveOneSuccess, RetrieveAllSuccess])


    // insert for user signup
    useEffect(() => {
        props.UsernameCheck && !props.UsernameVerified ? username_check() : null
    }, [props.UsernameCheck, props.UsernameVerified])

    useEffect(() => {
        console.log(props.Submit)
        console.log(props.UsernameVerified)
        props.UsernameVerified && props.Submit ? props.setUserInserted(true) : null 
    }, [props.Submit, props.UsernameVerified])

    useEffect(() => {
        props.TriggerInsert ? handle_insert() : null
    }, [props.TriggerInsert])
    

    //insert for test results table
    useEffect(() => {
        props.Table && props.TestName ? handle_insert() : null
    }, [props.Table])
    

    useEffect(() => {
        if(props.Retrieve){
          console.log("retrieve in mongodb")
          retrieve_handler()
        }
      }, [props.Retrieve])



    async function test(){
        console.log(await retrieve_specific("attempt_num", test_table, "", [null, 500]))
    }


    async function username_check(){
        props.setUsernameCheck(false)
        props.setUsernameVerified(false)
        console.log("username check: " + props.Username)
        let name: any = await retrieve_specific("username", user_table, props.Username, null)
        console.log(name)
        name.length > 0 ? props.setUsernameMatch(true) : props.setUsernameVerified(true)
    }


    async function handle_insert(){
        console.log("starting insert to: " + props.Table)

        var data: any = null
        var test_results = null
        var user_data = null
        try{
            test_results = {
                user_id: props.Username,  
                attempt_num: await increment_attempt(props.Table, props.TestName),
                test_name: props.TestName,
                herb: props.Herb,
                attention: props.Data[0],
                decisiveness: props.Data[1],
                reaction: props.Data[2],
                timestamp: get_timestamp()
            } 
        }catch{
            test_results = null
        }
        try{
            user_data = {
                profile_data: null, 
                username: props.Username,
                // email_address: props.Email,
                name: props.Name,
                tests_completed: await retrieve_all("tests_table"),
                total_test_time: '0',
                variables_used:  null,
                mind_type: null,
                timestamp: get_timestamp()
            }
        }catch{
            user_data = null
        }
        console.log(props.Table)
        props.Table == test_table ? data = test_results : data = 
        user_data 
        console.log("data to insert:")
        console.log(data)
        data ? insert(data, props.Table) : console.log("Error building insert test data.")
        props.setUsernameVerified(false)
        props.setTriggerInsert(false)
    }


    async function insert(data: any = null, table: any = null){
        console.log("Inserting to MongoDB")
        const response = await fetch('../api/mongo_db/insert?data=' + JSON.stringify(data) + "&table=" + table, { method: 'GET' })
        const insert = await response.json().then((data) => 
            console.log("Inserted data: " + data))
        response.status === 200 ? setInsertSuccess(true) : setInsertSuccess(false)
    }

    
    // if condition exists (greater, lesser, within range) return all rows that fit the condition. otherwise, return 
    // add bool as condition and...???
    async function retrieve_specific(column: any, table: any, value: any, condition: any){
        console.log("retrieve specific column: " + column)
        console.log("retrieve specific table: " + table)
        console.log("retrieve specific value: " + value)
        console.log("retrieve specific condition: " + condition)

        let rows: any = await retrieve_all(table)
        let data_arr: any = []

        for(let i=0; i<rows.length; i++){
            check_condition(condition, value) ? data_arr.push(rows[i]) : isNaN(value) && value === rows[i][column] ? data_arr.push(rows[i]) : null
        }

        console.log("retrieved specific data:")
        console.log(data_arr)
        return data_arr
    }


    function check_condition(condition: any, value: any){

        if(!Array.isArray(condition)){
            return false
        }

        if((typeof condition[0] === "number" && typeof condition[1] === "number") && value > condition[0] && value < condition[1]){
            console.log("CONDITION: greater than/lesser than range")
            return true
        }

        if((typeof condition[0] === "number" && !condition[1]) && (value > condition[0])){
            console.log("CONDITION: greater than")
            return true
        }
            
        if((!condition[0] && typeof condition[1] === "number") && value < condition[1]){
            console.log("CONDITION: lesser than")
            return true
        }


        if(condition[0] == condition[1] == value){
            console.log("CONDITION: equal")
            return true
        }

        return false
    }

    async function retrieve_handler(){
        const data = await retrieve_all(test_table)
        console.log("data retrieved")
        console.log(data)
        props.setRetrievedData(data)
        props.setRetrieve(false)
        return data
      }

    async function retrieve_all(table: any){
        var retrieved = null
        console.log("Retrieving from MongoDB table " + table + "...")
        const response = await fetch('../api/mongo_db/retrieve?table=' + table, { method: 'GET' });
        const retrieve = await response.json().then((data) => retrieved = data)
        console.log(retrieved)
        return retrieved
    }


    // Retrieves the current time
    // @param: N/A
    // @return (string): The current time
    function get_timestamp(){
        const date = new Date(Date.now())
        return date.toString()
    }


    // Retrieves the past attempt and increments the attempt number for the current test.
    // @param: N/A
    // @return: N/A
    async function increment_attempt(table: any, test_name: any){
        try{
        let rows: any = await retrieve_all(table)
        let greatest = 0
        for (let i=0; i<rows.length; i++){
            rows[i]["test_name"] === test_name ? greatest = rows[i]["attempt_num"] : null
        }
        console.log(greatest + 1)
        return greatest + 1
        }catch{
            console.log("Error scanning database for attempt number(s).")
        }
    }


    return(
        null
        // <Cognito handleInsertUser={handle_insert} UserInserted={UserInserted} setUserInserted={setUserInserted} setSignupSuccess={props.setSignupSuccess} Username={props.Username} Name={props.Name} Email={props.Email} Password={props.Password} setCheckConfirm={props.setCheckConfirm} CheckConfirm={props.CheckConfirm} ConfirmCode={props.ConfirmCode} setLoggedIn={props.setLoggedIn} setConfirmSuccess={props.setConfirmSuccess}/> 
    )
}

  