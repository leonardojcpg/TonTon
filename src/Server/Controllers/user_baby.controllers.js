import AppError from "../Errors/App.error.js";
import { associateUserBabyService, disassociateUserBabyService } from "../Services/user_baby.service.js";

export const associateUserBabyController = async (req, res) => {
    const { userId, babyId } = req.params;
  
    try {
      await associateUserBabyService(userId, babyId);
      return res.status(200).json({ message: 'User and baby associated successfully' });
    } catch (error) {
      console.error('Error associating user and baby:', error);
      throw new AppError('Error associating user and baby');
    }
};

// disassociateUserBabyController
export const disassociateUserBabyController = async (req, res) => {
    const { userId, babyId } = req.params;
  
    try {
      await disassociateUserBabyService(userId, babyId);
      return res.status(200).json({ message: 'User and baby disassociated successfully' });
    } catch (error) {
      console.error('Error disassociating user and baby:', error);
      throw new AppError('Error disassociating user and baby');
    }
};
