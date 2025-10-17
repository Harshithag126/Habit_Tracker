export default function HabitItem({ habit, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-3 mb-2 border rounded-lg hover:bg-gray-100"
    >
      {habit}
    </div>
  );
}
