import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "../api/api";

// IMPORTANTE: Definir a URL do backend aqui no topo
const API_URL = import.meta.env.VITE_API_URL || "";

const Artist = () => {
  const { id } = useParams();
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

  // LÓGICA DA IMAGEM: Verifica se já tem /images no banco
  const bannerImage = songs[0].image.startsWith("http") 
    ? songs[0].image 
    : `${API_URL}${songs[0].image.startsWith('/') ? songs[0].image : '/' + songs[0].image}`;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          // CORREÇÃO: Usando a variável bannerImage processada
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${bannerImage})`,
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
        <p>Manda Busca é uma banda...</p>
        {/* ... Resto do seu texto biográfico */}
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