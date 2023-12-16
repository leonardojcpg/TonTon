import format from "pg-format";
import { client } from "../database.js";
import AppError from "../Errors/App.error.js";

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

export const listBabiesByIdService = async (babyId) => {
  try {
    if (babyId === null || isNaN(babyId) || !Number.isInteger(Number(babyId))) {
      throw new AppError("Invalid babyId parameter");
    }

    const query = "SELECT * FROM baby WHERE id = $1";

    const result = await client.query(query, [babyId]);

    if (result.rows.length === 0) {
      return null;
    }

    const baby = result.rows[0];
    return baby;
  } catch (error) {
    console.error("Error fetching baby by ID:", error);
    throw new Error("Error fetching baby by ID");
  }
};


export const updateBabyService = async (babyId, data) => {
  const updateBabyQueryFormat = format(
    'UPDATE "baby" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const updateBabyQueryResult = await client.query(updateBabyQueryFormat, [
    babyId,
  ]);
  return updateBabyQueryResult.rows[0];
};

export const deleteBabyService = async (babyId) => {
  const deleteBabyQuery = format('DELETE FROM "baby" WHERE "id" = $1;');
  const deleteBabyQueryResult = await client.query(deleteBabyQuery, [babyId]);
  return deleteBabyQueryResult.rows[0];
};
