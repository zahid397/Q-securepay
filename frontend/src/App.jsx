import React, { useState } from "react";
import TransferForm from "./TransferForm";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { message, type }]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Q-SecurePay /// Terminal v1.0</h1>
      <p style={styles.subtitle}>Blockchain Security Gateway</p>

      <div style={styles.grid}>
        {/* ================= Left Panel ================ */}
        <div style={styles.leftPanel}>
          <TransferForm
            addLog={(msg, type) => {
              addLog(msg, type);

              // auto update risk score if message contains risk
              if (msg.includes("Score")) {
                const s = parseInt(msg.match(/\d+/)[0]);
                setRiskScore(s);
              }
            }}
          />
        </div>

        {/* ================= Right Panel (Dashboard) ================ */}
        <div style={styles.rightPanel}>
          {/* RISK SCORE BOX */}
          <div style={styles.riskBox}>
            <h3 style={styles.riskTitle}>RISK SCORE</h3>
            <p style={styles.riskValue}>{riskScore}</p>

            {/* Progress Bar */}
            <div style={styles.progressWrapper}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${riskScore}%`,
                  background:
                    riskScore < 30
                      ? "#00ff9c"
                      : riskScore < 70
                      ? "#ffd500"
                      : "#ff4d4d",
                }}
              ></div>
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

          {/* System Status */}
          <div style={styles.statusCard}>
            <h3 style={styles.cardTitle}>System Status</h3>
            <p>Node Sync: 99.4%</p>
            <p>Latency: 120ms</p>
            <p>Firewall: ACTIVE</p>
            <p>Uptime: 48h 22m</p>
          </div>

          {/* Alerts Log */}
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
        </div>
      </div>
    </div>
  );
};

export default App;

// =============================
//      STYLES (Cyber UI)
// =============================

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

  /* Left Panel (Transfer) */
  leftPanel: {
    background: "rgba(0, 20, 30, 0.45)",
    border: "1px solid #003c4d",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0,255,255,0.15)",
  },

  /* Right Panel Dashboard */
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  /* RISK BOX */
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

  /* STATUS CARD */
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

  /* ALERT BOX */
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
