import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js"

export const createBabyService = async (data) => {
    const queryFormat = format(
      'INSERT INTO "baby" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );
    const queryResult = await client.query(queryFormat);
    return queryResult.rows[0];
  };

  export const listBabyService = async (req, res) => {
    try {
      const listBabyQuery = 'SELECT * FROM "baby";';
      const listBabyQueryResult = await client.query(listBabyQuery);
      return listBabyQueryResult.rows;
    } catch (error) {
      throw new AppError("Error fetching babies from the database");
    }
  };