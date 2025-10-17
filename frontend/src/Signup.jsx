import React, { useState } from "react";
import axios from "axios";

export default function Signup({ onSignupComplete }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      setMessage("✅ Signup successful! You can now log in.");
      setTimeout(() => onSignupComplete(), 1500);
    } catch (err) {
      setMessage("⚠️ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">🌿 Create Account</h2>

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
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
