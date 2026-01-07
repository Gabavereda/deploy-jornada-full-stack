import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "/api/api";

const API_URL = import.meta.env.VITE_API_URL || "";

const Artist = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false); // ✅ Estado para controlar "Ver mais"

  useEffect(() => {
    async function loadArtistSongs() {
      try {
        const [allSongs, allArtists] = await Promise.all([
          getSongs(),
          getArtists(),
        ]);

        const currentArtist = allArtists.find(a => a._id === id);

        if (!currentArtist) {
          setArtistName("Artista não encontrado");
          setLoading(false);
          return;
        }

        setArtistName(currentArtist.name);
        setArtistBio(currentArtist.bio);

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

  if (!songs || songs.length === 0) {
    return (
      <div className="artist">
        <div className="artist__header"><h2>{artistName}</h2></div>
        <div className="artist__body"><p>Este artista ainda não possui músicas.</p></div>
      </div>
    );
  }

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomIdFromArtist = songs[randomIndex]?._id;

  const firstImage = songs[0]?.image || "";
  const bannerImage = firstImage.startsWith("http")
    ? firstImage
    : `${API_URL}${firstImage.startsWith('/') ? firstImage : '/' + firstImage}`;

  // ✅ Lógica de truncar bio
  const bioMaxLength = 300; // caracteres
  const shouldTruncate = artistBio && artistBio.length > bioMaxLength;
  const displayBio = shouldTruncate && !showFullBio 
    ? artistBio.slice(0, bioMaxLength) + "..." 
    : artistBio;

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

      {/* ✅ Seção "Sobre o Artista" com botão Ver mais */}
      {artistBio && (
        <div className="artist__body">
          <h2>Sobre o Artista</h2>
          <p style={{ lineHeight: "1.6", marginBottom: "10px" }}>
            {displayBio}
          </p>
          
          {shouldTruncate && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              style={{
                background: "none",
                border: "none",
                color: "var(--green-400)",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
                padding: "0",
                textDecoration: "underline"
              }}
            >
              {showFullBio ? "Ver menos" : "Ver mais"}
            </button>
          )}
        </div>
      )}

      {/* Loja */}
      <div className="artist-loja__body">
        <h2>Loja</h2>
        <p>Aqui vai Loja</p>
      </div>

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