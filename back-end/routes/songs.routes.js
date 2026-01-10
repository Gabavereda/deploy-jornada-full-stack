import { Router } from "express";
import Song from "../models/Songs.js";

const router = Router();

// all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar músicas" });
  }
});

// create song
router.post("/", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar música" });
  }
});


// count player

router.post("/:id/play", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } }, // increment by 1
      { new: true }  //return
    );

    if (!song) {
      return res.status(404).json({ message: "música não encontrada" });
    }
    res.json({ plays: song.plays });
  } catch (error) {
    res.status(500).json({ error: "incremento não aplicado" })
  }
});

export default router;
