import React from "react";
import { Link } from "react-router-dom"; // IMPORTANTE: Sem isso a página crasha

const API_URL = import.meta.env.VITE_API_URL || "";

const SongItem = ({ id, image, name, duration, index }) => {
  // ESCUDO: Se image for undefined, o ?. impede o crash
  const imageUrl = image?.startsWith("http")
    ? image
    : `${API_URL}${image?.startsWith('/') ? image : '/' + (image || "")}`;

  // Se não houver ID, não renderiza para não quebrar o Link abaixo
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