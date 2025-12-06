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

const SecurityRadar = ({ riskScore }) => {
  const data = {
    labels: ["Transactions", "Age", "Flags", "Velocity", "Trust"],
    datasets: [
      {
        label: "Risk Metrics",
        data: [
          Math.random() * riskScore,
          Math.random() * riskScore,
          Math.random() * riskScore,
          Math.random() * riskScore,
          Math.random() * riskScore,
        ],
        backgroundColor: "rgba(0, 255, 255, 0.3)",
        borderColor: "cyan",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{
      background: "rgba(0, 20, 30, 0.5)",
      border: "1px solid #004d61",
      padding: "20px",
      borderRadius: "12px"
    }}>
      <h3 style={{ color: "cyan", marginBottom: "10px" }}>Threat Radar</h3>
      <Radar data={data} />
    </div>
  );
};

export default SecurityRadar;
