import React, { useState } from "react";
import SongItem from "./SongItem";

const SongList = ({ songsArray }) => {
  const [items, setItems] = useState(5);

  return (
    <div className="song-list">
      {songsArray
        .slice(0, items)
        .map((song, index) => (
          <SongItem
            // Usamos o index junto com o id para garantir que a key nunca seja nula
            key={song._id || index} 
            id={song._id}
            index={index}
            name={song.name}
            image={song.image}
            duration={song.duration}
            plays={song.plays}
          />
        ))}

      {items < songsArray.length && (
        <p
          className="song-list__see-more"
          onClick={() => setItems((prev) => prev + 5)}
        >
          Ver mais
        </p>
      )}
    </div>
  );
};

export default SongList;