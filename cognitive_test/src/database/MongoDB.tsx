
'use client'
import React, {useEffect, useRef} from 'react';
import Cognito from '@/login/Cognito';

export default function MongoDB(props: any) {
    const [InsertSuccess, setInsertSuccess] = React.useState(false)
    const [RetrieveAllSuccess, setRetrieveAllSuccess] = React.useState(false)
    const [RetrieveOneSuccess, setRetrieveOneSuccess] = React.useState(false)
    const [UserInserted, setUserInserted] = React.useState(false);
    const [ID, setID] = React.useState(null)
    const [AttemptNumber, setAttemptNumber] = React.useState(null)


    useEffect(() => {
        // !InsertSuccess ? handle_insert() : console.log("Insert success!") 
        !RetrieveOneSuccess ? retrieve_one() : console.log("Retrieve one success!") 
        // !RetrieveAllSuccess ? retrieve_all() : console.log("Retrieve all success!") 
    }, [InsertSuccess, RetrieveOneSuccess, RetrieveAllSuccess])


    // real insert
    // useEffect(() => {
    //     props.Submit ? insert() : null
    //   }, [props.Submit, props.CheckConfirm])
    
    // used to create attempt number
    //   useEffect(() => {
    //     props.Insert && props.Data && props.TestName ? createEntries() :null 
    //   }, [props.Insert, props.Data, props.TestName])
    
    
      useEffect(() => {
        ID && AttemptNumber ? handle_insert() : null
      }, [ID, AttemptNumber])
    

    async function handle_insert(){
        console.log("Inserting test results id:" + ID + ", attempt number: " + AttemptNumber)
        const newTestResult = {
          user_id: props.Username,  
            attempt_num: 5688,
          test_name: props.TestName,
          attention: props.Data[0],
          decisiveness: props.Data[1],
          reaction: props.Data[2],
          timestamp: get_timestamp()
        } 
        newTestResult ? insert(newTestResult) : console.log("Error building insert test data.")
      }


    async function insert(data:any = null){
        console.log("Inserting to MongoDB")
        const payload = {
            "attempt_num": 5688
        }
        const response = await fetch('../api/mongo_db/insert?data=' + JSON.stringify(data), { method: 'GET' })
        const insert = await response.json().then((data) => console.log("Inserted data: " + data))
        response.status === 200 ? setInsertSuccess(true) : setInsertSuccess(false)
    }
    

    // async function insert(){
    //     console.log("Inserting to MongoDB table " + props.table + "...")
    //     const response = await fetch('../api/mongo_db/insert?table=' + props.table + '?data=' + JSON.stringify(props.payload), { method: 'GET' });
    //     const data = await response.json();
    //     response.status === 200 ? setInsertSuccess(true) : setInsertSuccess(false)
    // }


    // async function retrieve_one(){
    //     console.log("Retrieving from MongoDB table " + props.table + "...")
    //     const response = await fetch('../api/mongo_db/retrieve?table=' + props.table + '?data=' + JSON.stringify(props.payload), { method: 'GET' });
    //     const data = await response.json()
    //     console.log("Retrieved data:")
    //     console.log(data)
    //     response.status === 200 ? setRetrieveOneSuccess(true) : setRetrieveOneSuccess(false)
    // }
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

  