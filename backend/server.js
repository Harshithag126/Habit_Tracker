// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const dataPath = path.join(__dirname, "data.json");

function loadData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(
      dataPath,
      JSON.stringify({ users: [], habits: [] }, null, 2)
    );
  }
  return JSON.parse(fs.readFileSync(dataPath));
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 🟢 Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const data = loadData();
  if (data.users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  data.users.push({ username, password });
  saveData(data);
  res.status(201).json({ message: "Signup successful" });
});

// 🟢 Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = loadData();

  const user = data.users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", username });
});

// 🟢 Get user’s habits
app.get("/habits/:username", (req, res) => {
  const { username } = req.params;
  const data = loadData();
  const userHabits = data.habits.filter((h) => h.username === username);
  res.json(userHabits);
});

// 🟢 Add new habit for a specific user
app.post("/habits/:username", (req, res) => {
  const { username } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Habit name required" });

  const data = loadData();
  const newHabit = {
    id: Date.now(),
    username,
    name,
    done: false,
  };

  data.habits.push(newHabit);
  saveData(data);
  res.status(201).json(newHabit);
});

// 🟢 Toggle habit done/undo
app.put("/habits/:username/:id", (req, res) => {
  const { username, id } = req.params;
  const data = loadData();
  const habit = data.habits.find(
    (h) => h.id == id && h.username === username
  );

  if (!habit) return res.status(404).json({ message: "Habit not found" });

  habit.done = !habit.done;
  saveData(data);
  res.json(habit);
});

// 🟢 Delete habit
app.delete("/habits/:username/:id", (req, res) => {
  const { username, id } = req.params;
  const data = loadData();
  data.habits = data.habits.filter(
    (h) => !(h.id == id && h.username === username)
  );
  saveData(data);
  res.json({ message: "Habit deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});


