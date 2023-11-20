import { createUsersService, listUsersService } from "../Services/users.services.js"

export const createUserController = async(req, res) => {
    const user = createUsersService(req.body)
    return res.status(200).json(user)
}


export const listUsersController = async (req, res) => {
    try {
      const users = await listUsersService();
      console.log('Users:', users);

  
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };