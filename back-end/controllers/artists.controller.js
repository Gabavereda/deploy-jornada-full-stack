import Artist from "../../front-end/src/pages/Artist.jsx";
import Artist from "../models/Artist.js";

export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

