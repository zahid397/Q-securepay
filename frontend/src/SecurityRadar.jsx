// SecurityRadar.jsx
import React from "react";
import {
  Radar,
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SecurityRadar = ({ risk }) => {
  const data = {
    labels: [
      "Wallet Age",
      "Transaction Volume",
      "History Cleanliness",
      "Network Reputation",
      "Fraud Pattern Match",
      "Velocity Risk",
    ],
    datasets: [
      {
        label: "Threat Level",
        data: [
          risk * 0.6,
          risk * 0.8,
          risk * 0.4,
          risk * 0.9,
          risk * 0.7,
          risk * 0.5,
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
        angleLines: { color: "#003b45" },
        grid: { color: "#004f5e" },
        pointLabels: {
          color: "#b9faff",
          font: { size: 11 },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#001d24",
        titleColor: "#00eaff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SecurityRadar;
