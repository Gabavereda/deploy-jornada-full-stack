import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "../api/api";

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

        // Busca o artista pelo ID da URL
        const currentArtist = allArtists.find(a => a._id === id);
        
        if (!currentArtist) {
          setArtistName("Artista não encontrado");
          setLoading(false);
          return;
        }

        setArtistName(currentArtist.name);

        // Filtra as músicas deste artista
        const artistSongs = allSongs.filter(
          song => song.artist === currentArtist.name
        );
        
        setSongs(artistSongs);
      } catch (error) {
        console.error("Erro ao carregar dados do artista:", error);
      } finally {
        setLoading(false);
      }
    }
    loadArtistSongs();
  }, [id]);

  if (loading) return <div className="loading-container"><p>Carregando...</p></div>;

  // Proteção: Se não houver músicas, mostra um aviso em vez de crashar
  if (!songs || songs.length === 0) {
    return (
      <div className="artist">
        <div className="artist__header"><h2>{artistName}</h2></div>
        <div className="artist__body"><p>Este artista ainda não possui músicas.</p></div>
      </div>
    );
  }

  // IDs para o botão de Play Aleatório
  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomIdFromArtist = songs[randomIndex]?._id;

  // Lógica de Banner Segura (Verifica se a imagem existe)
  const firstImage = songs[0]?.image || "";
  const bannerImage = firstImage.startsWith("http") 
    ? firstImage 
    : `${API_URL}${firstImage.startsWith('/') ? firstImage : '/' + firstImage}`;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
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
        {/* ... restante do texto */}
      </div>

      {/* Só renderiza o Link se houver um ID válido */}
      {randomIdFromArtist && (
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon
            className="single-item__icon single-item__icon--artist"
            icon={faCirclePlay}
          />
        </Link>
      )}
    </div>
  );
};

export default Artist;