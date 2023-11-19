import { Router } from "express";
import { createUserController } from "../Controllers/users.controllers.js";

export const userRoutes = Router()

userRoutes.get("/", createUserController)
userRoutes.post("/", createUserController)
userRoutes.patch("/", createUserController)
userRoutes.delete("/", createUserController)

