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
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Successfully connected to MongoDB for insertion...")

    const database = client.db("cognitivetest")
    const collection = database.collection("users")
    const url: any = new URL(request.url)
    var data = url.searchParams.get('data')
    data = JSON.parse(data)

    console.log("Data to insert:")
    console.log(data)
    const result = await collection.insertOne({ attempt_num: data["attempt_num"], attention: data["attention"], decisiveness: data["decisiveness"], reaction:["reaction"], test_name: data["test_name"], timestamp: data["timestamp"], user_id: data["user_id"]})

    console.log(`Inserted data: ${result}`)
    return new Response(JSON.stringify({ message: 'MongoDB insert success! Data: ' + JSON.stringify(result)}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })  
  } catch{
    console.log("Error connecting for insert to MongoDB")
    return Response.json({ error: "Error connecting for insert to MongoDB" }, { status: 500 })
  }finally {
    await client.close()

  }
}

