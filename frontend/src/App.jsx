import React, { useState } from "react";
import TransferForm from "./TransferForm";
import SecurityRadar from "./SecurityRadar";   // ⭐ Radar Graph Component
import { motion } from "framer-motion";        // ⭐ Smooth animation

const App = () => {
  const [logs, setLogs] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { message, type }]);

    // Auto-update risk score if message contains number
    if (message.includes("Score")) {
      const value = parseInt(message.match(/\d+/)?.[0] || "0");
      setRiskScore(value);
    }
  };

  return (
    <div style={styles.container}>
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.title}
      >
        Q-SecurePay /// Terminal v1.0
      </motion.h1>

      <p style={styles.subtitle}>Blockchain Security Gateway</p>

      <div style={styles.grid}>
        {/* ================= LEFT: TRANSFER PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.leftPanel}
        >
          <TransferForm addLog={addLog} />
        </motion.div>

        {/* ================= RIGHT: DASHBOARD ================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.rightPanel}
        >
          {/* === RISK SCORE BOX === */}
          <div style={styles.riskBox}>
            <h3 style={styles.riskTitle}>RISK SCORE</h3>

            {/* Smooth Number Animation */}
            <motion.p
              key={riskScore}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={styles.riskValue}
            >
              {riskScore}
            </motion.p>

            {/* Progress Bar */}
            <div style={styles.progressWrapper}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${riskScore}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  ...styles.progressBar,
                  background:
                    riskScore < 30
                      ? "#00ff9c"
                      : riskScore < 70
                      ? "#ffd500"
                      : "#ff4d4d",
                }}
              ></motion.div>
            </div>

            <p style={styles.confidenceText}>
              Status:{" "}
              {riskScore < 30
                ? "SAFE"
                : riskScore < 70
                ? "WARNING"
                : "DANGER"}
            </p>
          </div>

          {/* === RADAR CHART === */}
          <div style={styles.chartCard}>
            <h3 style={styles.cardTitle}>Threat Radar</h3>
            <SecurityRadar risk={riskScore} />
          </div>

          {/* === SYSTEM STATUS === */}
          <div style={styles.statusCard}>
            <h3 style={styles.cardTitle}>System Status</h3>
            <p>Node Sync: 99.4%</p>
            <p>Latency: 120ms</p>
            <p>Firewall: ACTIVE</p>
            <p>Uptime: 48h 22m</p>
          </div>

          {/* === SECURITY LOGS === */}
          <div style={styles.alertBox}>
            <h3 style={styles.cardTitle}>Security Logs</h3>

            <div style={styles.logScroll}>
              {logs.length === 0 ? (
                <p style={{ opacity: 0.5 }}>Waiting for activity...</p>
              ) : (
                logs.map((log, idx) => (
                  <p
                    key={idx}
                    style={{
                      color: log.type === "error" ? "#ff4d4d" : "#00eaff",
                      margin: "4px 0",
                    }}
                  >
                    • {log.message}
                  </p>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
