// movieService.js
import { getFanartPoster } from "./fanart";
import { getOmdbDetails } from "./omdb";
import { getTraktDetails } from "./trakt";

const cache = new Map();

export async function getMovieDetails(imdbId, title) {
  if (!imdbId) throw new Error("IMDb ID is required");

  // ✅ Cache check
  if (cache.has(imdbId)) {
    return cache.get(imdbId);
  }

  let final = {
    id: imdbId,
    title: "",
    year: "",
    rating: "",
    plot: "",
    poster: "",
  };

  try {
    // 1️⃣ Try Trakt first
    const trakt = await getTraktDetails(imdbId);
    if (trakt) {
      final.title = trakt.title || final.title;
      final.year = trakt.year?.toString() || final.year;
      final.plot = trakt.overview || final.plot;
      final.rating =
        trakt.rating !== undefined
          ? parseFloat(trakt.rating).toFixed(1)
          : final.rating;
    }

    // 2️⃣ If poster still missing, try Fanart
    if (!final.poster) {
      try {
        const poster = await getFanartPoster(imdbId);
        if (poster) final.poster = poster;
      } catch (err) {
        console.warn(`[movieService] Fanart fallback failed:`, err.message);
      }
    }

    // 3️⃣ If still missing fields, go OMDb
    if (!final.title || !final.year || !final.plot || !final.rating || !final.poster) {
      try {
        const omdb = await getOmdbDetails(imdbId, title);
        if (omdb) {
          final.title = final.title || omdb.Title;
          final.year = final.year || omdb.Year;
          final.plot = final.plot || omdb.Plot;
          final.rating = final.rating || omdb.imdbRating;
          if (!final.poster && omdb.Poster && omdb.Poster !== "N/A") {
            final.poster = omdb.Poster;
          }
        }
      } catch (err) {
        console.warn(`[movieService] OMDb fallback failed:`, err.message);
      }
    }

    // ✅ Final fallback poster
    if (!final.poster) {
      final.poster = "https://via.placeholder.com/300x450?text=No+Image";
    }

    // ✅ Save in cache
    cache.set(imdbId, final);

    return final;
  } catch (error) {
    console.error(`[movieService] Fatal error for ${imdbId}:`, error);
    throw error;
  }
}
