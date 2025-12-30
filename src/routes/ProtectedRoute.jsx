// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react"; 

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation(); // Pour mémoriser d'où vient l'utilisateur

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-gray-500">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // state={{ from: location }} permet de dire à la page Login d'où l'on vient
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
