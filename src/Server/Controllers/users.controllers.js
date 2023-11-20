import {
  createUsersService,
  deleteUserService,
  listUsersById,
  listUsersService,
  updateUserService,
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

export const listUsersByIdController = async(req, res) => {
  const users = await listUsersById()

  return res.status(200).json(users)
}

export const updateUserController = async(res, req) => {
  const user = await updateUserService(req.params.userId, req.body)

  return res.status(200).json(user)
}

export const deleteUserController = async(res, req) => {
  await deleteUserService(req.params.userId)

  return res.status(204).json()
}