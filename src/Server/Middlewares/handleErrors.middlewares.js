import AppError from "../Errors/App.error.js";
import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;

export const handleErrors = (error, req, res, next) => {
  if (error instanceof AppError) {
    const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
    return res.status(statusCode).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ error: error.message });
  }
  return res.status(500).json({ message: "Internal server Error" });
};
