import { Router } from "express";
import { userRoutes } from "./user.route.js";

export const routes = Router()

routes.use("/users", userRoutes)
