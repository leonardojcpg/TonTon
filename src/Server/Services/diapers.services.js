import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

export const createDiaperService = async (data) => {
  try {
    const { baby_id, label, size, quantity } = data;
    const query = `
      INSERT INTO "diapers" (baby_id, label, size, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, label, size, quantity]);
    return result.rows[0];
  } catch (error) {
    throw new AppError("Error creating diaper record", error);  
  }
};


export const listDiapersService = async () => {
  try {
    const query = 'SELECT * FROM "diapers";';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new AppError("Error fetching diaper records from the database", error);
  }
};

export const listDiapersByIdService = async (diaperId) => {
  try {
    const query = 'SELECT * FROM "diapers" WHERE id = $1;';
    const result = await client.query(query, [diaperId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error fetching diaper record by ID", error);
  }
};

export const updateDiaperByIdService = async (diaperId, data) => {
  try {
    const { baby_id, label, size, quantity } = data;
    const query = `
      UPDATE "diapers"
      SET baby_id = $1, label = $2, size = $3, quantity = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await client.query(query, [baby_id, label, size, quantity, diaperId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error updating diaper record by ID", error);
  }
};

export const deleteDiaperByIdService = async (diaperId) => {
  try {
    const query = 'DELETE FROM "diapers" WHERE id = $1 RETURNING *;';
    const result = await client.query(query, [diaperId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new AppError("Error deleting diaper record by ID", error);
  }
};
