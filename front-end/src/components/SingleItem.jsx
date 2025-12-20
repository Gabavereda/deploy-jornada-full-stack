import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_URL } from "/api/api";

const SingleItem = ({ id, name, image, artist, idPath }) => {
  const urlBackend = import.meta.env.VITE_API_URL || "";

  // Se 'image' no banco já for "/images/foto.jpg"
  // E 'urlBackend' for "https://link.com"
  // Esta lógica garante que não haverá duplicação
  const imagemCompleta = image.startsWith('http')
    ? image
    : `${urlBackend}${image}`;

  // Se mesmo assim aparecer duplicado, use esta versão radical:
  // const imagemCompleta = `${urlBackend}${image.replace('/images/images/', '/images/')}`;

  return (
    <Link to={`${idPath}/${id}`} className="single-item">
      <div className="single-item__div-image-button">
        <div className="single-item__div-image">
          <img src={imagemCompleta} alt={name} />
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
