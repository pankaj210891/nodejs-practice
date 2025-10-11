import express from "express";
import { getAllUsers, getUserById } from "../../routes/usersRoutes";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);

export default router;
