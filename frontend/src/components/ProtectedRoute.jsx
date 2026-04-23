import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">Checking login...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
