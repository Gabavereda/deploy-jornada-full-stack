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
            key={song.id}
            id={song.id}
            index={index}
            name={song.name}
            image={song.image}
            duration={song.duration}
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
