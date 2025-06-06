import axios from 'axios';

const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = 'https://www.omdbapi.com/';

export const searchMovies = async (title) => {
  const response = await axios.get(baseURL, {
    params: {
      apikey: omdbApiKey,
      s: title,
    },
  });

  const basicMovies = response.data.Search || [];

  const detailedMovies = await Promise.all(
    basicMovies.map(async (movie) => {
      const detailRes = await axios.get(baseURL, {
        params: {
          apikey: omdbApiKey,
          i: movie.imdbID,
        },
      });
      return detailRes.data;
    })
  );

  return detailedMovies;
};
