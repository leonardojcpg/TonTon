import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

export const createDiaryService = async (data) => {
  try {
    const { baby_id, date, hour, observation } = data;
    const query = `
      INSERT INTO "diary" (baby_id, date, hour, observation)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, date, hour, observation]);
    return result.rows[0];
  } catch (error) {
    throw new AppError("Error creating diary entry", error);
  }
};

export const listDiaryService = async () => {
  try {
    const query = 'SELECT * FROM "diary";';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new AppError("Error fetching diary entries from the database", error);
  }
};

export const listDiaryByIdService = async (diaryId) => {
  try {
    const query = 'SELECT * FROM "diary" WHERE id = $1;';
    const result = await client.query(query, [diaryId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error fetching diary entry by ID", error);
  }
};

export const updateDiaryByIdService = async (diaryId, data) => {
  try {
    const { baby_id, date, hour, observation } = data;
    const query = `
      UPDATE "diary"
      SET baby_id = $1, date = $2, hour = $3, observation = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, date, hour, observation, diaryId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error updating diary entry by ID", error);
  }
};

export const deleteDiaryByIdService = async (diaryId) => {
  try {
    const query = 'DELETE FROM "diary" WHERE id = $1 RETURNING *;';
    const result = await client.query(query, [diaryId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error deleting diary entry by ID", error);
  }
};
