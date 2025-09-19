import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// app.use("/api", routesVarias);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
