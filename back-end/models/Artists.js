import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        banner: String,
        bio: String
    },
    { timestamps: true }
);

export default mongoose.model("Artist", artistSchema);
