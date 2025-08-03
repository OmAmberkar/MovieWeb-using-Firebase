/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (!currentUser) return;

    const favRef = collection(db, "users", currentUser.uid, "favorites");
    const snapshot = await getDocs(favRef);
    const favList = snapshot.docs.map((doc) => doc.data());
    setFavorites(favList);
  };

  useEffect(() => {
    fetchFavorites();
  }, [currentUser]);

  const removeFromFavorites = async (imdbID) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "favorites", imdbID));
      toast.success("Removed from favorites!");
      // Optimistically update UI
      setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">💾 Your Favorites</h1>

        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md relative"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full object-cover rounded-xl mb-3"
                />

                <h2 className="text-md font-bold truncate">{movie.Title}</h2>
                <p className="text-xs text-gray-300">📅 {movie.Year}</p>

                {/* Unsave Button */}
                <button
                  onClick={() => removeFromFavorites(movie.imdbID)}
                  className="absolute top-2 right-2 text-white backdrop-blur-2xl text-xs px-3 py-3 rounded-lg flex items-center gap-1"
                >
                  <HeartSolid className="w-6 h-6 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
