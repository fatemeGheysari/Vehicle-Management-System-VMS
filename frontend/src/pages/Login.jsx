import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // get login method from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        passwordHash,
      });

      // ✅ Store whole auth object in context and localStorage
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
    <div style={{ padding: "2rem" }}>
      <div className="bg-green-500 text-white p-4">Tailwind is working ✅</div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
