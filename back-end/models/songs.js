import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    name: String,
    artist: String,
    duration: String,
    image: String,
    audio: String
});

export default mongoose.model("Song", SongSchema);
