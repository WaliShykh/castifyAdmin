import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check both user state and localStorage authentication
  const isAuthenticated =
    user &&
    localStorage.getItem("isAuthenticated") === "true" &&
    localStorage.getItem("token");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Clear any remaining auth data
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.clear();

    // Redirect to login page with the attempted url
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
