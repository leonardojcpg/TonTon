import { Router } from "express";
import { userRoutes } from "./user.route.js";
import { babyRoutes } from "./baby.route.js";
import { userBabyRoutes } from "./user_baby.routes.js";
import { breastFeedingRoutes } from "./breastFeeding.routes.js";
import { sleepRoutes } from "./sleep.routes.js";

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/baby", babyRoutes)
routes.use("/user_baby", userBabyRoutes);
routes.use("/breast_feeding", breastFeedingRoutes)
routes.use("/sleep", sleepRoutes)