import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "/api/api";


const API_URL = import.meta.env.VITE_API_URL;

const Artist = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtistSongs() {
      try {
        const [allSongs, allArtists] = await Promise.all([
          getSongs(),
          getArtists(),
        ]);

        const currentArtist = allArtists.find(
          (artist) => artist._id === id
        );

        if (!currentArtist) {
          setArtistName("Artista não encontrado");
          setSongs([]);
          return;
        }

        setArtistName(currentArtist.name);

        const artistSongs = allSongs.filter(
          (song) => song.artist === currentArtist.name
        );

        setSongs(artistSongs);

        // 👉 imagem do banner (prioriza artista, senão usa da música)
        if (currentArtist.image) {
          setBannerImage(`${API_URL}/images/${currentArtist.image}`);

        } else if (artistSongs.length > 0) {
          setBannerImage(`${API_URL}/images/${artistSongs[0].image}`);

        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadArtistSongs();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (songs.length === 0)
    return <p>Este artista ainda não possui músicas</p>;

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomIdFromArtist = songs[randomIndex]._id;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              var(--_shade),
              var(--_shade)
            ),
            url(${bannerImage})
          `,
        }}
      >
        <h2 className="artist__title">{artistName}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songs} />
      </div>

      <div className="artist__body">
        <h2>Sobre o Artista</h2>
        <p>
          Manda Busca é uma banda que carrega em seu nome uma
          referência à gíria dos soltadores de pipa...
        </p>

        <p>
          A postura do Manda Busca reflete o espírito de sua
          região de origem, com filosofia DIY (Do It Yourself)...
        </p>

        <p>
          O grupo Manda Busca, formado por Rafael Merino,
          Guilherme Sebastião, Glauber Vereda e Gustavo Adami...
        </p>
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
