import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { getSongs, getArtists } from "../api/api";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          getSongs(),
          getArtists()
        ]);
        setSongs(songsData);
        setArtists(artistsData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return <Main artists={artists} songs={songs} />;
};

export default Home;
