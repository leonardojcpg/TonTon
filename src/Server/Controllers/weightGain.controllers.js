import {
  addWeightGainService,
  deleteWeightGainService,
  getWeightGainByIdService,
  getWeightGainService,
  updateWeightGainService,
} from "../Services/weightGain.services.js";

export const addWeightGainController = async (req, res) => {
  try {
    const { baby_id, weight } = req.body;

    const babyId = Number(baby_id);
    const weightHistory = await addWeightGainService({ babyId, weight });

    return res.status(201).json(weightHistory);
  } catch (error) {
    console.error("Error adding weight history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWeightGainController = async (req, res, next) => {
  try {
    const { babyId } = req.params;
    const weightHistory = await getWeightGainService(babyId);
    res.json(weightHistory);
  } catch (error) {
    next(error);
  }
};

export const getWeightGainByIdController = async (req, res) => {
  const babyId = req.params.babyId;

  try {
    if (babyId === null || isNaN(babyId) || !Number.isInteger(Number(babyId))) {
      return res.status(400).json({ error: "Invalid babyId parameter" });
    }

    const weightHistory = await getWeightGainByIdService(babyId);

    return res.status(200).json(weightHistory);
  } catch (error) {
    console.error("Error fetching weight history by baby ID:", error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};


export const updateWeightGainController = async (req, res) => {
  const weightGainId = req.params.weightGainId;
  try {
    const updatedData = req.body;
    const updatedWeightHistory = await updateWeightGainService(weightGainId, updatedData);

    res.status(200).json(updatedWeightHistory);
  } catch (error) {
    console.error("Error updating weight history:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};


export const deleteWeightGainController = async (req, res) => {
  const weightGainId = req.params.weightGainId;

  try {
    const deletedWeightHistory = await deleteWeightGainService(weightGainId);
    return res.status(200).json(deletedWeightHistory);
  } catch (error) {
    console.error("Error deleting weight history:", error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};
