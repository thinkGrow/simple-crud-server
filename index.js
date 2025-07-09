const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;

const uri =
  "mongodb+srv://simpleDBUser:TNDkgIud1EpEwyAv@cluster0.af9wvor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//middleware
app.use(cors());
app.use(express.json());

// user : simpleDBUser
// pass : TNDkgIud1EpEwyAv

app.get("/", (req, res) => {
  res.send("Simple CRUD Server Running");
});

app.listen(port, () => {
  console.log(`Simple CRUD Server Running on: ${port}`);
});
