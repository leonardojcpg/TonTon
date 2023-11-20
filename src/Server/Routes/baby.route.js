import { Router } from "express";
import {
  createBabyController, listBabyController,
} from "../Controllers/baby.controllers.js";


export const babyRoutes = Router();

babyRoutes.post("/", createBabyController);
babyRoutes.get("/", listBabyController);


/* 
babyRoutes.get("/:babyId", createBabyController);
babyRoutes.patch("/:babyId", createBabyController);
babyRoutes.delete("/:babyId", createBabyController); 
*/