import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("MongoDB URI not found!");
}

const uri = process.env.DB_URI;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Global client cache (only in dev)
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    //console.log("development");   
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, don't use global to avoid memory leaks
  console.log("production");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db("next_blog_db");
  return db.collection(collectionName);
}
