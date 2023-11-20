import { Router } from "express";
import { createUserController, listUsersController } from "../Controllers/users.controllers.js";
import { verifyEmail } from "../Middlewares/verifyEmail.middleware.js";
import {verifyUserId} from "../Middlewares/verifyUserId.middlewares.js"

export const userRoutes = Router()

userRoutes.get("/", listUsersController)
userRoutes.post("/", verifyEmail, createUserController)

userRoutes.use("/userId", verifyUserId)
userRoutes.get("/userId", listUsersController)
userRoutes.patch("/userId")
userRoutes.delete("/userId")

