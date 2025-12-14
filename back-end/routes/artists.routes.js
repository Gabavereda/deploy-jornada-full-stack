import { Router } from "express";
import Artist from "../models/Artists.js";


const router = Router();



router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar artistas" });
  }
});


// POST criar artista
router.post("/", async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar artista" });
  }
});


export default router;
