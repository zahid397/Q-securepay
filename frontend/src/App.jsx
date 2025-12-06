import React, { useState } from "react";
import TransferForm from "./TransferForm.jsx";
import SecurityRadar from "./SecurityRadar.jsx";  // ⭐ Radar Component
import { motion } from "framer-motion";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  // Add logs + auto detect score
  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { message, type }]);

    // extract risk score from logs
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


      {/* ================= GRID ================= */}
      <div style={styles.grid}>
        
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.leftPanel}
        >
          <TransferForm addLog={addLog} />
        </motion.div>

        
        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.rightPanel}
        >
          
          {/* === RISK SCORE === */}
          <div style={styles.riskBox}>
            <h3 style={styles.riskTitle}>RISK SCORE</h3>

            {/* Risk Number Animation */}
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

          {/* === THREAT RADAR === */}
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



// ====================================================
//                      STYLES
// ====================================================

const styles = {
  container: {
    minHeight: "100vh",
    background: "#07080F",
    color: "#E8F7FF",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "35px",
  },
  title: {
    textAlign: "center",
    fontSize: "2.8rem",
    color: "#00eaff",
    textShadow: "0 0 15px #00eaff",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.6,
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },

  leftPanel: {
    background: "rgba(0, 20, 30, 0.45)",
    border: "1px solid #003c4d",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0,255,255,0.15)",
  },

  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  riskBox: {
    background: "rgba(0, 20, 30, 0.5)",
    border: "1px solid #004d61",
    borderRadius: "10px",
    padding: "20px",
  },
  riskTitle: {
    fontSize: "1.3rem",
    color: "#00eaff",
    marginBottom: "10px",
  },
  riskValue: {
    fontSize: "3.5rem",
    textAlign: "center",
    textShadow: "0 0 10px cyan",
  },

  progressWrapper: {
    background: "#00151c",
    height: "10px",
    width: "100%",
    borderRadius: "4px",
    marginTop: "10px",
  },
  progressBar: {
    height: "100%",
    borderRadius: "4px",
  },
  confidenceText: {
    marginTop: "10px",
    textAlign: "center",
    opacity: 0.7,
  },

  chartCard: {
    background: "rgba(0, 20, 30, 0.5)",
    border: "1px solid #004d61",
    borderRadius: "10px",
    padding: "20px",
  },

  statusCard: {
    background: "rgba(0, 20, 30, 0.5)",
    border: "1px solid #004d61",
    borderRadius: "10px",
    padding: "20px",
  },

  cardTitle: {
    fontSize: "1.3rem",
    color: "#00eaff",
    marginBottom: "10px",
  },

  alertBox: {
    background: "rgba(0, 20, 30, 0.5)",
    border: "1px solid #004d61",
    borderRadius: "10px",
    padding: "20px",
  },

  logScroll: {
    height: "200px",
    overflowY: "auto",
    border: "1px solid #003a47",
    padding: "10px",
    borderRadius: "8px",
  },
};
