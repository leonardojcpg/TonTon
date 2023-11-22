import AppError from "../Errors/App.error.js"

export const verifyPermission = (req, res, next) => {
    const {userId} = req.params
    const {sub, password} = res.locals

    if(password){
        return next()
    }

    if(userId !== sub){
        throw new AppError("Insufficient permissions", 403)
    }

    return next()
}