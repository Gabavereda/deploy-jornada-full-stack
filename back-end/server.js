import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songsRoutes from "./routes/songs.routes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// arquivos estáticos (MP3)
app.use(
  "/songs",
  express.static(path.resolve("public/songs"))
);

app.use("/songs-api", songsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
