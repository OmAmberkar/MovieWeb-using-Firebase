import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { HeartIcon } from "@heroicons/react/24/outline";
// or for solid
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

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300">
      <div className="relative">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full object-cover rounded-xl mb-3"
        />

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
