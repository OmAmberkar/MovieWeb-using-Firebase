/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MovieCard({ movie }) {
  const { currentUser } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if already favorite on mount
  useEffect(() => {
    const checkFavorite = async () => {
      if (!currentUser) return;
      const favRef = doc(db, "users", currentUser.uid, "favorites", movie.imdbID);
      const snapshot = await getDoc(favRef);
      if (snapshot.exists()) setIsFav(true);
    };
    checkFavorite();
  }, [currentUser, movie.imdbID]);

  // ✅ Toggle favorite
  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.error("Please login to save favorites");
      return;
    }

    const favRef = doc(db, "users", currentUser.uid, "favorites", movie.imdbID);

    try {
      if (isFav) {
        await deleteDoc(favRef);
        setIsFav(false);
        toast("Removed from favorites", { icon: "💔" });
      } else {
        await setDoc(favRef, {
          ...movie,
          savedAt: new Date(),
        });
        setIsFav(true);
        toast.success("Added to favorites!");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite");
    }
  };

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300">
      {/* Poster (click → navigate) */}
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/movie/${movie.imdbID}`, { state: movie })}
      >
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-80 h-60 object-cover rounded-xl mb-3"
          />
        ) : (
          <div className="w-full h-60 bg-gray-800 flex items-center justify-center rounded-xl mb-3">
            <span className="text-blue-400 px-2 text-sm">{movie.Title}</span>
          </div>
        )}

        {/* Fav Button (separate, no navigation) */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-white backdrop-blur-2xl text-xs px-3 py-3 rounded-lg"
        >
          {isFav ? (
            <HeartSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Movie Info */}
      <h2 className="text-md font-bold truncate">{movie.Title}</h2>
      <div className="flex items-center mt-1 justify-between">
        <p className="text-yellow-300 flex gap-2 items-center">
          <Star className="h-5 w-5" />
          {movie.imdbRating || "N/A"}
        </p>
        <p className="text-gray-300 flex gap-2 items-center">
          <Calendar className="h-5 w-5" /> {movie.Year}
        </p>
      </div>
      {movie.Plot && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-3 italic">
          {movie.Plot}
        </p>
      )}
    </div>
  );
}

export default MovieCard;
