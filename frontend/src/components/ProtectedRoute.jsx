import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import TopNav from "./TopNav";
import { jwtDecode } from "jwt-decode";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(auth.token);
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Token expired, delete it
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    logout();
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
