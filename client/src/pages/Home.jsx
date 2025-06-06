import React, { useEffect, useState } from 'react';
import { searchMovies } from '../config/omdb';

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          🎬 Explore Movies
        </h1>

        {/* Search Input */}
        <div className="mb-8">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-xl mb-3"
                />
                <h2 className="text-md font-bold truncate">{movie.Title}</h2>
                <p className="text-xs text-gray-300">📅 {movie.Year}</p>
                <p className="text-xs text-yellow-400 mt-1">⭐ {movie.imdbRating || "N/A"}</p>
                {movie.Plot && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 italic">
                    {movie.Plot}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
