import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
