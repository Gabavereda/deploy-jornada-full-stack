import React from "react";
import { Link } from "react-router-dom"; // ESTE IMPORT É OBRIGATÓRIO AQUI

const API_URL = import.meta.env.VITE_API_URL || "";

const SongItem = ({ id, image, name, duration, index }) => {
  // PROTEÇÃO: O ?. e o || "" garantem que se a imagem for nula, o site não crasha
  const imageUrl = image?.startsWith("http")
    ? image
    : `${API_URL}${image?.startsWith('/') ? image : '/' + (image || "")}`;

  // Se o ID não existir, não renderizamos o item para evitar erro no Link
  if (!id) return null;

  return (
    <Link to={`/song/${id}`} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>

        <div className="song-item__album">
          <img src={imageUrl} alt={name || "Música"} />
          <p>{name || "Música sem nome"}</p>
        </div>
      </div>

      <p>{duration || "--:--"}</p>
    </Link>
  );
};

export default SongItem;