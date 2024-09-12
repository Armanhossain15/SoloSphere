const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 9000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const corsOption ={
    origin : ['http://localhost:9000/'],
    Credentials : true,
    optionSuccessStatus : 200,
}
app.use(cors())
app.use(express.json())

console.log(`${process.env.DB_USER}`);
const uri = `mongodb+srv://SoloSphere:Tf4cgPIN8pry6pUO@cluster0.rtlua5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const jobsCollection = client.db('solosphere').collection('jobs')
    const bidsCollection = client.db('solosphere').collection('bids')
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    
    //get all job data from DB
    app.get('/jobs', async(req, res)=>{
      const result = await jobsCollection.find().toArray()
      res.send(result)
    })

    //get single job Data From DB based on id
    app.get('/job/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    //get single job Data From DB based on email
    app.get('/jobs/:email', async(req, res)=>{
      const email = req.params.email
      const query = {'buyer.email' : email}
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
    })

     //post data on jobs collection
     app.post('/job', async(req, res)=>{
      const jobData = req.body
      const result = await jobsCollection.insertOne(jobData)
      res.send(result)
    })

    //post data on bids collection
    app.post('/bid', async(req, res)=>{
      const bidData = req.body
      const result = await bidsCollection.insertOne(bidData)
      res.send(result)
    })


   

    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Hello From Solospare server ...')
})

app.listen(port, ()=>console.log(`server is running on port ${port}`))