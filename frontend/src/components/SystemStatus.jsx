import React from "react";

const SystemStatus = () => {
  return (
    <div className="glass-card" style={{ marginBottom: "20px" }}>
      <h3 style={{ color: "#0ff" }}>SYSTEM STATUS</h3>
      <p>API Status: <span style={{ color: "#0f0" }}>ONLINE</span></p>
      <p>Node Sync: 99.8%</p>
      <p>Latency: 21ms</p>
      <p>Firewall: ACTIVE</p>
      <p>Uptime: 45h 12m</p>
    </div>
  );
};

export default SystemStatus;
