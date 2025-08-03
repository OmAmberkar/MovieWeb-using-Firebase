import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/AuthContext'; // ⬅️ import context
import Navbar from './components/navbar';
import { Toaster } from 'react-hot-toast';
import Favorites from './pages/Favorties';

function App() {
  const { loading } = useAuth(); // ⬅️ access loading state

  if (loading) {
    return <p className="text-center text-white text-xl mt-10">🔐 Checking authentication...</p>;
  }

  return (
    <Router basename="/MovieWeb-using-Firebase">
      <Toaster position="top-right" />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
