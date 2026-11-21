
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">
        Checking authentication...
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
