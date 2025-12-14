import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { getSongs,getArtists } from "/api/api.js";


const Song = () => {
  const { id } = useParams(); // id do Mongo (_id)
  const [songObj, setSongObj] = useState(null);
  const [songsFromArtist, setSongsFromArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSong() {
      try {
        const allSongs = await getSongs();

        // 1️⃣ Música atual
        const currentSong = allSongs.find(
          (song) => song._id === id
        );

        if (!currentSong) return;

        setSongObj(currentSong);

        // 2️⃣ Músicas do mesmo artista
        const artistSongs = allSongs.filter(
          (song) => song.artist === currentSong.artist
        );

        setSongsFromArtist(artistSongs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSong();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!songObj) return <p>Música não encontrada</p>;

  const { image, name, duration, artist, audio } = songObj;

  // 3️⃣ Buscar artista (continua local)
  const artistObj = getArtists(
    (artistObj) => artistObj.name === artist
  );

  // 4️⃣ IDs aleatórios seguros
  const randomIndex1 = Math.floor(
    Math.random() * songsFromArtist.length
  );
  const randomIndex2 = Math.floor(
    Math.random() * songsFromArtist.length
  );

  const randomIdFromArtist =
    songsFromArtist[randomIndex1]?._id;
  const randomId2FromArtist =
    songsFromArtist[randomIndex2]?._id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        {artistObj && (
          <img
            width={75}
            height={75}
            src={image}
            alt={`Imagem do Artista ${artist}`}
          />
        )}

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={audio}
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
