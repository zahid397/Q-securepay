import React from "react";
import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SecurityRadar = ({ score = 50 }) => {
  const data = {
    labels: ["Risk", "Trust", "History", "Activity", "Reputation"],
    datasets: [
      {
        label: "Security Metrics",
        data: [
          score,
          100 - score,
          score * 0.7,
          score * 1.1,
          90 - score * 0.6,
        ],
        backgroundColor: "rgba(0, 255, 255, 0.25)",
        borderColor: "#00eaff",
        borderWidth: 2,
        pointBackgroundColor: "#00eaff",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        grid: { color: "rgba(0,255,255,0.15)" },
        angleLines: { color: "rgba(0,255,255,0.2)" },
        pointLabels: { color: "#00eaff", font: { size: 12 } },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ padding: "10px" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SecurityRadar;
