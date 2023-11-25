import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

import pkg from 'bcryptjs';
const { hash } = pkg;

export const createUsersService = async (data) => {
  //password hashing - use 10 always for better security and performance
  data.password = await hash(data.password, 10)

  const queryFormat = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );
  const queryResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

export const listUsersService = async (req, res) => {
  try {
    const listUserQuery = 'SELECT * FROM "users";';
    const listUserQueryResult = await client.query(listUserQuery);
    return listUserQueryResult.rows;
  } catch (error) {
    throw new AppError("Error fetching users from the database");
  }
};

export const listUsersByIdService = async (userId) => {
  try {
    console.log("UserID:", userId);
    const query = "SELECT * FROM users WHERE id = $1";
    console.log("Query:", query);

    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Error fetching user by ID");
  }
};

export const updateUserService = async (userId, data) => {
  const updateUserQueryFormat = format(
    'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const updateUserQueryResult = await client.query(updateUserQueryFormat, [
    userId,
  ]);
  return updateUserQueryResult.rows[0];
};

export const deleteUserService = async (userId) => {
  const deleteUserQuery = format('DELETE FROM "users" WHERE "id" = $1;');
  const deleteUserQueryResult = await client.query(deleteUserQuery, [userId]);
  return deleteUserQueryResult.rows[0];
};
