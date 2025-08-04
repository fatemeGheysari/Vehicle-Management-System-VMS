import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        passwordHash,
      });

      const authData = {
        token: res.data.token,
        user: res.data.user,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      login(authData);
      setMessage("✅ Login successful!");
      navigate("/vehicles");
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm text-center">
        {/* 🔰 Logo Section */}
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="App Logo"
            className="mx-auto w-16 h-16"
          />
          <h2 className="text-2xl font-bold mt-2">Login</h2>
        </div>

        {/* 🔐 Form */}
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

        {/* ✅ Message */}
        {message && (
          <p className="mt-4 text-sm text-red-500">{message}</p>
        )}

        {/* 📌 Signup link */}
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
