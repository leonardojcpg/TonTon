import express from "express";
import {
  addWeightGainController,
  deleteWeightGainController,
  getWeightGainByIdController,
  getWeightGainController,
  updateWeightGainController,
} from "../Controllers/weightGain.controllers.js";

export const weightGainRoutes = express.Router();

weightGainRoutes.post("/", addWeightGainController);
weightGainRoutes.get("/", getWeightGainController);
weightGainRoutes.get("/:babyId", getWeightGainByIdController);
weightGainRoutes.patch("/:weightGainId", updateWeightGainController);
weightGainRoutes.delete("/:weightGainId", deleteWeightGainController);
