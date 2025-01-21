//AWS CONNECTION. DEPRECATED.



//MAIN CODE - ROBERT JOASILUS (github: RobJiggs, slack: @Robert Joasilus)
// //MODIFICATIONS - JASON DUNN (github: jgddesigns, slack: @Jay Dunn)

'use client';
import AWS from 'aws-sdk';
import React, {useEffect, useRef} from 'react';
import {test_credentials} from '../credentials/Credentials'
import Cognito from '@/login/Cognito';


// Used to esstablish the main database connection. (AWS Dynamo DB)
// EDIT?: Combine all fetch, retrieve and update functions into one. (pass the table name as a parameter? set it in a state variable prior to call?)
export default function Connect(props: any) {
  
  const [UserInserted, setUserInserted] = React.useState(false);
  const [ID, setID] = React.useState(null)
  const [AttemptNumber, setAttemptNumber] = React.useState(null)


  useEffect(() => {
    props.Submit ? handleInsertUser(props.Username, props.Name, props.Email) : null
  }, [props.Submit])


  useEffect(() => {
    props.Insert && props.Data && props.TestName ? createEntries() :null 
  }, [props.Insert, props.Data, props.TestName])


  useEffect(() => {
    ID && AttemptNumber ? handleInsertTestResult() : null
  }, [ID, AttemptNumber])




  // Fetch AWS credentials and region from environment variables
  const AWS_KEY = test_credentials.AWS_KEY;
  const AWS_SECRET = test_credentials.AWS_SECRET;
  const AWS_REGION = test_credentials.REGION;

  
  //Check if credentials are defined
  // if (!AWS_KEY || !AWS_SECRET || !AWS_REGION) {
  //   console.error('AWS credentials or region are not defined.');
  //   return null;
  // }
  

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


  useEffect(() => {
    if(!props.RetrievedData){
      console.log("retrieve in connect")
      retrieveHandler()
    }
  }, [props.RetrievedData])


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

  async function retrieveHandler(){
    const data = await retrieveAll(testResultsTable)
    console.log("data retrieved")
    console.log(data)
    props.setRetrievedData(data)
    props.setRetrieve(false)
    return data
  }

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
  // @return (json): Updated column values
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
      props.setInsert(false)
      props.setData([])
      props.setTestName("")
      setID(null)
      setAttemptNumber(null)
    } catch (err) {
      console.error('Error inserting test result:', err);
      console.error('Parameters used:', JSON.stringify(params, null, 2));
    }
  };


  // Update an existing test result in the 'Test_Results' table
  // @param 'testProfile': Username
  // @param 'testId': Unique row id
  // @param 'updatedFields': The columns to update (needs json string)
  // @return (json, null): Updated data or null when failure
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
 

  // Builds the insert payload for user data. Params are passed as props from other components.
  // @param 'username': The user's username
  // @param 'name': The user's name/nickname
  // @param 'email': The user's email address
  // @return: N/A
  async function handleInsertUser(username: any, name: any, email: any){
    const id: any = await retrieveOne("id", testResultsTable)
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

  // Builds the insert payload for test results. The ID and AttemptNumber are set by the 'createEntries' and 'retrieveAll' functions. Other data is based on props passed from other components.
  // @param 'username': The user's username
  // @param 'name': The user's name/nickname
  // @param 'email': The user's email address
  // @return: N/A
  async function handleInsertTestResult(){
    console.log("inserting test results id:" + ID + ", attempt number: " + AttemptNumber)
    const newTestResult = {
      user_id: props.Username, 
      id: ID, 
      attempt_number: AttemptNumber,
      test_name: props.TestName,
      attention: props.Data[0],
      decisiveness: props.Data[1],
      reaction: props.Data[2],
      timestamp: getTimestamp()
    } 
    newTestResult ? insertTestResult(newTestResult) : console.log("Error building insert test data.")
  };


  // In combination with the 'retrieveOne' and 'getAttempt' functions, gets the most recent table row id and attempt number relevant to the current test, then increments them by one if needed, or sets them to 1 for the first entry.
  // @param: N/A
  // @return: N/A
  async function createEntries(){
    console.log("creating entries")
    const id: any = await retrieveOne("id", testResultsTable)
    id ? setID(id.toString()) : console.log("Error creating id.")
    var attempt: any = await getAttempt() 
    attempt == 0 ? attempt = 1 : attempt = attempt + 1 
    attempt ? setAttemptNumber(attempt.toString()) : console.log("Error creating attempt number.")
    // ID && AttemptNumber ? handleInsertTestResult() : null
  }


  // In combination with the 'retrieveAll' function, gets the most recent attempt number associated with the current test.
  // @param: N/A
  // @return (integer): The attempt from the latest inserted row
  async function getAttempt(){
    const attempt: any =  await retrieveAll(testResultsTable)
    let attempt_num = 0
    if(attempt.length > 0){ 
      for(let i=0; i<attempt.length; i++){
        attempt[i]["test_name"]["S"] == props.TestName && attempt_num < parseInt(attempt[i]["attempt_number"]["S"]) ? attempt_num = parseInt(attempt[i]["attempt_number"]["S"]) : null
      }
    }
    console.log("attempt " + attempt_num)
    return attempt_num
  }


  // Retrieves one value from a given table
  // @param 'column': The column to get the data from
  // @param 'table': The table to get the data from
  // @return (integer, json): If column is 'id', the new id. Otherwise, data from the given row.
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
          column == "id" || column == "attempt_number" ? resolve((data.Items.length + 1)) : resolve(data.Items[data.Items.length-1][column])
        }
      })
    });
  }

  // Gets all rows from a particular table
  // @param 'table': The name of the table to get the data from
  // @return (json): An object of all table rows
  async function retrieveAll(table: any){
    const params: any = {
      TableName: table,
    };
    
    return new Promise((resolve) => {
      dynamoDB.scan(params, (err, data: any) => {
        if (err) {
          console.error("Error querying DynamoDB", err)
        } else {
          console.log("Query column succeeded", data.Items)
          resolve(data.Items)
        }
      })
    });
  }


  // Retrieves the current time
  // @param: N/A
  // @return (string): The current time
  function getTimestamp(){
    const date = new Date(Date.now())
    return date.toString()
  }


return (
    <Cognito handleInsertUser={handleInsertUser} UserInserted={UserInserted} setUserInserted={setUserInserted} setSignupSuccess={props.setSignupSuccess} Username={props.Username} Name={props.Name} Email={props.Email} Password={props.Password} setCheckConfirm={props.setCheckConfirm} CheckConfirm={props.CheckConfirm} ConfirmCode={props.ConfirmCode} setLoggedIn={props.setLoggedIn} setConfirmSuccess={props.setConfirmSuccess}/> 
  );
}
