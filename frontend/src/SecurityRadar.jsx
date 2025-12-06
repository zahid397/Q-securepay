import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import { Radar } from "react-chartjs-2";

// REQUIRED for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SecurityRadar = ({ risk = 50 }) => {
  // Sequential Danger Values
  const seq1 = risk;          // Suspicious transfers
  const seq2 = risk * 0.8;    // Volume spike
  const seq3 = risk * 0.6;    // Wallet age
  const seq4 = risk * 0.4;    // History score
  const seq5 = 100 - risk;    // Reputation inverse

  const data = {
    labels: [
      "Transfers",
      "Volume Spike",
      "Wallet Age",
      "History",
      "Reputation"
    ],
    datasets: [
      {
        label: "Threat Radar",
        data: [seq1, seq2, seq3, seq4, seq5],
        backgroundColor: "rgba(0, 255, 255, 0.25)",
        borderColor: "cyan",
        borderWidth: 2,
        pointBackgroundColor: "cyan",
        pointRadius: 3
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "rgba(0,255,255,0.1)" },
        angleLines: { color: "rgba(0,255,255,0.15)" }
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <div style={{ width: "100%", height: "250px" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SecurityRadar;
