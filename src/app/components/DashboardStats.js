import { useState, useEffect } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    Pending: 0,
    Confirmed: 0,
    Completed: 0,
    Cancelled: 0
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api/bookings/stats") // Adjust API route if needed
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
      </button>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {[
          { label: "Pending", value: stats.Pending, color: "bg-blue-600" },
          { label: "Confirmed", value: stats.Confirmed, color: "bg-green-600" },
          { label: "Completed", value: stats.Completed, color: "bg-gray-600" },
          { label: "Cancelled", value: stats.Cancelled, color: "bg-red-600" }
        ].map(({ label, value, color }) => (
          <div key={label} className={`p-6 rounded-lg text-white ${color}`}>
            <h2 className="text-xl font-bold">{value}</h2>
            <p>{label} Bookings</p>
          </div>
        ))}
      </div>
    </div>
  );
}
