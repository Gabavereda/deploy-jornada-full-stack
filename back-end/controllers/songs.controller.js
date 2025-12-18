import Artist from "../../front-end/src/pages/Artist.jsx";
import Song from "../models/song.js";

export const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};


export const createSong = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};
