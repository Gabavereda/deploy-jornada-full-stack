import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "/api/api";

const Artist = () => {
  const { id } = useParams(); // _id do artista
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtistSongs() {
      try {
        const [allSongs, allArtists] = await Promise.all([
          getSongs(),
          getArtists(),
        ]);

        const currentArtist = allArtists.find(a => a._id === id);
        if (!currentArtist) {
          setSongs([]);
          setArtistName("Artista não encontrado");
          return;
        }

        setArtistName(currentArtist.name);

        const artistSongs = allSongs.filter(
          song => song.artist === currentArtist.name
        );

        setSongs(artistSongs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadArtistSongs();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (songs.length === 0) return <p>Este artista ainda não possui músicas</p>;

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomIdFromArtist = songs[randomIndex]._id;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${songs[0].image})`,
        }}
      >
        <h2 className="artist__title">{artistName}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songs} />
      </div>

      <Link to={`/song/${randomIdFromArtist}`}>
        <FontAwesomeIcon
          className="single-item__icon single-item__icon--artist"
          icon={faCirclePlay}
        />
      </Link>
    </div>
  );
};

export default Artist;
