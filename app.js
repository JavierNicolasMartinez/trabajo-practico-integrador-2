import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/database.js";
import { routesVarias } from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan());

app.use("/api", routesVarias);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
