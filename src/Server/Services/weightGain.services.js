import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

export const addWeightGainService = async ({ babyId, weight }) => {
  try {
    const currentDate = new Date().toISOString();
    const dataWithDate = { baby_id: babyId, weight: weight, date: currentDate };

    const addWeightHistoryQuery = format(
      'INSERT INTO "weight_gain" (%I) VALUES (%L) RETURNING *;',
      Object.keys(dataWithDate),
      Object.values(dataWithDate)
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
      'SELECT * FROM "weight_gain" ORDER BY "date" DESC;',
      babyId
    );

    const getWeightHistoryResult = await client.query(getWeightHistoryQuery);
    return getWeightHistoryResult.rows;
  } catch (error) {
    console.error("Error fetching weight history:", error);
    throw new AppError("Error fetching weight history");
  }
};

export const getWeightGainByIdService = async (babyId) => {
  try {
    if (babyId === null || babyId === undefined) {
      throw new AppError("Invalid babyId parameter");
    }

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

export const updateWeightGainService = async (weightGainId, data) => {
  const { baby_id, weight, date } = data;
  try {
    const query = `
      UPDATE "weight_gain"
      SET baby_id = $1, weight = $2, date = $3
      WHERE id = $4
      RETURNING *;
    `;

    const result = await client.query(query, [
      baby_id,
      weight,
      date,
      weightGainId,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating weight history:", error);
    throw new AppError("Error updating weight history");
  }
};

export const deleteWeightGainService = async (weightGainId) => {
  try {
    const queryFormat = format(
      'DELETE FROM "weight_gain" WHERE "id" = %L RETURNING *;',
      weightGainId
    );

    const queryResult = await client.query(queryFormat);
    return queryResult.rows[0];
  } catch (error) {
    console.error("Error deleting weight history:", error);
    throw new AppError("Error deleting weight history");
  }
};
