import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: String,
    artist: String,
    duration: String,
    image: String,
    audio: {
        type: String,
        required: true
    },
    plays: { type: Number, default: 0 }, // count
}, { timestamps: true });


export default mongoose.model("Songs", songSchema);
