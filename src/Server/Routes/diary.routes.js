import { Router } from "express";
import {
  createDiaryController,
  listDiaryController,
  listDiaryByIdController,
  updateDiaryByIdController,
  deleteDiaryByIdController,
} from "../Controllers/diary.controllers.js";

export const diaryRoutes = Router();

diaryRoutes.post("/", createDiaryController);
diaryRoutes.get("/", listDiaryController);
diaryRoutes.get("/:diaryId", listDiaryByIdController);
diaryRoutes.patch("/:diaryId", updateDiaryByIdController);
diaryRoutes.delete("/:diaryId", deleteDiaryByIdController);
