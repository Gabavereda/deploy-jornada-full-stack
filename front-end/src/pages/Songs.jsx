import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { getSongs } from "../api/api";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSongs()
      .then((data) => setSongs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando músicas...</p>;
  if (!songs.length) return <p>Nenhuma música encontrada.</p>;

  return <Main type="songs" songs={songs} />;
};

export default Songs;
