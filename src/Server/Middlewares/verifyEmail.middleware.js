import { client } from "../database.js";
import AppError from "../Errors/app.error.js";

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  try {
    const query = 'SELECT * FROM "users" WHERE "email" = $1';
    const queryResult = await client.query(query, [email]);

    if (queryResult.rowCount) {
      throw new AppError("Email already exists.", 409);
    }
    
    return next();

  } catch (error) {
    return next(error);
  }
};
