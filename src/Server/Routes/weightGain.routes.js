import express from "express";
import { addWeightHistoryController, getWeightHistoryController } from "../Controllers/weightGain.controllers.js";

export const weightGainRoutes = express.Router();

weightGainRoutes.post("/", addWeightHistoryController);
weightGainRoutes.get("/", getWeightHistoryController);

