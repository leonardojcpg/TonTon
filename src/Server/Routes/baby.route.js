import { Router } from "express";
import {
  createBabyController,
  listBabiesByIdController,
  listBabyController,
  updateBabyController,
  deleteBabyController,
} from "../Controllers/baby.controllers.js";

export const babyRoutes = Router();

babyRoutes.post("/", createBabyController);
babyRoutes.get("/", listBabyController);
babyRoutes.get("/:babyId", listBabiesByIdController);
babyRoutes.patch("/:babyId", updateBabyController);
babyRoutes.delete("/:babyId", deleteBabyController);
babyRoutes.post("/:userId", createBabyController);
