import {mongo_credentials} from '../../../credentials/Credentials'

const { MongoClient, ServerApiVersion } = require('mongodb');



 const uri = mongo_credentials.CONNECTION_STRING

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



export async function GET(request: Request){
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch{
    console.log("Error connecting to MongoDB")
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    return new Response(JSON.stringify({ message: 'Connection to MongoDB Success!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });  
  }
}

