import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

function MovieCard({ movie }) {
  const { currentUser } = useAuth();
  const [isFav, setIsFav] = useState(false);

  const saveToFavorites = async () => {
    if (!currentUser) {
      toast.error("Please login to save favorites");
      return;
    }
    

    try {
      const favRef = doc(
        db,
        "users",
        currentUser.uid,
        "favorites",
        movie.imdbID
      );
      await setDoc(favRef, {
        ...movie,
        savedAt: new Date(),
      });
      toast.success("Added to favorites!");
      setIsFav(true);
    } catch (error) {
      console.error("Error saving favorite:", error);
      toast.error("Failed to save favorite");
    }
  };

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300">
      <div className="relative">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-80 h-60 object-fit rounded-xl mb-3"
            style={{ aspectRatio: "2/3" }}
          />
        ) : (
          <div
            className="w-full bg-gray-800 flex items-center justify-center rounded-xl mb-3"
            style={{ aspectRatio: "2/3" }}
          >
            <span className="text-blue-400 !flex !items-center !text-center px-2 text-sm">
              {movie.Title}
            </span>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={saveToFavorites}
          className="absolute top-2 right-2 text-white backdrop-blur-2xl text-xs px-3 py-3 rounded-lg flex items-center gap-1"
        >
          {isFav ? (
            <HeartSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Movie Info */}
      <h2 className="text-md font-bold truncate">{movie.Title}</h2>
      <p className="text-xs text-gray-300">📅 {movie.Year}</p>
      <p className="text-xs text-yellow-400 mt-1">
        ⭐ {movie.imdbRating || "N/A"}
      </p>
      {movie.Plot && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-3 italic">
          {movie.Plot}
        </p>
      )}
    </div>
  );
}

export default MovieCard;
