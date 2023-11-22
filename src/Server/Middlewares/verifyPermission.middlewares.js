import { verify } from "jsonwebtoken"
import AppError from "../Errors/App.error"

export const verifyToken = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization){
        throw new AppError("Missing JWT token", 401)
    }
    const token = authorization.split(" ")[1]
    const decoded = verify(token, process.env.JWT_SECRET)
    res.locals = {...res.locals, decoded}
    return next()
}