import { createUsersService } from "../Services/users.services.js"

export const createUserController = async(req, res) => {
    const user = await createUsersService(req.body)
    return res.status(200).json(user)
}