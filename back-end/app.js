import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import songsRoutes from "./routes/songs.routes.js";
import artistsRoutes from "./routes/artists.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);


app.use("/songs", express.static("public/songs"));
app.use("/artists", express.static("public/images"));


// mongo db

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDb conected"))
    .catch(err => console.error(err));

export default app;