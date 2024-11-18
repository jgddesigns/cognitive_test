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
    console.log("Successfully connected to MongoDB for insertion...")

    const url: any = new URL(request.url)

    var data = url.searchParams.get('data')
    data = JSON.parse(data)
    table = url.searchParams.get('table')

    const database = client.db("cognitivetest")
    const collection = database.collection(table)

    console.log("Data to insert:")
    console.log(data)
    const result = await collection.insertOne(data)

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

