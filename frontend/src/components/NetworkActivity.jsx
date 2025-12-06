import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const NetworkActivity = () => {
  const data = {
    labels: ["12:00", "12:10", "12:20", "12:30", "12:40", "12:50"],
    datasets: [
      {
        label: "Transactions",
        data: [10, 20, 15, 30, 25, 40],
        backgroundColor: "#00f0ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#0ff" } },
      y: { ticks: { color: "#0ff" } },
    },
  };

  return (
    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h3 style={{ color: "#0ff" }}>NETWORK ACTIVITY</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NetworkActivity;
