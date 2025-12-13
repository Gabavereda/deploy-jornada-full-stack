import React from "react";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
  const { id } = useParams();

  // 1️⃣ Buscar música pelo ID CORRETO
  const songObj = songsArray.find(
    (song) => song.id === Number(id)
  );

  // 2️⃣ Validar música
  if (!songObj) {
    return <p>Música não encontrada</p>;
  }

  const { image, name, duration, artist, audio } = songObj;

  // 3️⃣ Buscar artista
  const artistObj = artistArray.find(
    (artistObj) => artistObj.name === artist
  );

  // 4️⃣ Buscar músicas do mesmo artista
  const songsFromArtist = songsArray.filter(
    (song) => song.artist === artist
  );
  // console.log(songsArrayFromArtist);

  const randomIndex = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomIndex2 = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;
  const randomId2FromArtist = songsArrayFromArtist[randomIndex2]._id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        {artistObj && (
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${artist}`}
          />
        )}

        <Player
          duration={duration}
          randomId={randomId}
          randomId2={randomId2}
          audio={audio}
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
