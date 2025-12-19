import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import songsRoutes from "./routes/songs.routes.js";
import artistsRoutes from "./routes/artists.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({ origin:'https://deploy-jornada-full-stack-crgo.onrender.com'}));
app.use(express.json());

// Rotas da API
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);

// Arquivos estáticos (imagens e músicas)
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/songs", express.static(path.join(__dirname, "public", "songs")));

// Build do React (Vite)
app.use(express.static(path.join(__dirname, "public", "dist")));

// Fallback React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

export default app;
