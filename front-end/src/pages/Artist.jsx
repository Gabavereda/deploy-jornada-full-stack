import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";
const Artist = () => {
  const { id } = useParams();

  // 1️⃣ Buscar artista
  const artistObj = artistArray.find(
    (currentArtistObj) => currentArtistObj.id === Number(id)
  );

  // 2️⃣ Validar artista
  if (!artistObj) {
    return <p>Artista não encontrado</p>;
  }

  const { name, banner } = artistObj;

  // 3️⃣ Buscar músicas do artista
  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === name
  );

  // 4️⃣ Se não houver músicas
  if (songsArrayFromArtist.length === 0) {
    return <p>Este artista ainda não possui músicas</p>;
  }

  // 5️⃣ Gerar ID aleatório corretamente
  const randomIndex = Math.floor(
    Math.random() * songsArrayFromArtist.length
  );

  const randomIdFromArtist =
    songsArrayFromArtist[randomIndex]?.id;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)),url(${banner})`,
        }}
      >
        <h2 className="artist__title">{name}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songsArrayFromArtist} />
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
