/* eslint no-unused-vars: "off" */
import { StarIcon } from "lucide-react";
import React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

function MovieDetails() {
  const { state } = useLocation(); // ✅ movie data from navigate
  const { id } = useParams();
  const navigate = useNavigate

  const movie = state; // If passed via state (better for now)
  // If you want deep-linking: fetch again using id

  if (!movie) {
    return <div className="text-white p-10">Movie not found.</div>;
  }

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    // <div
    //   className=" min-h-screen  flex flex-col justify-center text-white"
    //   style={{
    //     backgroundImage: hasPoster ? `url(${movie.Poster})` : "none",
    //     backgroundSize: "auto 100%",
    //     // backgroundRepeat: "no-repeat",
    //     // backgroundPosition: "left",
    //   }}
    // >
    //   {/* Overlay */}
    //   <div className="absolute top-0 inset-0 bg-blue-950/85 "></div>
    //   <div className="relative z-10 p-10 max-w-3xl mx-auto">
        
    //     <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
    //     <p className="text-lg mb-2">📅 {movie.Year}</p>
    //     <p className="text-lg mb-2">⭐ {movie.imdbRating || "N/A"}</p>
    //     <p className="italic text-gray-300">{movie.Plot}</p>

    //     {/* Editable field (example) */}
    //     <textarea
    //       className="mt-6 w-full p-3 rounded-md bg-white/10 text-white"
    //       defaultValue={movie.Notes || ""}
    //       placeholder="Add your notes about this movie..."
    //     />
    //   </div>
    // </div>
    <div
  className="relative min-h-screen text-white flex items-center"
  style={{
    backgroundImage: hasPoster ? `url(${movie.Poster})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gray-900/80"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start p-10 gap-10 max-w-6xl mx-auto">
    
    {/* Left: Poster */}
    {hasPoster && (
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-64 md:w-80 rounded-xl shadow-lg"
      />
    )}

    {/* Right: Details */}
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
      <p className="text-lg mb-2">📅 {movie.Year}</p>
      <p className="text-lg mb-2 flex gap-2 text-yellow-300"><StarIcon className=" w-6 h-6"/>{movie.imdbRating || "N/A"}</p>
      <p className="italic text-gray-300 mb-6">{movie.Plot}</p>

      {/* Editable Notes */}
      <textarea
        className="w-full p-3 rounded-md bg-white/10 text-white resize-none"
        defaultValue={movie.Notes || ""}
        placeholder="Add your notes about this movie..."
      />
    </div>
  </div>
</div>

  );
}

export default MovieDetails;
