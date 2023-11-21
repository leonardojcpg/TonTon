import {
  createBabyService,
  deleteBabyService,
  listBabiesByIdService,
  listBabyService,
  updateBabyService,
} from "../Services/baby.services.js";

export const createBabyController = async (req, res) => {
  try {
      const data = { ...req.body };
      const baby = await createBabyService(data);

      const associatedUserId = req.body.userId || null;
      const babyWithAssociation = { ...baby, associatedUserId };

      return res.status(201).json(babyWithAssociation);
  } catch (error) {
      console.error("Error creating baby:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const listBabyController = async (req, res) => {
  try {
    const babies = await listBabyService();
    return res.status(200).json(babies);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const listBabiesByIdController = async (req, res) => {
  const babyId = req.params.babyId;

  try {
    const baby = await listBabiesByIdService(babyId);

    if (!baby) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(baby);
  } catch (error) {
    console.error("Error fetching baby by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBabyController = async (req, res) => {
  const baby = await updateBabyService(req.params.babyId, req.body);

  return res.status(200).json(baby);
};

export const deleteBabyController = async (req, res) => {
  try {
    await deleteBabyService(req.params.babyId);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting baby:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
