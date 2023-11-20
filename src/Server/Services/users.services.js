import format from "pg-format"
import { client } from "../database.js"

// create user -> POST
export const createUsersService = async (data) => {
  const queryFormat = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *',
    Object.keys(data),
    Object.values(data)
  )
  const queryResult = await client.query(queryFormat)
  return queryResult.rows[0]
};

// list users -> GET
export const listUsersService = async(req, res) => {
  try{
    const listUserQuery = 'SELECT * FROM "users";'

    const listUserQueryResult = await client.query(listUserQuery)
    return listUserQueryResult.rows;
  } catch(error){
    throw new Error("Error fetching users from the database")
  }
}