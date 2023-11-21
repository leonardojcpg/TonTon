import AppError from "../Errors/App.error.js";
import {
  createBreastFeedingService,
  deleteBreastFeedingService,
  listBreastFeedingByIdService,
  listBreastFeedingService,
  updateBreastFeedingService,
} from "../Services/breastFeeding.services.js";

export const createBreastFeedingController = async (req, res) => {
  try {
    const data = { ...req.body };
    const breastFeeding = await createBreastFeedingService(data);
    return res.status(201).json(breastFeeding);
  } catch (error) {
    throw new AppError("Error creating breast feeding:", error);
  }
};

export const listBreastFeedingsController = async (req, res) => {
  try {
    const breastFeedings = await listBreastFeedingService();
    return res.status(200).json(breastFeedings);
  } catch (error) {
    throw new AppError("Error listing breast feeding:", error);
  }
};

export const listBreastFeedingsByIdController = async (req, res) => {
  const breastFeedingId = req.params.breastFeedingId;

  try {
    const breastFeeding = await listBreastFeedingByIdService(breastFeedingId);

    if (!breastFeeding) {
      return res.status(404).json({ error: "Breast feeding not found" });
    }

    return res.status(200).json(breastFeeding);
  } catch (error) {
    throw new AppError("Error fetching breast feeding:", error);
  }
};

export const updateBreastFeedingController = async (req, res) => {
  const breastFeeding = await updateBreastFeedingService(
    req.params.breastFeedingId,
    req.body
  );

  return res.status(200).json(breastFeeding);
};

export const deleteBreastFeedingController = async (req, res) => {
  try {
    await deleteBreastFeedingService(req.params.breastFeedingId);
    return res.status(204).send();
  } catch (error) {
    throw new AppError("Error deleting breast feeding:", error);
  }
};
