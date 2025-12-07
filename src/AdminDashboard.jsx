import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/feedbacks"); // ✅ explicit backend URL
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };
    fetchData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const averageRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length).toFixed(2)
      : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Feedback Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Rating</th>
            <th className="p-3">Review</th>
            <th className="p-3">AI Summary</th>
            <th className="p-3">Recommended Actions</th>
            <th className="p-3">Timestamp</th> {/* ✅ added header */}
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr key={index}>
              <td className="p-3">{fb.rating}</td>
              <td className="p-3">{fb.review}</td>
              <td className="p-3">{fb.aiResponse}</td>
              <td className="p-3">{fb.recommendedAction}</td>
              <td className="p-3">{new Date(fb.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Analytics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <p>Average Rating: {averageRating}</p>
      </div>
    </div>
  );
}
