// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//(points to Render in production)
import api from "../utils/axiosInstance";
import { useAuth } from "../context/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      //const res = await axios.post("http://localhost:3000/api/auth/login", {
      // Call  backend via the shared axios instance (relative path)
      const res = await api.post("/api/auth/login", {
        username,
        passwordHash,
      });

      // Save token + user in localStorage and context
      const authData = { token: res.data.token, user: res.data.user };
      localStorage.setItem("auth", JSON.stringify(authData));
      login(authData);

      setMessage("✅ Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="/logo.png" alt="App Logo" className="mx-auto w-16 h-16" />
          <h2 className="text-2xl font-bold mt-2">Login</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}

        <p className="mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
