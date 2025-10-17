 import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup";

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (isSignup) {
    return <Signup onSignupComplete={() => setIsSignup(false)} />;
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setMessage("✅ Login successful!");
      setTimeout(() => onLogin(true), 1000);
    } catch (err) {
      setMessage("⚠️ Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-emerald-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">🌿 Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Login
        </button>

        <p className="mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => setIsSignup(true)}
            className="text-green-600 underline"
          >
            Sign up here
          </button>
        </p>

        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
}



