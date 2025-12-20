const SongItem = ({ id, image, name, duration, index }) => {
  const API_URL = import.meta.env.VITE_API_URL || "";

  // CORREÇÃO: Não adicione /images/ se o banco já trouxer isso
  const imageUrl = image.startsWith("http")
    ? image
    : `${API_URL}${image.startsWith('/') ? image : '/' + image}`;

  return (
    <Link to={`/song/${id}`} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>

        <div className="song-item__album">
          <img src={imageUrl} alt={name} />
          <p>{name}</p>
        </div>
      </div>

      <p>{duration}</p>
    </Link>
  );
};

export default SongItem;