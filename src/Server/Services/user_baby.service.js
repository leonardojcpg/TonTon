import { client } from "../database.js";

export const associateUserBabyService = async (userId, babyId) => {
  const query = 'INSERT INTO "user_baby" (user_id, baby_id) VALUES ($1, $2);';
  await client.query(query, [userId, babyId]);
};

export const disassociateUserBabyService = async (userId, babyId) => {
  const query = 'DELETE FROM "user_baby" WHERE user_id = $1 AND baby_id = $2;';
  await client.query(query, [userId, babyId]);
};
