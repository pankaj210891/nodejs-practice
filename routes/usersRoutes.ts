import { Request, Response } from "express";
import users from "../src/dev-data/data/users.json";

const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Fetched all users successfully",
    data: users,
  });
};

const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;

  const foundUser = users.find((user) => user.id == Number(userId));

  if (foundUser) {
    res.status(200).json({
      status: "success",
      message: "Fetched user details successfully.",
      data: foundUser,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: `User with ID ${userId} not found.`,
    });
  }
};

export { getAllUsers, getUserById };
