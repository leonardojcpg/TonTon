import format from 'pg-format';
import { client } from '../database.js';
import AppError from '../Errors/App.error.js';

export const createBreastFeedingService = async (data) => {
  try {
    const queryFormat = format(
      'INSERT INTO "breast_feeding" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );

    const queryResult = await client.query(queryFormat);
    return queryResult.rows[0];
  } catch (error) {
    throw new AppError('Error creating breast feeding:', error);
  }
};

export const listBreastFeedingService = async () => {
  try {
    const listBreastFeedingQuery = 'SELECT * FROM "breast_feeding";';
    const listBreastFeedingQueryResult = await client.query(listBreastFeedingQuery);
    return listBreastFeedingQueryResult.rows;
  } catch (error) {
    throw new AppError('Error fetching breast feedings from the database');
  }
};

export const listBreastFeedingByIdService = async (breastFeedingId) => {
  try {
    const query = 'SELECT * FROM "breast_feeding" WHERE id = $1;';
    const result = await client.query(query, [breastFeedingId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching breast feeding by ID:', error);
    throw new AppError('Error fetching breast feeding by ID');
  }
};

export const updateBreastFeedingService = async (breastFeedingId, data) => {
  try {
    const updateBreastFeedingQueryFormat = format(
      'UPDATE "breast_feeding" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );

    const updateBreastFeedingQueryResult = await client.query(updateBreastFeedingQueryFormat, [breastFeedingId]);
    return updateBreastFeedingQueryResult.rows[0];
  } catch (error) {
    throw new AppError('Error updating breast feeding:', error);
  }
};

export const deleteBreastFeedingService = async (breastFeedingId) => {
  try {
    const deleteBreastFeedingQuery = format(
      'DELETE FROM "breast_feeding" WHERE "id" = $1 RETURNING *;'
    );

    const deleteBreastFeedingQueryResult = await client.query(deleteBreastFeedingQuery, [breastFeedingId]);
    return deleteBreastFeedingQueryResult.rows[0];
  } catch (error) {
    throw new AppError('Error deleting breast feeding:', error);
  }
};
