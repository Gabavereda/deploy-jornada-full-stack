import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_URL } from "/api/api";

const SingleItem = ({ id, name, image, artist, idPath }) => {
  if (!id) return null;

  // Pegamos a URL do Backend da env
  const urlBackend = import.meta.env.VITE_API_URL || "";

  // Lógica para evitar barras duplas e caminhos errados:
  // Se image já começa com "/", não precisamos adicionar outra barra
  const imagemCompleta = image.startsWith('http')
    ? image
    : `${urlBackend}${image.startsWith('/') ? image : '/' + image}`;

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
