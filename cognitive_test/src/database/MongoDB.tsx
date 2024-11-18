
'use client'
import React, {useEffect, useRef} from 'react';
import Cognito from '@/login/Cognito';

export default function MongoDB(props: any) {
    const [InsertSuccess, setInsertSuccess] = React.useState(false)
    const [RetrieveAllSuccess, setRetrieveAllSuccess] = React.useState(false)
    const [RetrieveOneSuccess, setRetrieveOneSuccess] = React.useState(false)
    const [UserInserted, setUserInserted] = React.useState(false)
    const [AttemptNumber, setAttemptNumber] = React.useState(null)

    const user_table = "users"
     
    const test_table = "test_results"


    useEffect(() => {
        if(InsertSuccess){
            console.log("insert success. resetting variables.")
            props.setSubmit(false)
            props.setTestName(null)
            props.setTable(null)
            setInsertSuccess(false)
        }
        // handle_insert()
        // !RetrieveOneSuccess ? retrieve_one() : console.log("Retrieve one success!") 
        // !InsertSuccess ? handle_insert() : null
        // !RetrieveAllSuccess ? retrieve_all() : console.log("Retrieve all success!") 
    }, [InsertSuccess, RetrieveOneSuccess, RetrieveAllSuccess])


    // insert for user signup
    useEffect(() => {
        props.Submit ? handle_insert() : null
    }, [props.Submit])
    
    //insert for test results table
    useEffect(() => {
        props.Table && props.TestName ? handle_insert() : null
    }, [props.Table])
    

    async function handle_insert(){
        console.log("starting insert to: " + props.Table)

        var data = null
        var test_results = null
        var user_data
        try{
            test_results = {
                user_id: props.Username,  
                attempt_num: 5688,
                test_name: props.TestName,
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
                username: props.Email,
                // email_address: props.Email,
                name: props.Name,
                tests_completed: '0',
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
      }


    async function insert(data: any = null, table: any = null){
        console.log("Inserting to MongoDB")
        // const response = await fetch('../api/mongo_db/insert?data=' + JSON.stringify(data), { method: 'GET' })
        const response = await fetch('../api/mongo_db/insert?data=' + JSON.stringify(data) + "&table=" + table, { method: 'GET' })
        const insert = await response.json().then((data) => 
            console.log("Inserted data: " + data))
        // response.status === 200 ? setInsertSuccess(true) : setInsertSuccess(false)
    }
    

    async function retrieve_one(){
        console.log("Retrieving from MongoDB table " + props.table + "...")
        const payload = {
            "attempt_num": 5688
        }
        const response = await fetch('../api/mongo_db/retrieve?data=' + JSON.stringify(payload), { method: 'GET' });
        const retrieve = await response.json().then((data) => console.log("Retrieved data: " + JSON.stringify(data)))
        response.status === 200 ? setRetrieveOneSuccess(true) : setRetrieveOneSuccess(false)
    }


    async function retrieve_all(){
        console.log("Retrieving from MongoDB table " + props.table + "...")
        const response = await fetch('../api/mongo_db/retrieve', { method: 'GET' });
        const retrieve = await response.json().then((data) => console.log("Retrieved data: " + JSON.stringify(data)))
        response.status === 200 ? setRetrieveAllSuccess(true) : setRetrieveAllSuccess(false)
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
    function create_attempt(){
        const date = new Date(Date.now())
        return date.toString()
    }


    return(
        <Cognito handleInsertUser={handle_insert} UserInserted={UserInserted} setUserInserted={setUserInserted} setSignupSuccess={props.setSignupSuccess} Username={props.Username} Name={props.Name} Email={props.Email} Password={props.Password} setCheckConfirm={props.setCheckConfirm} CheckConfirm={props.CheckConfirm} ConfirmCode={props.ConfirmCode} setLoggedIn={props.setLoggedIn} setConfirmSuccess={props.setConfirmSuccess}/> 
    )
}

  