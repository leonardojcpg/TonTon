import "express-async-errors"
import "dotenv/config";
import express from "express";
import { startDatabase } from "./database.js";
import { routes } from "./Routes/index.routes.js";
import { handleErrors } from "./Middlewares/handleErrors.middlewares.js";
import cors from 'cors';


export const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes)
app.use(handleErrors)

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, async () => {
  await startDatabase();
  console.log(`app running on port: ${PORT}`);
});

