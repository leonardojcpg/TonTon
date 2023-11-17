import "dotenv/config";
import express from "express";
import { startDatabase } from "./database.js";


export const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, async () => {
  await startDatabase();
  console.log("app running!");
});

