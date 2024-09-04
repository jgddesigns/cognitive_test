//MAIN CODE - ROBERT JOASILUS (github: RobJiggs, slack: @Robert Joasilus)
//MODIFICATIONS - JASON DUNN (github: jgddesigns, slack: @Jay Dunn)

'use client';
import AWS from 'aws-sdk';
import React, {useEffect, useRef} from 'react';
import { Button } from "@nextui-org/react";
//import dotenv from 'dotenv';
import {test_credentials} from '../credentials/Credentials'
import Cognito from '@/login/Cognito';
import { propagateServerField } from 'next/dist/server/lib/render-server';


//dotenv.config(); // Load environment variables from .env file


export default function Connect(props: any) {
  const [UserInserted, setUserInserted] = React.useState(false);

  useEffect(() => {
    props.Submit ? handleInsertUser(props.Username, props.Name, props.Email) : null
  }, [props.Submit, props.CheckConfirm])


  // Fetch AWS credentials and region from environment variables
  const AWS_KEY = test_credentials.AWS_ACCESS_KEY_ID;
  const AWS_SECRET = test_credentials.AWS_SECRET_ACCESS_KEY;
  const AWS_REGION = test_credentials.AWS_REGION;


  //console.log(process.env)
  // console.log('AWS Key:', AWS_KEY);
  // console.log('AWS Secret:', AWS_SECRET);
  // console.log('AWS Region:', AWS_REGION);


  //Check if credentials are defined
  if (!AWS_KEY || !AWS_SECRET || !AWS_REGION) {
    console.error('AWS credentials or region are not defined.');
    return null;
  }

  AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
  });


  const dynamoDB = new AWS.DynamoDB();
  const docClient = new AWS.DynamoDB.DocumentClient();


  // Table schemas
  const userTable = 'User';
  const testResultsTable = 'Test_Results'; // Updated table name

  // Retrieve a user profile from the 'User' table
  const retrieveUserProfile = async (profileData: string, id: number) => {
    const params = {
      TableName: userTable,
      Key: {
        profile_data: profileData,
        id: id
      }
    };
    try {
      const data = await docClient.get(params).promise();
      console.log('User profile:', data.Item);
      return data.Item;
    } catch (err) {
      console.error('Error retrieving user profile:', err);
      return null;
    }
  };

  // Insert a new user profile into the 'User' table
  const insertUserProfile = async (userProfile: any) => {
    const params = {
      TableName: userTable,
      Item: userProfile
    };
    try {
      await docClient.put(params).promise();
      console.log('User profile inserted successfully.');
      setUserInserted(true)
      props.setSubmit(false)
    } catch (err) {
      console.error('Error inserting user profile:', err);
      props.setSubmit(false)
    }
  };


  // Update an existing user profile in the 'User' table
  const updateUserProfile = async (profileData: string, id: number, updatedFields: { [key: string]: any }) => {
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};
 
    const updateExpression = 'set ' + Object.keys(updatedFields).map((key, index) => {
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:value${index}`] = updatedFields[key];
      return `#${key} = :value${index}`;
    }).join(', ');
 
    const params = {
      TableName: userTable,
      Key: {
        profile_data: profileData,
        id: id
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW'
    };
 
    try {
      const data = await docClient.update(params).promise();
      console.log('User profile updated successfully:', data.Attributes);
      return data.Attributes;
    } catch (err) {
      console.error('Error updating user profile:', err);
      return null;
    }
  };
 


  // Insert a new test result into the 'Test_Results' table
  const insertTestResult = async (testResult: any) => {
    const params = {
      TableName: testResultsTable, // Updated table name
      Item: testResult
    };
    try {
      await docClient.put(params).promise();
      console.log('Test result inserted successfully.');
    } catch (err) {
      console.error('Error inserting test result:', err);
      console.error('Parameters used:', JSON.stringify(params, null, 2));
    }
  };

  // Update an existing test result in the 'Test_Results' table
  const updateTestResult = async (testProfile: string, testId: number, updatedFields: { [key: string]: any }) => {
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};
 
    const updateExpression = 'set ' + Object.keys(updatedFields).map((key, index) => {
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:value${index}`] = updatedFields[key];
      return `#${key} = :value${index}`;
    }).join(', ');
 
    const params = {
      TableName: testResultsTable,
      Key: {
        test_profile: testProfile,
        test_id: testId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW'
    };
 
    try {
      const data = await docClient.update(params).promise();
      console.log('Test result updated successfully:', data.Attributes);
      return data.Attributes;
    } catch (err) {
      console.error('Error updating test result:', err);
      return null;
    }
  };
 


  // Retrieve test results for a specific user
  const fetchTestResults = async (testProfile: string) => {
    const params = {
      TableName: testResultsTable, // Updated table name
      KeyConditionExpression: 'test_profile = :test_profile',
      ExpressionAttributeValues: {
        ':test_profile': testProfile
      }
    };
    try {
      const data = await docClient.query(params).promise();
      console.log('Test results:', data.Items);
      return data.Items;
    } catch (err) {
      console.error('Error fetching test results:', err);
      return null;
    }
  };


  async function handleInsertUser(username: any, name: any, email: any){
    const id = await createID(userTable)
    const newUserProfile = {
      profile_data: username, // Partition key
      id: id.toString(), // Sort key
      username: username,
      email_address: email,
      name: name,
      tests_completed: '0',
      total_test_time: '0',
      variables_used:  null,
      mind_type: null,
      timestamp: getTimestamp()
    };
    insertUserProfile(newUserProfile);
  };


  async function handleInsertTestResult(){
    const id = await createID(testResultsTable)
    const newTestResult = {
      test_profile: 'user123', // Partition key
      id: id.toString(), // Sort key
      test_type: '0',
      attempt_number: '1',
      time_completed: '120',
      score: '95',
      variable: '0',
      timestamp: getTimestamp()
    };
    insertTestResult(newTestResult);
  };

  const handleFetchUserProfile = () => {
    retrieveUserProfile('user123', 1); // Provide both partition key and sort key
  };

  const handleFetchTestResults = () => {
    fetchTestResults('user123'); // Use the correct partition key
  };

  const handleUpdateUserProfile = () => {
    const updatedFields = {
      email_address: 'new_email@example.com', // Example field to update
      name: 'New Name'
      // Add other fields you want to update
    };
    updateUserProfile('user123', 1, updatedFields); // Provide partition key, sort key, and updated fields
  };

  const handleUpdateTestResult = () => {
    const updatedFields = {
      score: 98, // Example field to update
      time_completed: 110
      // Add other fields you want to update
    };
    updateTestResult('user123', 1, updatedFields); // Provide partition key, sort key, and updated fields
  };


  async function createID(table: any){
    var new_id: any = await retrieveOne("id", table)
    console.log("id created " + new_id)
    return new_id
  }


  async function retrieveOne(column: any, table: any){
    const params: any = {
      TableName: table,
    };
    
    return new Promise((resolve) => {
      dynamoDB.scan(params, (err, data: any) => {
        if (err) {
          console.error("Error querying DynamoDB", err)
        } else {
          console.log("Query column succeeded", data.Items)
          column == "id" ? resolve((data.Items.length + 1)) : resolve(data.Items[data.Items.length-1][column])
        }
      })
    });
  }


  function getTimestamp(){
    const date = new Date(Date.now())
    return date.toString()
  }


return (
    <Cognito handleInsertUser={handleInsertUser} UserInserted={UserInserted} setUserInserted={setUserInserted} setSignupSuccess={props.setSignupSuccess} Username={props.Username} Name={props.Name} Email={props.Email} Password={props.Password} setCheckConfirm={props.setCheckConfirm} CheckConfirm={props.CheckConfirm} ConfirmCode={props.ConfirmCode} setLoggedIn={props.setLoggedIn} setConfirmSuccess={props.setConfirmSuccess}/> 
  );
}
