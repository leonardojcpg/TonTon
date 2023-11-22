import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersByIdController,
  listUsersController,
  updateUserController,
} from "../Controllers/users.controllers.js";
import { verifyEmail } from "../Middlewares/verifyEmail.middleware.js";
import { verifyUserId } from "../Middlewares/verifyUserId.middlewares.js";
import { verifyToken } from "../Middlewares/verifyPermission.middlewares.js";

export const userRoutes = Router();

userRoutes.get("/", listUsersController);
userRoutes.post("/", verifyEmail, createUserController);

userRoutes.use("/:userId", verifyToken, verifyUserId);
userRoutes.get("/:userId", verifyUserId, listUsersByIdController);
userRoutes.patch("/:userId", verifyEmail, updateUserController);
userRoutes.delete("/:userId", deleteUserController);
