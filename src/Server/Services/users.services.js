import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/app.error.js";

// create user -> POST
export const createUsersService = async (data) => {
  const queryFormat = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );
  const queryResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

// list users -> GET
export const listUsersService = async (req, res) => {
  try {
    const listUserQuery = 'SELECT * FROM "users";';
    const listUserQueryResult = await client.query(listUserQuery);
    return listUserQueryResult.rows;
  } catch (error) {
    throw new AppError("Error fetching users from the database");
  }
};
// update users -> PUT
export const updateUser = async (userId, data) => {
  const updateUserQueryFormat = format(
    'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(data),
    Object.values(data)
  )

  const updateUserQueryResult = await client.query(updateUserQueryFormat, [userId])
  return updateUserQueryResult.rows[0]
};

export const deleteUser = async(userId) => {
  const deleteUserQuery = format(
    'DELETE FROM "users" WHERE "id" = $1;'
  )
  const deleteUserQueryResult = await client.query(deleteUserQuery, [userId])
  return deleteUserQueryResult.rows[0]
}
