import { Router } from "express";
import {
  createDiaperController,
  listDiapersController,
  listDiapersByIdController,
  updateDiaperByIdController,
  deleteDiaperByIdController,
} from "../Controllers/diapers.controllers.js";

export const diaperRoutes = Router();

diaperRoutes.post("/", createDiaperController);
diaperRoutes.get("/", listDiapersController);
diaperRoutes.get("/:diaperId", listDiapersByIdController);
diaperRoutes.patch("/:diaperId", updateDiaperByIdController);
diaperRoutes.delete("/:diaperId", deleteDiaperByIdController);
