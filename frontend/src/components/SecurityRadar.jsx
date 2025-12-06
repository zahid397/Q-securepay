import React from "react";
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

const SecurityRadar = ({ risk }) => {
  const data = [
    { metric: "Wallet Trust", value: 100 - risk },
    { metric: "History Score", value: 70 },
    { metric: "Amount Safety", value: risk > 70 ? 20 : 80 },
    { metric: "Blacklist", value: risk > 80 ? 10 : 90 },
    { metric: "Age Weight", value: risk > 50 ? 40 : 90 },
  ];

  return (
    <div style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#0ff4" />
          <PolarAngleAxis dataKey="metric" stroke="#00F0FF" />
          <PolarRadiusAxis stroke="#555" />
          <Radar
            name="Security"
            dataKey="value"
            stroke="#00E6FF"
            fill="#00E6FF55"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecurityRadar;
