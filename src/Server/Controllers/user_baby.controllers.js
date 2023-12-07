import AppError from "../Errors/App.error.js";
import {
  associateUserBabyService,
  disassociateUserBabyService,
  listBabyIdForUserService,
} from "../Services/user_baby.services.js";

export const associateUserBabyController = async (req, res) => {
  const { userId, babyId } = req.params;

  try {
      const updatedBaby = await associateUserBabyService(userId, babyId);
      return res.status(200).json(updatedBaby);
  } catch (error) {
      throw new AppError('Error associating user and baby:', error);
  }
}

export const listBabyIdForUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    const babyId = await listBabyIdForUserService(userId);
    return res.status(200).json({ babyId });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const disassociateUserBabyController = async (req, res) => {
  const { userId, babyId } = req.params;

  try {
    await disassociateUserBabyService(userId, babyId);
    return res
      .status(200)
      .json({ message: "User and baby disassociated successfully" });
  } catch (error) {
    throw new AppError("Error disassociating user and baby");
  }
};
