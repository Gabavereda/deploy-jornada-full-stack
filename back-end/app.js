import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import songsRoutes from "./routes/songs.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/songs", songsRoutes);

app.use("/songs", express.static("public/songs"));

// mongo db

mongoose.conect(process.env.MONGO_URI)
    .then(() => console.log("mongoDb conected"))
    .catch(err => console.error(err));

export default app;