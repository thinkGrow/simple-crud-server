// Import required packages
const express = require("express");
const cors = require("cors");
const app = express(); // Create an instance of an Express server
const { MongoClient, ServerApiVersion } = require("mongodb"); // Import MongoDB client
const port = process.env.PORT || 3000; // Use environment port or default to 3000

// ----------------- MIDDLEWARE -----------------

// Allow requests from different origins (cross-origin)
app.use(cors());

// Parse incoming JSON data in request body (needed for req.body to work)
app.use(express.json());

// ----------------- MONGODB SETUP -----------------

// MongoDB connection string
const uri =
  "mongodb+srv://simpleDBUser:TNDkgIud1EpEwyAv@cluster0.af9wvor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create MongoClient instance with configuration options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ----------------- MAIN FUNCTION -----------------

async function run() {
  try {
    // Connect to MongoDB cluster
    await client.connect();

    // Define your database and collection
    const database = client.db("usersdb"); // Choose DB name
    const usersCollection = database.collection("users"); // Choose collection name

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // POST endpoint to receive and store user data
    app.post("/users", async (req, res) => {
      const newUser = req.body; // Get user data from request body
      console.log("data in the server", newUser); // Log the data on the server

      // Insert user into the MongoDB collection
      const result = await usersCollection.insertOne(newUser);

      // Send the result back to the frontend
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) };
      // const result = await usersCollection.deleteOne(query);
      // res.send(result);

      console.log(id);
    });

    // Confirm connection with a ping
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // ❌ DO NOT close the client, or your routes will stop working
    // await client.close();
  }
}

// Call the async function and catch any errors
run().catch(console.dir);

// ----------------- BASIC ROUTES -----------------

// Default GET route to check if server is running
app.get("/", (req, res) => {
  res.send("Simple CRUD Server Running");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Simple CRUD Server Running on: ${port}`);
});

// MongoDB credentials (DO NOT include in production)
/// user: simpleDBUser
/// pass: TNDkgIud1EpEwyAv
