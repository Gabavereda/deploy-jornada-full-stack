import React from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const SongItem = ({ id, image, name, duration, index, plays }) => { 
  const imageUrl = image?.startsWith("http")
    ? image
    : `${API_URL}${image?.startsWith('/') ? image : '/' + (image || "")}`;

  if (!id) return null;

  return (
    <Link to={`/song/${id}`} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>

        <div className="song-item__album">
          <img 
            src={imageUrl}
            alt={name || "Música"}
            className="song-item__image"
          />
          <div>
            <p className="song-item__name">{name || "Música sem nome"}</p>
            
            <p style={{ fontSize: "12px", color: "#b3b3b3" }}>
              {plays?.toLocaleString() || 0} reproduções
            </p>
          </div>
        </div>
      </div>

      <p>{duration || "--:--"}</p>
    </Link>
  );
};

export default SongItem;