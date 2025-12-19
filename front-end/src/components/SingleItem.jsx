const SingleItem = ({ id, name, image, artist, idPath }) => {
  if (!id) return null;

  // Pegando a URL do backend da ENV
  const urlBackend = import.meta.env.VITE_API_URL || "";
  
  // CORREÇÃO: Usamos a prop 'image' que o componente recebeu
  const imagemCompleta = `${urlBackend}${image}`;

  return (
    <Link to={`${idPath}/${id}`} className="single-item">
      <div className="single-item__div-image-button">
        <div className="single-item__div-image">
          {/* CORREÇÃO: Removido o texto 'alt' que estava solto fora da tag */}
          <img src={imagemCompleta} alt={`Imagem de ${name}`} />
        </div>

        <FontAwesomeIcon
          className="single-item__icon"
          icon={faCirclePlay}
        />
      </div>

      <div className="single-item__texts">
        <div className="single-item__2lines">
          <p className="single-item__title">{name}</p>
        </div>
        {artist && <p className="single-item__type">{artist}</p>}
      </div>
    </Link>
  );
};