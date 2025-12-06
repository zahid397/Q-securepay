import React from "react";
import {
  Radar,
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import { Radar as RadarChart } from "react-chartjs-2";

// chart.js register
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
    labels: ["Wallet Age", "Activity", "Flags", "Incoming", "Outgoing"],
    datasets: [
      {
        label: "Risk Profile",
        data: [
          riskScore,
          Math.max(10, riskScore - 20),
          Math.min(100, riskScore + 10),
          40,
          70,
        ],
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderColor: "#00eaff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ background: "#001018", padding: "20px", borderRadius: "10px" }}>
      <h3 style={{ color: "#00eaff", marginBottom: "10px" }}>Risk Radar</h3>
      <RadarChart data={data} />
    </div>
  );
};

export default SecurityRadar;
