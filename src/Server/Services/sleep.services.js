import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

export const createSleepService = async (data) => {
  try {
    const { baby_id, date, start_time, duration } = data;
    const query = `
      INSERT INTO "sleep" (baby_id, date, start_time, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, date, start_time, duration]);
    return result.rows[0];
  } catch (error) {
    throw new AppError("Error creating sleep record", error);
  }
};

export const listSleepService = async () => {
  try {
    const query = 'SELECT * FROM "sleep";';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new AppError("Error fetching sleep records from the database", error);
  }
};

export const listSleepByIdService = async (sleepId) => {
  try {
    const query = 'SELECT * FROM "sleep" WHERE id = $1;';
    const result = await client.query(query, [sleepId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error fetching sleep record by ID", error);
  }
};

export const updateSleepByIdService = async (sleepId, data) => {
  try {
    const { baby_id, date, start_time, duration } = data;
    const query = `
      UPDATE "sleep"
      SET baby_id = $1, date = $2, start_time = $3, duration = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, date, start_time, duration, sleepId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error updating sleep record by ID", error);
  }
};

export const deleteSleepByIdService = async (sleepId) => {
  try {
    const query = 'DELETE FROM "sleep" WHERE id = $1 RETURNING *;';
    const result = await client.query(query, [sleepId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error deleting sleep record by ID", error);
  }
};
