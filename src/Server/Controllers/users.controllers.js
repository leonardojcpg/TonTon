import {
  createUsersService,
  listUsersService,
} from "../Services/users.services.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUsersService(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const listUsersController = async (req, res) => {
  try {
    const users = await listUsersService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
