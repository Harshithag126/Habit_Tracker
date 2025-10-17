import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        🌱 Habit Tracker
      </h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <HabitForm />
        <HabitList />
      </div>
    </div>
  );
}
