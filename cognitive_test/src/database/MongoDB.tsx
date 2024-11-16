
'use client'
import React, {useEffect, useRef} from 'react';
import {test_credentials} from '../credentials/Credentials'

export default function MongoDB(this: any, props: any) {
    const [ConnectSuccess, setConnectSuccess] = React.useState(false)



    useEffect(() => {
        
        !ConnectSuccess ? db_connect() : console.log("Connected to MongoDB") 

    }, [ConnectSuccess])


 
    async function db_connect(){
        console.log("starting mongo db")
        const response = await fetch('../api/mongo_db', { method: 'GET' });
        const data = await response.json();
        response.status === 200 ? setConnectSuccess(true) : setConnectSuccess(false)
    }
    

    return(
        null
    )
}

  