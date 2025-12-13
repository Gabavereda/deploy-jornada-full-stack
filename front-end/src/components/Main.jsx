import React from "react";
import ItemList from "./ItemList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Main = ({ type }) => {
  return (
    <div className="main">
      {/* Artistas */}
      {(type === "artists" || type === undefined) && (
        <ItemList
          title="Artistas"
          items={11}
          itemsArray={artistArray}
          path="/artists"
          idPath="/artist"
          idKey="id"   // ✅ IMPORTANTE
        />
      )}

      {/* Músicas */}
      {(type === "songs" || type === undefined) && (
        <ItemList
          title="Músicas"
          items={20}
          itemsArray={songsArray}
          path="/songs"
          idPath="/song"
          idKey="id"   // ✅ IMPORTANTE
        />
      )}
    </div>
  );
};

export default Main;
