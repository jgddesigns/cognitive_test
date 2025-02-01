
'use client'
import React, {useEffect, useRef} from 'react';
import Cognito from '@/login/Cognito';


export default function MongoDB(props: any) {
    const [InsertSuccess, setInsertSuccess] = React.useState(false)
    const [RetrieveAllSuccess, setRetrieveAllSuccess] = React.useState(false)
    const [RetrieveOneSuccess, setRetrieveOneSuccess] = React.useState(false)

    const user_table = "users"
    const test_table = "test_results"


    useEffect(() => {
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
    // useEffect(() => {
    //     props.UsernameCheck && !props.UsernameVerified ? username_check() : null
    // }, [props.UsernameCheck, props.UsernameVerified])


    useEffect(() => {
        if(props.TriggerInsert){
            const promise = new Promise((resolve, reject) => {
                resolve(username_check())
            }).then(result => {
                console.log(result)
                !result ? handle_insert() : null
                // resolve()
                props.setStartLogin(true)
            })

        } 

        
    }, [props.TriggerInsert])
    
    useEffect(() => {
        props.StartLogin ? check_cookies() : null
    }, [props.StartLogin])

    //insert for test results table
    useEffect(() => {
        props.Table && props.TestName ? handle_insert() : null
    }, [props.Table])


    //clear token after logout or login cookie expire (when 'Username' and 'Created' cookies are empty or null)
    useEffect(() => {
        if(props.ClearToken){
            update(["login_token", "login_date"], ["", ""], ["username"], [props.EventID], user_table)
            props.setEventID("")
        }
    }, [props.ClearToken])
    

    async function check_cookies(){
        console.log("checking cookies")
        console.log(props.EventID)

        var data: any = null

        //check the 'users' table for existing user data.
        const promise = new Promise((resolve, reject) => {

            // if(props.Username.length > 0){
            //     data = retrieve_specific("username", user_table, props.Username, [null])
            if(props.EventID.length > 0){
                data = retrieve_specific("username", user_table, props.EventID, [null])

                resolve(data)
            }else{
                resolve(null)
            }


        })
    }


    function is_cookie_expired(date: any){
        const cookie = new Date(date)
        cookie.setTime(cookie.getTime() + (24 * 60 * 60 * 1000 * 7))
        const current_date = new Date()
        current_date.setTime(current_date.getTime())
        console.log("expire date")
        console.log(cookie)
        console.log("current date")
        console.log(current_date)
        if(cookie < current_date){
            console.log("set new login cookies")
            return true
        }
        return false
    }


    async function username_check(){
        // props.setUsernameCheck(false)
        // props.setUsernameVerified(false)
        console.log("username check: " + props.EventID)
        let name: any = await retrieve_specific("username", user_table, props.EventID, null)
        console.log(name)
        if(name){
            return true
        }
        return false
        // name ? props.setUsernameMatch(true) : props.setUsernameVerified(true)
    }

    async function update_user_data(){
        var fetched_data: any = null
        const promise = new Promise((resolve, reject) => {


            // var old_data = retrieve_specific("username", user_table, props.Username, [null])\
            var old_data = retrieve_specific("username", user_table, props.EventID, [null])




            resolve(old_data)

        }).then(result => {
            if(result){
            let tests = []
            let variables = []
            let columns = []
            let data = []
            console.log(result)
            fetched_data = result
            fetched_data = fetched_data[0]
            console.log(fetched_data)
            for(let i=0; i<fetched_data["tests_completed"].length; i++){
                tests.push(fetched_data["tests_completed"][i])
            }

            console.log("tests completed")
            console.log(tests)
            console.log(props.TestName)
            console.log(!tests.includes(props.TestName))
            !tests.includes(props.TestName) ? tests.push(props.TestName) : null
            for(let i=0; i<fetched_data["variables_used"].length; i++){
                variables.push(fetched_data["variables_used"][i])
            }
            console.log("variables used")
            console.log(variables)
            !variables.includes(props.Herb) ? variables.push(props.Herb) : null


            console.log("data")
            console.log(tests)

            console.log(variables)

            if(tests != fetched_data["tests_completed"]){
                columns.push("tests_completed")
                data.push(tests)
            }

            if(variables != fetched_data["variables_used"]){
                columns.push("variables_used")
                data.push(variables)
            }

            console.log("to update")
            console.log(columns)
            console.log(data)
            
            // columns.length > 0 ? update(columns, data, ["username"], [props.Username], user_table) : console.log("no test data to update")
            columns.length > 0 ? update(columns, data, ["username"], [props.EventID], user_table) : console.log("no test data to update")
        }
        })
    }

    //check if username already exists in db
    async function handle_insert(){
        console.log("starting insert to: " + props.Table)

        var data: any = null
        var test_results = null
        var user_data = null
        try{
            test_results = {
                // user_id: props.Username,  
                username: props.EventID, 
                attempt_num: await increment_attempt(test_table, props.TestName),
                test_name: props.TestName,
                herb: props.Herb,
                attention: props.Data[0],
                decisiveness: props.Data[1],
                reaction: props.Data[2],
                timestamp: get_timestamp()
            } 
            const check = await username_check()
            check ? update_user_data() : null
        }catch{
            test_results = null
        }
        try{
            user_data = {
                profile_data: null, 
                username: props.EventID,
                // username: props.Username,
                // email_address: props.Email,
                // name: props.Name,
                // tests_completed: await retrieve_all(test_table),
                // if new user, there wont be any tests taken. add updates after tests are taken.
                tests_completed: [],
                total_test_time: '0',
                variables_used:  [],
                mind_type: "",
                login_date: get_timestamp(),
                // login_token: props.Cookies,
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

    // async function update(data: any, column: any, filter: any, table: any){
    //     var retrieved = null
    //     console.log("Updating MongoDB table " + table + "...")
    //     const response = await fetch('../api/mongo_db/update?data=' + JSON.stringify(data) + "&column=" +  JSON.stringify(column) +  "&filter=" +  JSON.stringify(filter) + "&table=" + table, { method: 'GET' })
    //     const retrieve = await response.json().then((data) => retrieved = data)
    //     props.setClearToken(false)
    //     return retrieved
    // }

    async function update(data_columns: any, data: any, filter_columns: any, filter: any, table: any){
        var retrieved = null
        console.log("Updating MongoDB table " + table + "...")
        const response = await fetch('../api/mongo_db/update?data_columns=' + JSON.stringify(data_columns) + "&data=" +  JSON.stringify(data) + "&filter_columns=" +  JSON.stringify(filter_columns) +  "&filter=" +  JSON.stringify(filter) + "&table=" + table, { method: 'GET' })
        const retrieve = await response.json().then((data) => retrieved = data)
        props.setClearToken(false)
        return retrieved
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
            check_condition(condition, value) ? data_arr.push(rows[i]) : value && value === rows[i][column] ? data_arr.push(rows[i]) : null
        }

        if(data_arr.length < 1){
            console.log("No data matching " + value + " found.")
            return false
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
        return data
    }


    function get_date(){
        const date = new Date(Date.now())
        // date.setTime(date.getTime())
        return date.toUTCString()
    }

    async function retrieve_all(table: any){
        var retrieved = null
        console.log("Retrieving from MongoDB table " + table + "...")
        const response = await fetch('../api/mongo_db/retrieve?table=' + table, { method: 'GET' });
        const retrieve = await response.json().then((data) => retrieved = data)
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
            rows[i]["username"] == props.EventID && rows[i]["test_name"] === test_name ? greatest = rows[i]["attempt_num"] : null
        }
        console.log(greatest + 1)
        return greatest + 1
        }catch{
            console.log("Error scanning database for attempt number(s).")
        }
    }


    return(
        null
    )
}



  