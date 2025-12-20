import React from "react"; // Importação básica do React
import { Link } from "react-router-dom"; // Importação essencial para navegação

// Pegamos a URL do backend configurada no Render
const API_URL = import.meta.env.VITE_API_URL || "";

const SongItem = ({ id, image, name, duration, index }) => {
  
  // 1. ESCUDO PARA A IMAGEM: 
  // O uso de 'image?' evita o erro "cannot read property startsWith of undefined"
  // caso uma música no MongoDB esteja sem imagem.
  const imageUrl = image?.startsWith("http")
    ? image
    : `${API_URL}${image?.startsWith('/') ? image : '/' + (image || "")}`;

  return (
    // 2. ESCUDO PARA O ID:
    // Se o id for nulo por algum erro no banco, ele vira um link vazio (#) em vez de travar o site
    <Link to={id ? `/song/${id}` : "#"} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>

        <div className="song-item__album">
          {/* Fallback para o caso de o nome ou imagem virem vazios do banco */}
          <img src={imageUrl} alt={name || "Capa da música"} />
          <p>{name || "Música sem título"}</p>
        </div>
      </div>

      <p>{duration || "--:--"}</p>
    </Link>
  );
};

export default SongItem;