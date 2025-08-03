/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
       toast.error("Logout failed");
    }
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-[#1c1c2d] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/home" className="text-2xl font-bold text-purple-400">
          🎬 MovieFinder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {currentUser ? (
            <>
              <Link to="/home" className="hover:text-purple-300">Home</Link>
              <Link to="/favorites" className="hover:text-purple-300">Favorites</Link>
              <Link to="/profile" className="hover:text-purple-300">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-purple-300">Login</Link>
              <Link to="/register" className="hover:text-purple-300">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2a2a40] px-4 pb-4 space-y-3">
          {currentUser ? (
            <>
              <Link to="/home" onClick={toggleMenu}>Home</Link>
              <Link to="/favorites" className="hover:text-purple-300">Favorites</Link>
              <Link to="/profile" onClick={toggleMenu}>Profile</Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" onClick={toggleMenu}>Login</Link>
              <Link to="/register" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
