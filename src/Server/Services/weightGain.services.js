import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

export const addWeightGainService = async (babyId, weight, date = new Date()) => {
  try {
    const addWeightHistoryQuery = format(
      'INSERT INTO "weight_gain" ("baby_id", "weight", "date") VALUES (%L, %L, %L) RETURNING *;',
      babyId,
      weight,
      date
    );

    const addWeightHistoryResult = await client.query(addWeightHistoryQuery);
    return addWeightHistoryResult.rows[0];
  } catch (error) {
    console.error("Error adding weight history:", error);
    throw new AppError("Error adding weight history");
  }
};

export const getWeightGainService = async (babyId) => {
  try {
    const getWeightHistoryQuery = format(
      'SELECT * FROM "weight_gain" WHERE "baby_id" = %L ORDER BY "date" DESC;',
      babyId
    );

    const getWeightHistoryResult = await client.query(getWeightHistoryQuery);
    return getWeightHistoryResult.rows;
  } catch (error) {
    console.error("Error fetching weight history:", error);
    throw new AppError("Error fetching weight history");
  }
};
