import format from "pg-format";
import { client } from "../database.js";

export const createBabyService = async (data) => {
    const queryFormat = format(
      'INSERT INTO "baby" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );
    const queryResult = await client.query(queryFormat);
    return queryResult.rows[0];
  };