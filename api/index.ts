import express from "express";
import { connectToDatabase } from "../src/MongoDbUtils";
import toursRouter from "./v1/tours";
import usersRouter from "./v1/users";
import { Db } from "mongodb";
import morgan from "morgan";

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
