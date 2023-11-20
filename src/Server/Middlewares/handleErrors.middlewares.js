import AppError from "../Errors/app.error.js"

export const handleErrors = (error, req, res) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({message: error.message})
    }
    console.log(error)
    return res.status(500).json({message: "Internal server Error"})
}