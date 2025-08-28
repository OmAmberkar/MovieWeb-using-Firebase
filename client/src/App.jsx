import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext"; // ⬅️ import context
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import Favorites from "./pages/Favorties";
import MovieDetails from "./components/MovieDetails";

const NavbarLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const hideNavbar = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {currentUser && !hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <p className="text-center text-white text-xl mt-10">
        🔐 Checking authentication...
      </p>
    );
  }

  return (
    <Router basename="/MovieWeb-using-Firebase">
      <Toaster position="top-right" />
      <NavbarLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </NavbarLayout>
    </Router>
  );
}

export default App;
