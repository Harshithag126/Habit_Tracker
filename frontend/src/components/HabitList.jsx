import { useState } from "react";
import HabitItem from "./HabitItem";

export default function HabitList() {
  const [habits, setHabits] = useState(["Drink water", "Exercise"]);

  return (
    <div>
      {habits.map((habit, index) => (
        <HabitItem key={index} habit={habit} onClick={() => alert(habit)} />
      ))}
    </div>
  );
}
