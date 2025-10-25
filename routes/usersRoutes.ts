import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../api";

const getAllUsers = async (req: Request, res: Response) => {
  const db = await getDb();

  const userDbName = process.env.USER_DB_NAME;
  if (!userDbName) {
    return res
      .status(500)
      .json({ status: "error", message: "USER_DB_NAME not configured" });
  }

  const users = await db.collection(userDbName).find().toArray();

  res.status(200).json({
    status: "success",
    message: "Fetched all users successfully",
    users,
  });
};

async function getUserById(req: Request, res: Response) {
  const db = await getDb();
  const userDbName = process.env.USER_DB_NAME;

  const id = req.params.id;

  if (id) {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  } else {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!userDbName) {
    return res
      .status(500)
      .json({ status: "error", message: "USER_DB_NAME not configured" });
  }

  try {
    const user = await db
      .collection(userDbName)
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Fetched user details successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Failed to fetch user by ID", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteUserById(req: Request, res: Response) {
  const db = await getDb();
  const id = req.params.id;

  if (id) {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  } else {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const userDbName = process.env.USER_DB_NAME;
  if (!userDbName) {
    return res
      .status(500)
      .json({ status: "error", message: "USER_DB_NAME not configured" });
  }

  try {
    const result = await db
      .collection(userDbName)
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateUserById(req: Request, res: Response) {
  const db = await getDb();
  const id = req.params.id;
  const updateData = req.body;

  console.log("db", db, id, updateData);

  if (id) {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  } else {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const userDbName = process.env.USER_DB_NAME;
  if (!userDbName) {
    return res
      .status(500)
      .json({ status: "error", message: "USER_DB_NAME not configured" });
  }

  try {
    const result = await db
      .collection(userDbName)
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Failed to update user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserByName(req: Request, res: Response) {
  const db = await getDb();
  const userDbName = process.env.USER_DB_NAME;

  const name = req.params.name;

  if (!userDbName) {
    return res
      .status(500)
      .json({ status: "error", message: "USER_DB_NAME not configured" });
  }

  try {
    const user = await db.collection(userDbName).findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Fetched user details successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Failed to fetch user by ID", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
  getUserByName,
};
