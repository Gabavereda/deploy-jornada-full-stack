import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_URL } from "/api/api";

const SingleItem = ({ id, name, image, artist, idPath }) => {
  if (!id) return null;

  const urlBackend = import.meta.env.VITE_API_URL;
  const imagemCompleta = `${urlBackend}${currObj.image}`;

  return (
    <Link to={`${idPath}/${id}`} className="single-item">
      <div className="single-item__div-image-button">
        <div className="single-item__div-image">
          <img src={imagemCompleta} alt={name} />
          alt={`Imagem ${name}`}

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
