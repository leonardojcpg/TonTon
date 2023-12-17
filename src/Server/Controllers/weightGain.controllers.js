import { addWeightGainService, getWeightGainService } from "../Services/weightGain.services.js";

export const addWeightHistoryController = async (req, res, next) => {
  try {
    const { babyId, weight } = req.body;
    const weightHistoryEntry = await addWeightGainService(babyId, weight);
    res.status(201).json(weightHistoryEntry);
  } catch (error) {
    next(error);
  }
};

export const getWeightHistoryController = async (req, res, next) => {
  try {
    const { babyId } = req.params;
    const weightHistory = await getWeightGainService(babyId);
    res.json(weightHistory);
  } catch (error) {
    next(error);
  }
};
