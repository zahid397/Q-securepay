import React, { useState } from "react";
import TransferForm from "./TransferForm";

const App = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { message, type }]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Q-SecurePay /// Terminal</h1>
      <p style={styles.subtitle}>Secure Blockchain Transaction Guard</p>

      <div style={styles.wrapper}>
        {/* LEFT SIDE: Transfer */}
        <div style={styles.card}>
          <TransferForm addLog={addLog} />
        </div>

        {/* RIGHT SIDE: Logs */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Security Logs</h2>

          <div style={styles.logBox}>
            {logs.length === 0 ? (
              <p style={{ opacity: 0.6 }}>Waiting for transactions…</p>
            ) : (
              logs.map((log, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: 0,
                    color: log.type === "error" ? "#ff4d4d" : "#00eaff",
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
  );
};

export default App;

// =============================
// Inline Styles
// =============================
const styles = {
  container: {
    minHeight: "100vh",
    background: "#07080F",
    color: "#E8F7FF",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "30px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.6rem",
    letterSpacing: "3px",
    color: "#00F0FF",
    textShadow: "0 0 15px #00F0FF",
  },
  subtitle: {
    marginTop: "-10px",
    marginBottom: "40px",
    fontSize: "1rem",
    opacity: 0.7,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },
  card: {
    background: "rgba(0, 15, 25, 0.6)",
    border: "1px solid #003C4D",
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    width: "330px",
    backdropFilter: "blur(8px)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#00E6FF",
  },
  logBox: {
    height: "260px",
    overflowY: "auto",
    textAlign: "left",
    padding: "10px",
    border: "1px solid #004A5A",
    borderRadius: "8px",
    background: "rgba(0, 20, 30, 0.4)",
  },
};
