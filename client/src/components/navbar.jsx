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
    <nav className="backdrop-blur-sm text-white h-20 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/home" className="bg-gradient-to-r from-black to-blue-950 text-xl font-bold py-5 px-10 rounded-3xl">
             MovieFinder
          </Link>
        </div>

        {/* Center: Main Nav */}
        <div className="hidden md:flex gap-10 items-center mx-auto bg-gradient-to-l from-black via-blue-950 to-black py-5 px-10 rounded-3xl">
          {currentUser && (
            <>
              <Link to="/home" className="hover:text-purple-300">Home</Link>
              <Link to="/favorites" className="hover:text-purple-300">Favorites</Link>
              <Link to="/dashboard" className="hover:text-purple-300">Dashboard</Link>
            </>
          )}
        </div>

        {/* Right: Profile or Auth */}
        <div className="hidden md:flex items-center gap-4 bg-gradient-to-l from-black to-blue-950 py-4 px-10 rounded-3xl">
          {currentUser ? (
            <>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold hover:opacity-90">
                  {/* First letter of user name or static initial */}
                  {currentUser?.email?.charAt(0).toUpperCase() || "U"}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm  hover:border-blue-600 hover:border-2 px-3 py-2 rounded-lg"
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
        <div className="md:hidden bg-gradient-to-l from-black via-blue-950 to-black py-5 rounded-3xl px-4 pb-4 space-y-3 mt-0 flex flex-row">
          {currentUser ? (
            <>
            <ul className='space-y-6'>
            <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/favorites" onClick={toggleMenu}>Favorites</Link></li>
              <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
              <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
              <li><button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-blue-600 hover:border-white border hover:text-blue-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button></li>
            </ul>
              
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
