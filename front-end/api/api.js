export async function getSongs() {
  const response = await fetch("/api/songs");
  if (!response.ok) throw new Error("Erro ao buscar músicas");
  return response.json();
}

export async function getArtists() {
  const response = await fetch("/api/artists");
  if (!response.ok) throw new Error("Erro ao buscar artistas");
  return response.json();
}
