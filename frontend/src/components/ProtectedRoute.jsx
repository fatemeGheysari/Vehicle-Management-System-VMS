import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
