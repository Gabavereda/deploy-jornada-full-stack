import { Router } from "express";
import Song from "../models/Song.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar músicas" });
    }
});

export default router;
