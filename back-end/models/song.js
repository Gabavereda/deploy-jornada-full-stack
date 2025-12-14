import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        name: String,
        artist: String,
        duration: String,
        image: String,
        audio: String,
    },
    { timestamps: true }
);

export default mongoose.model("Song", songSchema);
