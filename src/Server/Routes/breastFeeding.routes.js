import { Router } from "express"
import {createBreastFeedingController, listBreastFeedingsController, listBreastFeedingsByIdController, updateBreastFeedingController, deleteBreastFeedingController} from "../Controllers/breastFeeding.controllers.js"

export const breastFeedingRoutes = Router()

breastFeedingRoutes.post('/', createBreastFeedingController);
breastFeedingRoutes.get('/', listBreastFeedingsController);
breastFeedingRoutes.get('/:breastFeedingId', listBreastFeedingsByIdController);
breastFeedingRoutes.patch('/:breastFeedingId', updateBreastFeedingController);
breastFeedingRoutes.delete('/:breastFeedingId', deleteBreastFeedingController);