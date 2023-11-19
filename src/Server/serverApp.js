import "dotenv/config";
import express from "express";
import { startDatabase } from "./database.js";
import { routes } from "./Routes/index.routes.js";


export const app = express();
app.use(express.json());

app.use("/", routes)


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, async () => {
  await startDatabase();
  console.log(`app running on port: ${PORT}`);
});

