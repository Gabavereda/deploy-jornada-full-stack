import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import songsRoutes from "./routes/songs.routes.js";
import artistsRoutes from "./routes/artists.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 🎵 arquivos MP3
app.use(
  "/songs",
  express.static(path.resolve("public/songs"))
);

app.use(
  "/images",
  express.static(path.resolve("public/images"))
);

// 🎧 API
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
