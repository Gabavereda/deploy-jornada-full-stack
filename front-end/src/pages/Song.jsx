import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { getSongs, getArtists } from "/api/api.js";

const API_URL = import.meta.env.VITE_API_URL || "";

const Song = () => {
  const { id } = useParams();
  const [songObj, setSongObj] = useState(null);
  const [songsFromArtist, setSongsFromArtist] = useState([]);
  const [artistObj, setArtistObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSong() {
      try {
        const allSongs = await getSongs();
        const allArtists = await getArtists();

        const currentSong = allSongs.find(
          (song) => song._id === id
        );

        if (!currentSong) return;

        setSongObj(currentSong);

        const artistSongs = allSongs.filter(
          (song) => song.artist === currentSong.artist
        );
        setSongsFromArtist(artistSongs);

        const artistFound = allArtists.find(
          (a) => a.name === currentSong.artist
        );
        setArtistObj(artistFound || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSong();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!songObj) return <p>Música não encontrada</p>;

  const { image, name, duration, artist, audio } = songObj;

  const randomIdFromArtist =
    songsFromArtist[Math.floor(Math.random() * songsFromArtist.length)]?._id;

  const randomId2FromArtist =
    songsFromArtist[Math.floor(Math.random() * songsFromArtist.length)]?._id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img
            src={`${API_URL}${image}`}
            alt={`Imagem da música ${name}`}
          />
        </div>
      </div>

      <div className="song__bar">
        {artistObj && (
          <img
            width={75}
            height={75}
            src={`${API_URL}${artistObj.image}`}
            alt={`Imagem do Artista ${artist}`}
          />
        )}

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={`${API_URL}${audio}`}
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
