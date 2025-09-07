import axios from "axios";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

// 🔹 Get movie details (by TMDB ID, but we can also fallback to title search)
export async function getTmdbDetails(movieId, title) {
  try {
    if (movieId) {
      const res = await axios.get(`${baseURL}/movie/${movieId}`, {
        params: {
          api_key: tmdbApiKey,
        },
      });
      return res.data;
    } else if (title) {
      const res = await axios.get(`${baseURL}/search/movie`, {
        params: {
          api_key: tmdbApiKey,
          query: title,
        },
      });
      return res.data.results[0] || null;
    }
  } catch (error) {
    console.error("Error fetching TMDB details:", error.message);
    return null;
  }
}

// 🔹 Search movies by title
export async function searchMoviesT(title) {
  try {
    const response = await axios.get(`${baseURL}/search/movie`, {
      params: {
        api_key: tmdbApiKey,
        query: title,
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error("Error searching TMDB:", error.message);
    return [];
  }
}
