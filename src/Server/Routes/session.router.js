import { Router } from "express";
import { validateBody } from "../Middlewares/validateBody.middleware.js";
import { sessionSchema } from "../Schemas/session.schema.js";
import {loginController} from "../Controllers/session.controllers.js"

export const sessionRouter = Router()

sessionRouter.post("/", validateBody(sessionSchema), loginController)