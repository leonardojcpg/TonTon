import { Router } from "express";
import {
  createSleepController,
  listSleepController,
  listSleepByIdController,
  updateSleepByIdController,
  deleteSleepByIdController,
} from "../Controllers/sleep.controllers.js";

export const sleepRoutes = Router();

sleepRoutes.post("/", createSleepController);
sleepRoutes.get("/", listSleepController);
sleepRoutes.get("/:sleepId", listSleepByIdController);
sleepRoutes.patch("/:sleepId", updateSleepByIdController);
sleepRoutes.delete("/:sleepId", deleteSleepByIdController);
