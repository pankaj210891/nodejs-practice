import express from "express";
import {
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserByName,
  updateUserById,
} from "../../routes/usersRoutes";

const router = express.Router();

router.route("/").get(getAllUsers).delete(deleteAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .post(updateUserById);
router.route("/:name").get(getUserByName);

export default router;
