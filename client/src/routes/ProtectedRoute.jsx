import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <p className="text-center text-white">Checking auth...</p>;

  return currentUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
