import {mongo_credentials} from '../../../../credentials/Credentials'
import { NextResponse } from "next/server"

const { MongoClient, ServerApiVersion } = require('mongodb')
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
    console.log("Successfully connected to MongoDB for retrieval...")

    const database = client.db("cognitivetest")
    const url = new URL(request.url)
    var data = null

    try{
      data = url.searchParams.get('data')
      data ? data  = JSON.parse(data) : null
    }catch{ 
      console.log("No data set to retrieve. Getting all table rows...")
    }

    var table = url.searchParams.get('table')
    var result = null
    var find_rows = null

    const collection = database.collection(table)
    if(!data){
      find_rows = collection.find({})
      result  = await find_rows.toArray()
    }else{
      result = await collection.find(data).toArray()
    }

    if (!result) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    console.log(`Retrieved data: ${result}`)

    return new Response(JSON.stringify((result)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  
  } catch{
    console.log("Error connecting for retrieval to MongoDB")
    return Response.json({ error: "Error connecting for retrieval to MongoDB" }, { status: 500 })
  }finally {
    await client.close()
  }
}

