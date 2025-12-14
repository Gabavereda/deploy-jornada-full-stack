import ItemList from "./ItemList";

const Main = ({ type, artists = [], songs = [] }) => {
  return (
    <div className="main">
      {/* HOME */}
      {!type && (
        <>
          <ItemList
            title="Artistas"
            items={6}
            itemsArray={artists}  /* Usando artistas da API */
            path="/artists"
            idPath="/artist"
            idKey="_id"
          />

          <ItemList
            title="Músicas"
            items={6}
            itemsArray={songs}  /* Usando músicas da API */
            path="/songs"
            idPath="/song"
            idKey="_id"
          />
        </>
      )}

      {/* LISTA DE MÚSICAS */}
      {type === "songs" && (
        <ItemList
          title="Músicas"
          items={20}
          itemsArray={songs}  /* Usando músicas da API */
          path="/songs"
          idPath="/song"
          idKey="_id"
        />
      )}

      {/* LISTA DE ARTISTAS */}
      {type === "artists" && (
        <ItemList
          title="Artistas"
          items={20}
          itemsArray={artists}  /* Usando artistas da API */
          path="/artists"
          idPath="/artist"
          idKey="_id"
        />
      )}
    </div>
  );
};

export default Main;
