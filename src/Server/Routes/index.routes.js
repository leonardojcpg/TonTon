import { Router } from "express";
import { userRoutes } from "./user.route.js";
import { babyRoutes } from "./baby.route.js";

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/baby", babyRoutes)