import {
  createUsersService,
  deleteUserService,
  listUsersByIdService,
  listUsersService,
  updateUserService,
} from "../Services/users.services.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUsersService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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

export const listUsersByIdController = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await listUsersByIdService(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserController = async (req, res) => {
  const user = await updateUserService(req.params.userId, req.body);

  return res.status(200).json(user);
};

export const deleteUserController = async (req, res) => {
  try {
    await deleteUserService(req.params.userId);
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
