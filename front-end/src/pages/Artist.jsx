import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { getSongs, getArtists } from "/api/api";

const Artist = () => {
  const { id } = useParams(); // _id do artista
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtistSongs() {
      try {
        const [allSongs, allArtists] = await Promise.all([
          getSongs(),
          getArtists(),
        ]);

        const currentArtist = allArtists.find(a => a._id === id);
        if (!currentArtist) {
          setSongs([]);
          setArtistName("Artista não encontrado");
          return;
        }

        setArtistName(currentArtist.name);

        const artistSongs = allSongs.filter(
          song => song.artist === currentArtist.name
        );

        setSongs(artistSongs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadArtistSongs();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (songs.length === 0) return <p>Este artista ainda não possui músicas</p>;

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomIdFromArtist = songs[randomIndex]._id;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${songs[0].image})`,
        }}
      >
        <h2 className="artist__title">{artistName}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songs} />
      </div>

      <div className="artist__body">

        <h1>To do release e afins about me links </h1>
        <h2>Sobre o Artista</h2>
        <p>Manda Busca é uma banda que carrega em seu nome uma referência à gíria dos
          soltadores de pipa, muito presentes na região periférica de onde a banda surgiu. Em sua
          essência, o grupo entrega um rock popular, carregado de riffs, com influências de diversos
          gêneros que vão dos grooves brasileiros, ao reggae e rock psicodélico. Suas letras
          abordam temas do cotidiano e reflexões coletivas.</p>

        <p>
          A FÁBRICA ONÍRICA: A postura do Manda Busca reflete o espírito de sua região de
          origem: assim como o Grande ABC é historicamente conhecido por sua força operária e
          por seus movimentos de trabalhadores, a banda adota uma filosofia DIY (Do It Yourself). O
          seu EP de estreia, Perigoso é Não Fazer Nada , por exemplo, foi idealizado e realizado de
          forma totalmente independente, com as gravações ocorrendo em diferentes locações,
          incluindo as casas dos próprios músicos em Santo André e Mauá. Essa produção "na linha
          de montagem" particular confere ao som uma crueza instigante, que soa crua e objetiva.
          "O título Perigoso é Não Fazer Nada é o nosso manifesto. Crescemos em uma
          região onde a ação e a resistência coletiva definiram a história. Nos
          consideramos um pequeno e produtivo setor de uma fábrica que gera e
          alimenta sonhos através das nossas músicas." –
          Rafael Merino - Vocalista/Compositor da banda.
        </p> <p>
          O grupo Manda Busca, formado por Rafael Merino (Voz, teclado e efeitos) , Guilherme
          Sebastião (Guitarra e voz) , Glauber Vereda (Baixo) e Gustavo Adami (Bateria e voz), vem
          se firmando no cenário musical alternativo da Grande São Paulo. A banda já se apresentou
          em casas e eventos notáveis como o FFFront, 74 CLub, Cafundó, Links 207,
          Apostrophe, Festival Vesúvio e o Projeto Canja com Canja, da Prefeitura de Santo
          André.
          A essência do grupo é sentida ao longo de suas canções, levando o ouvinte a conectar-se
          com as histórias de vida e a energia das performances ao vivo.
        </p>
      </div>

      <Link to={`/song/${randomIdFromArtist}`}>
        <FontAwesomeIcon
          className="single-item__icon single-item__icon--artist"
          icon={faCirclePlay}
        />
      </Link>
    </div >
  );
};

export default Artist;
