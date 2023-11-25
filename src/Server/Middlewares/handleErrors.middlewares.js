import AppError from "../Errors/App.error.js";
import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;

export const handleErrors = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if(error instanceof JsonWebTokenError){
    return res.status(401).json({ error: error.message })
  }
  return res.status(500).json({ message: "Internal server Error" });
};
