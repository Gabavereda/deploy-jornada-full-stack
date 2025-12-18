import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SingleItem = ({ id, name, image, artist, idPath }) => {
  if (!id) return null;

  // Monta o caminho da imagem considerando que está no public
  const imageUrl = image.startsWith("http")
    ? image
    : `${API_URL}/images/${image}`;


  return (
    <Link to={`${idPath}/${id}`} className="single-item">
      <div className="single-item__div-image-button">
        <div className="single-item__div-image">
          <img
            className="single-item__image"
            src={imageUrl}
            alt={`Imagem ${name}`}
          />
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
