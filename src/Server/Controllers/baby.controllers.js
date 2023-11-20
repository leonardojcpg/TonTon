import { createBabyService, listBabyService } from "../Services/baby.services.js";

export const createBabyController = async (req, res) => {
  try {
    const data = {...req.body}
    const baby = await createBabyService(data);
    return res.status(201).json(baby);
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
