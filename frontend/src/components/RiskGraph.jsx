import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RiskGraph = () => {
  const data = {
    labels: ["10m", "20m", "30m", "40m", "50m", "60m"],
    datasets: [
      {
        label: "Risk Level",
        data: [20, 35, 40, 50, 45, 60],
        borderColor: "#00f0ff",
        backgroundColor: "rgba(0,255,255,0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#0ff" } },
      y: { ticks: { color: "#0ff" } }
    }
  };

  return (
    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h3 style={{ color: "#0ff" }}>RISK LEVEL (LAST 1 HOUR)</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default RiskGraph;
