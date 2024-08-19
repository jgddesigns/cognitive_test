// Import AWS SDK and configure
'use client'
import AWS from 'aws-sdk';
import React from 'react';
import {Button, ButtonGroup} from "@nextui-org/react"
import credentials from "./config.js"


export default function Login (props: any) {
  const [TestDB, setTestDB] = React.useState(false)

  const AWS_KEY = credentials[0]
  const AWS_SECRET = credentials[1]
  const AWS_REGION = credentials[2]

  AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
  });
  
  const dynamoDB = new AWS.DynamoDB()
  
  const retrieve_params = {
      TableName: 'crowddoing',
      Key: {
        id: { S: '2' }, 
      },
  };
    
  
  const insert_params = {
    TableName: 'crowddoing',
    Item: {
      id: { S: '2'},
      test: {S: 'test successful'},
    },
  };


  //Retrieve an item from AWS Dynamo DB table 'crowddoing'
  //@param items: Object containing the desired items to return (if any) if null, returns all items
  //@return: The retrieved items, error if function fails 
  function retrieve(items: any){
    dynamoDB.getItem(retrieve_params, (err, data: any) => {
      if (!err) {
        console.log('Success:', data.Item.id.S);
        return data;
      } else {
        console.error('Error:', err);
        return err;
      }
    });

  }


  //Insert an item into AWS Dynamo DB table 'crowddoing'
  //@param items: Object containing the desired items to insert into the db 
  //@return: Success or failure message
  const insert = async () => {
    try{ 
      const data = await dynamoDB.putItem(insert_params).promise();
      console.log('success inserting to dynamo db')
      return data;
    }catch(error){
      console.log('error inserting to dynamo db')
      throw error
    }
  }


  const testHandler = () => {
    if(!TestDB){
      setTestDB(true)
    }
  }


  return(
    <div>
        <div className="row">
        <Button color="primary" onClick={insert}>Insert</Button>
        </div>
        <div className="row text-blue">
          <Button color="primary" className="mt-[200px] text-sky-400" onClick={retrieve}>Retrieve</Button>
        </div>
        
    </div>

  )

}

  