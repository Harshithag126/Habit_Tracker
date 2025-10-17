 import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [authData, setAuthData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) fetchHabits();
  }, [user]);

  const fetchHabits = async () => {
    const res = await axios.get(`http://localhost:5000/habits/${user}`);
    setHabits(res.data);
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    const res = await axios.post(`http://localhost:5000/habits/${user}`, {
      name: newHabit,
    });
    setHabits([...habits, res.data]);
    setNewHabit("");
  };

  const toggleHabit = async (id) => {
    const res = await axios.put(`http://localhost:5000/habits/${user}/${id}`);
    setHabits(habits.map((h) => (h.id === id ? res.data : h)));
  };

  const deleteHabit = async (id) => {
    await axios.delete(`http://localhost:5000/habits/${user}/${id}`);
    setHabits(habits.filter((h) => h.id !== id));
  };

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await axios.post("http://localhost:5000/signup", authData);
        alert("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        const res = await axios.post("http://localhost:5000/login", authData);
        setUser(res.data.username);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  const logout = () => {
    setUser(null);
    setHabits([]);
    setAuthData({ username: "", password: "" });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 border rounded-lg"
            value={authData.username}
            onChange={(e) =>
              setAuthData({ ...authData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded-lg"
            value={authData.password}
            onChange={(e) =>
              setAuthData({ ...authData, password: e.target.value })
            }
          />
          <button
            onClick={handleAuth}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">
            🌱 {user}'s Habit Tracker
          </h1>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter a new habit..."
            className="flex-1 p-2 border rounded-lg"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button
            onClick={addHabit}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2 shadow-sm"
          >
            <span
              className={`text-lg ${
                habit.done ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {habit.name}
            </span>
            <div>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`px-3 py-1 rounded-lg mr-2 ${
                  habit.done ? "bg-yellow-400" : "bg-blue-500"
                } text-white`}
              >
                {habit.done ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-sm text-gray-500">
          Built with ❤️ using React, Express & TailwindCSS
        </p>
      </div>
    </div>
  );
}







