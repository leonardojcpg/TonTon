import { Router } from "express";
import {
  createBabyController,
} from "../Controllers/baby.controllers.js";


export const babyRoutes = Router();

babyRoutes.post("/", createBabyController);