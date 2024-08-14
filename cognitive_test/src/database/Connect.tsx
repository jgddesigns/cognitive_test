'use client';
import AWS from 'aws-sdk';
import React from 'react';
import { Button } from "@nextui-org/react";
import dotenv from 'dotenv';
import {test_credentials} from '../credentials/Credentials'


dotenv.config(); // Load environment variables from .env file


export default function Connect() {
  const [TestDB, setTestDB] = React.useState(false);


  // Fetch AWS credentials and region from environment variables
  const AWS_KEY = test_credentials.AWS_ACCESS_KEY_ID;
  const AWS_SECRET = test_credentials.AWS_SECRET_ACCESS_KEY;
  const AWS_REGION = test_credentials.AWS_REGION;


  console.log(process.env)
  console.log('AWS Key:', AWS_KEY);
  console.log('AWS Secret:', AWS_SECRET);
  console.log('AWS Region:', AWS_REGION);


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
    } catch (err) {
      console.error('Error inserting user profile:', err);
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


  async function handleInsertUser(){
    const id = await createID()
    console.log(id)
    const newUserProfile = {
      profile_data: 'user123', // Partition key
      id: id.toString(), // Sort key
      username: 'user123',
      email_address: 'user123@example.com',
      name: 'User One Two Three',
      tests_completed: '5',
      total_test_time: '3600',
      variables_used: 'none',
      mind_type: 'default'
    };
    insertUserProfile(newUserProfile);
  };


  const handleInsertTestResult = () => {
    const newTestResult = {
      test_profile: 'user123', // Partition key
      id: '1', // Sort key
      test_type: '0',
      attempt_number: '1',
      time_completed: '120',
      score: '95',
      variable: '0'
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


  async function createID(){
    var new_id: any = await retrieveOne("id")
    new_id = (parseInt(new_id["S"]) + 1)
    console.log("id created " + new_id)

    return new_id
  }


  async function retrieveOne(column: any){
    var item: any = null

    const params: any = {
      TableName: userTable,
    };
    
    return new Promise((resolve) => {
      dynamoDB.scan(params, (err, data: any) => {
        if (err) {
          console.error("Error querying DynamoDB", err)
        } else {
          var place: any = data.Items.length - 1
          //rows aren't retrieved in id order... sort needed
          console.log("Query column succeeded", data.Items[place][column])
          resolve(data.Items[data.Items.length-1][column])
        }
      })
    });

    return (item+1)
    // dynamoDB.scan(params, (err, data: any) => {
    //   if (err) {
    //     console.error("Error querying DynamoDB", err);
    //   } else {
    //     item = parseInt(data.Items[data.Items.length-1][column]["S"])
    //     console.log("Query succeeded", (item + 1));

    //   }
    // })


    
  }


  return (
    <div>
      <div className="row">
        <Button color="primary" onClick={handleInsertUser}>Insert User</Button>
        <Button color="primary" onClick={handleInsertTestResult}>Insert Test Result</Button>
      </div>
      <div className="row">
        <Button color="primary" onClick={handleFetchUserProfile}>Fetch User Profile</Button>
        <Button color="primary" onClick={handleFetchTestResults}>Fetch Test Results</Button>
      </div>
      <div className="row">
        <Button color="primary" onClick={handleUpdateUserProfile}>Update User Profile</Button>
        <Button color="primary" onClick={handleUpdateTestResult}>Update Test Result</Button>
      </div>
      <div className="row">
        <Button color="primary" onClick={createID}>Update User Profile</Button>
      </div>
    </div>
  );
}
