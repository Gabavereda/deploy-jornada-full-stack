import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { getSongs } from "/api/api.js"; // Certifique-se que este caminho está correto

const Song = () => {
  const { id } = useParams();
  const [songObj, setSongObj] = useState(null);
  const [songsFromArtist, setSongsFromArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Definir a URL do Backend para mídias
  const urlBackend = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    async function loadSong() {
      try {
        const allSongs = await getSongs();

        const currentSong = allSongs.find((song) => song._id === id);

        if (!currentSong) return;

        setSongObj(currentSong);

        const artistSongs = allSongs.filter(
          (song) => song.artist === currentSong.artist
        );

        setSongsFromArtist(artistSongs);
      } catch (error) {
        console.error("Erro ao carregar música:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSong();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!songObj) return <p>Música não encontrada</p>;

  const { image, name, duration, artist, audio } = songObj;

  // 2️⃣ Formatar URLs de imagem e áudio (evitando duplicação de barras)
  const fullImagePath = image.startsWith('http') ? image : `${urlBackend}${image}`;
  const fullAudioPath = audio.startsWith('http') ? audio : `${urlBackend}${audio}`;

  // 3️⃣ IDs aleatórios para o Player
  const randomIndex1 = Math.floor(Math.random() * songsFromArtist.length);
  const randomIndex2 = Math.floor(Math.random() * songsFromArtist.length);

  const randomIdFromArtist = songsFromArtist[randomIndex1]?._id;
  const randomId2FromArtist = songsFromArtist[randomIndex2]?._id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          {/* USANDO A URL COMPLETA */}
          <img src={fullImagePath} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        {/* Removi a verificação de artistObj que não existia ou use a imagem da música */}
        <div className="song__artist-image">
          <img
            width={75}
            height={75}
            src={fullImagePath}
            alt={`Imagem do Artista ${artist}`}
          />
        </div>

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={fullAudioPath} // ENVIANDO O ÁUDIO COM A URL DO BACKEND
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;