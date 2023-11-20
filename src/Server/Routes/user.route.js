import { Router } from "express";
import { createUserController, listUsersController } from "../Controllers/users.controllers.js";
import { verifyEmail } from "../Middlewares/verifyEmail.middleware.js";

export const userRoutes = Router()

userRoutes.get("/", listUsersController)
userRoutes.post("/", verifyEmail, createUserController)
userRoutes.patch("/", createUserController)
userRoutes.delete("/", createUserController)

