// Home.jsx
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { searchMovies } from "../config/omdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = debounce(async () => {
      if (!query) return;
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    }, 500);

    fetchMovies();
    return () => fetchMovies.cancel();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#000000] via-[#011F4B] to-[#000000] text-white py-10">
      <div className="mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          🎬 Explore Movies
        </h1>

        {/* Search Input */}
        <div className="mb-12 mx-12 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => setQuery(query)} // triggers debounce
            className="px-5 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md hover:shadow-lg transition"
          >
            Search
          </button>
        </div>

        {/* Movie Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-10 gap-y-20 mx-2">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No movies found. Try another search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
