import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <span className="loading loading-dots loading-lg text-primary" />
        </div>
    );
    return isAuthenticated ? children : <Navigate to="/" replace />;
}