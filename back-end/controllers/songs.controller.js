import Song from "../models/Song.js";

export const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};


export const createSong = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};
