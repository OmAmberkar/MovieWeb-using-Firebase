import axios from "axios";

const traktapi = import.meta.env.VITE_TRAKT_CLIENT_ID;
const baseURL = "https://api.trakt.tv";

export async function getTraktDetails(imdbId) {
  const res = await axios.get(`${baseURL}/movies/${imdbId}?extended=full`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": traktapi,
    },
  });
  return res.data;
}
