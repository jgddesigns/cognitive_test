import {mongo_credentials} from '../../../../credentials/Credentials'

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = mongo_credentials.CONNECTION_STRING

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export async function GET(request: Request){
  try {
    var table = null

    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Successfully connected to MongoDB for update...")

    const url: any = new URL(request.url)

    var data_columns = url.searchParams.get('data_columns')
    data_columns = JSON.parse(data_columns)

    var data = url.searchParams.get('data')
    data = JSON.parse(data)

    var filter_columns = url.searchParams.get('filter_columns')
    filter_columns = JSON.parse(filter_columns)

    var filter =  url.searchParams.get('filter')
    filter = JSON.parse(filter)

    // filter_update = {
    //   username: filter
    // }

    const filter_update = 
      filter_columns.reduce((acc: any, key: any, index: any) => {
        acc[key] = filter[index];
        return acc;
    }, {})
    

    // const update_data = {
    //     $set: { 
    //       login_token: data[0], 
    //       login_date: data[1]
    //     }, 
    // }


    const data_update = {
      $set: data_columns.reduce((acc: any, key: any, index: any) => {
        acc[key] = data[index];
        return acc;
      }, {}),
    };



    table = url.searchParams.get('table')

    const database = client.db("cognitivetest")
    const collection = database.collection(table)


    console.log("Data to update:")
    console.log(data_update)
    console.log("Column Condition:")
    console.log(filter_update)
    const result = await collection.updateMany(filter_update, data_update)

    console.log(`Updated data: ${result}`)
    return new Response(JSON.stringify({ message: 'MongoDB update success! Data: ' + JSON.stringify(result)}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })  
  } catch{
    console.log("Error connecting for update to MongoDB")
    return Response.json({ error: "Error connecting for update to MongoDB" }, { status: 500 })
  }finally {
    await client.close()

  }
}

