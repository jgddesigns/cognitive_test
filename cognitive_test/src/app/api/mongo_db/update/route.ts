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

    var data = url.searchParams.get('data')
    data = JSON.parse(data)

    var column = url.searchParams.get('column')
    column = JSON.parse(column)

    var filter =  url.searchParams.get('filter')
    filter = JSON.parse(filter)

    filter = {
      username: filter
    }


    const update = {
        $set: { 
          login_token: data[0], 
          login_date: data[1]
        }, 
    }





    table = url.searchParams.get('table')

    const database = client.db("cognitivetest")
    const collection = database.collection(table)


    console.log("Data to update:")
    console.log(update)
    console.log("Column Condition:")
    console.log(filter)
    const result = await collection.updateMany(filter, update)

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

