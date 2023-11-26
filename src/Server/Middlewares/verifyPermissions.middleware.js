import AppError from "../Errors/App.error.js"

export const verifyPermission = (req, res, next) => {
    const {userId} = req.params
    const {sub, password} = res.locals.decoded

    if(password){
        return next()
    }

    if(userId !== sub){
        throw new AppError("Insufficient permissions", 401)
    }

    return next()
}