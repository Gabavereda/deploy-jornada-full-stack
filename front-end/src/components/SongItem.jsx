import React from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const SongItem = ({ id, image, name, duration, index }) => {
  const imageUrl = image.startsWith("http") ? image : `${API_URL}${image}`;

  return (
    <Link to={`/song/${id}`} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>
        <div className="song-item__album">
          <img
            src={imageUrl}
            alt={`Imagem da Música ${name}`}
            className="song-item__image"
          />
          <p className="song-item__name">{name}</p>
        </div>
      </div>
      <p>{duration}</p>
    </Link>
  );
};

export default SongItem;
