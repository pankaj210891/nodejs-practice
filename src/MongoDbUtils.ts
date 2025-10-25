// db.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_CLUSTER_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);
let db: Db;

export async function connectToDatabase() {
  try {
    if (db) {
      return db; // Reuse existing connection
    }

    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}
