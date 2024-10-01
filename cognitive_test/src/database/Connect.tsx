//MAIN CODE - ROBERT JOASILUS (github: RobJiggs, slack: @Robert Joasilus)
//MODIFICATIONS - JASON DUNN (github: jgddesigns, slack: @Jay Dunn)

'use client';
import AWS from 'aws-sdk';
import React, {useEffect, useRef} from 'react';
import {test_credentials} from '../credentials/Credentials'
import Cognito from '@/login/Cognito';



// Used to esstablish the main database connection. (AWS Dynamo DB)
// EDIT?: Combine all fetch, retrieve and update functions into one. (pass the table name as a parameter? set it in a state variable prior to call?)
export default function Connect(props: any) {
  
  const [UserInserted, setUserInserted] = React.useState(false);


  useEffect(() => {
    props.Submit ? handleInsertUser(props.Username, props.Name, props.Email) : null
  }, [props.Submit, props.CheckConfirm])


  // Fetch AWS credentials and region from 'src/credentials/Credentials.tsx
  const AWS_KEY = test_credentials.ACCESS_KEY;
  const AWS_SECRET = test_credentials.ACCESS_SECRET;
  const AWS_REGION = test_credentials.REGION;


  // Check if credentials are defined
  if (!AWS_KEY || !AWS_SECRET || !AWS_REGION) {
    console.error('AWS credentials or region are not defined.');
    return null;
  }
  

  // Connect credentials to AWS instance
  AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
  });


  // Create Dynamo DB connection
  const dynamoDB = new AWS.DynamoDB();
  const docClient = new AWS.DynamoDB.DocumentClient();


  // Table schemas
  const userTable = 'User';
  const testResultsTable = 'Test_Results'; 


  // Retrieve a user profile from the 'Users' table
  // @param 'profileData': Username
  // @param 'id': Unique row id
  // @return json: The desired row in the 'Users' table or 'null' if failure
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


  // Insert a new user profile into the 'Users' table
  // @param 'userProfile': Username
  // @return: N/A
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


  // Update an existing user profile in the 'Users' table
  // @param 'profileData': Username
  // @param 'id': Unique row id
  // @param 'updatedFields': Object of columns to update
  // @return json: Updated column values
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
  // @param 'testResult': The results from a particular test
  // @return: N/A
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
  // @param 'testProfile': Username
  // @param 'testId': Unique row id
  // @param 'updatedFields': The columns to update (needs json string)
  // @return: Updated data or null when failure
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
  // @param 'testProfile': Username
  // @return: Fetched items or null when failure
  const fetchTestResults = async (testProfile: string) => {
    const params = {
      TableName: testResultsTable, 
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


  // Sets the data to insert into the user table
  // @param 'username': Username
  // @param 'name': Name of user
  // @param 'email': Email of user
  // @return: N/A
  async function handleInsertUser(username: any, name: any, email: any){
    const id = await createID(userTable)
    const newUserProfile = {
      profile_data: username, 
      id: id.toString(), 
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


  // Uses the 'retrieveOne' function to create a new id. Used when inserting a new row.
  // @param 'table': The table to create the id in 
  // @return: The id that was created
  async function createID(table: any){
    var new_id: any = await retrieveOne("id", table)
    console.log("id created " + new_id)
    return new_id
  }


  // Retrieves one value from a given table
  // @param 'column': The column to get the data from
  // @param 'table': The table to get the data from
  // @return: If column is 'id', the new id. Otherwise, data from the given row.
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


  // Retrieves the current time
  // @param: N/A
  // @return: The current time
  function getTimestamp(){
    const date = new Date(Date.now())
    return date.toString()
  }


return (
    <Cognito handleInsertUser={handleInsertUser} UserInserted={UserInserted} setUserInserted={setUserInserted} setSignupSuccess={props.setSignupSuccess} Username={props.Username} Name={props.Name} Email={props.Email} Password={props.Password} setCheckConfirm={props.setCheckConfirm} CheckConfirm={props.CheckConfirm} ConfirmCode={props.ConfirmCode} setLoggedIn={props.setLoggedIn} setConfirmSuccess={props.setConfirmSuccess}/> 
  );
}
