import { Router } from "express";
import {
  associateUserBabyController,
  disassociateUserBabyController,
  listBabyIdForUserController,
} from "../Controllers/user_baby.controllers.js";

export const userBabyRoutes = Router();

userBabyRoutes.post(
  "/:userId/baby/:babyId/associate",
  associateUserBabyController
);
userBabyRoutes.delete(
  "/:userId/baby/:babyId/disassociate",
  disassociateUserBabyController
);

userBabyRoutes.get("/:userId/baby", listBabyIdForUserController);
