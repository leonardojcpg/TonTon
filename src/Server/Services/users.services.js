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
// list user by id -> GET
export const listUsersById = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
