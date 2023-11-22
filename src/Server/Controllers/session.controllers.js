import { loginService } from "../Services/session.services.js"

export const loginController = async(req, res) => {
    const token = await loginService(req.body)
    return res.status(200).json(token)
}