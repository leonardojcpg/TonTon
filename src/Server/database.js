import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB,
  port: Number(process.env.DB_PORT),
});

export const startDatabase = async () => {
  await client.connect();
};
