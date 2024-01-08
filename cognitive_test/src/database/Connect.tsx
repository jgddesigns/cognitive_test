// Import AWS SDK and configure
import AWS from 'aws-sdk';

export default function Connect (props: any) {

  AWS.config.update({
    accessKeyId: props.key,
    secretAccessKey: props.secret,
    region: props.region,
  });
  
  const dynamoDB = new AWS.DynamoDB();
  
  const retrieve_params = {
      TableName: 'crowddoing',
      Key: {
        primaryKey: { S: 'id' }, 
      },
  };
    
  
  const insert_params = {
    TableName: 'crowddoing',
    Item: {
      primaryKey: { S: 'id'},
      attribute1: {S: 'insert attribute here'},
    },
  };


  //Retrieve an item from AWS Dynamo DB table 'crowddoing'
  //@param items: Object containing the desired items to return (if any) if null, returns all items
  //@return: The retrieved items, error if function fails 
  function retrieve(items: any){
    dynamoDB.getItem(retrieve_params, (err, data) => {
      if (!err) {
        console.log('Success:', data);
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


  return(
    null
  )

}

  