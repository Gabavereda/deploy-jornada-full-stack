import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { getArtists } from "/api/api";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (err) {
        console.error("Erro ao buscar artistas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <p>Carregando artistas...</p>;

  return <Main type="artists" artists={artists} />;
};

export default Artists;
