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
    }, 500); // 500ms debounce delay

    fetchMovies();

    return () => fetchMovies.cancel();
  }, [query]);

  return (
    <div className="min-h-screen  bg-gradient-to-l from-[#000000] via-[#011F4B] to-[#000000] text-white py-10 ">
      <div className="mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-center mb-6">🎬 Explore Movies</h1>

        {/* Search Input */}
        <div className="mb-8 mx-12">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Movie Grid */}
        {loading ? (
          <p className="text-center text-purple-300">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-10 gap-y-20 mx-2">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
