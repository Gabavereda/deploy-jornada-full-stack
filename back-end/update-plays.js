import mongoose from "mongoose";
import dotenv from "dotenv";
import Song from "./models/Songs.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB conectado");
    
    // Atualiza todas as músicas que NÃO têm o campo plays
    const result = await Song.updateMany(
      { plays: { $exists: false } }, // só as que não têm o campo
      { $set: { plays: 0 } }
    );
    
    console.log(`✅ ${result.modifiedCount} músicas atualizadas!`);
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Erro:", err);
    process.exit(1);
  });