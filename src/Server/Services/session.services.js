import pkg from "jsonwebtoken";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

const {sign} = pkg
export const loginService = async (data) => {
  const loginQuery = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [data.email]
  );

  if (loginQuery.rowCount === 0) {
    throw new AppError("Email does not exist.", 404);
  }

  const user = loginQuery.rows[0];
  if (user.password !== data.password) {
    throw new AppError("Password or email is incorrect.");
  }

  const token = sign(
    { email: user.email, password: user.password },
    process.env.JWT_SECRET,
    { subject: user.id.toString(), expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return { token };
};
