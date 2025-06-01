import "server-only"

import { MongoClient, ServerApiVersion } from "mongodb";

if(!process.env.DB_URI){
    throw new Error('Mongod URI not found!');
}

const client = new MongoClient(process.env.DB_URI,{
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//connections
async function getDB(dbName) {
    try {
        await client.connect();
        console.log(">>>Connected to DB <<<");
        return client.db(dbName);
    } catch (error) {
        console.log(error)
    }
}
//getter
export async function getCollection(collectionName){
    const db = await getDB('next_blog_db'); //db name && if not exist will create this db
    if (db) return db.collection(collectionName);
    
    return null;
}