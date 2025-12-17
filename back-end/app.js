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

app.use(cors());
app.use(express.json());

/* ===========================
   🎧 API
=========================== */
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);

/* ===========================
   🌐 FRONT (Vite build)
=========================== */
app.use(express.static(path.join(__dirname, "public", "dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "dist", "index.html")
  );
});

/* ===========================
   🧠 MongoDB
=========================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro MongoDB:", err));

export default app;
