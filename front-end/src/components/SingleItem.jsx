import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_URL } from "/api/api";

const SingleItem = ({ id, name, image, artist, idPath }) => {
  if (!id) return null;

  // 1. Pegue a URL do backend (ex: https://...onrender.com)
  const urlBackend = import.meta.env.VITE_API_URL || "";

  // 2. Garanta que não existam duas barras "//" ou que não falte a barra
  // Se image já for "/images/...", o resultado será "https://backend.com/images/..."
  const imagemCompleta = `${urlBackend}${image}`;

  return (
    <Link to={`${idPath}/${id}`} className="single-item">
      <div className="single-item__div-image-button">
        <div className="single-item__div-image">
          {/* Use a variável imagemCompleta aqui */}
          <img src={imagemCompleta} alt={`Imagem de ${name}`} />
        </div>

        <FontAwesomeIcon
          className="single-item__icon"
          icon={faCirclePlay}
        />
      </div>

      <div className="single-item__texts">
        <div className="single-item__2lines">
          <p className="single-item__title">{name}</p>
        </div>

        {artist && <p className="single-item__type">{artist}</p>}
      </div>
    </Link>
  );
};

export default SingleItem;
