import dotenv from "dotenv";
import express from "express";
import { Db } from "mongodb";
import morgan from "morgan";
import { connectToDatabase } from "../src/MongoDbUtils";
import toursRouter from "./v1/tours";
import usersRouter from "./v1/users";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

// Middleware, routes, etc.

let cachedDb: Db | null = null; // Explicitly typed as MongoDB Db or null

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  cachedDb = await connectToDatabase();
  return cachedDb;
}

export default app;
