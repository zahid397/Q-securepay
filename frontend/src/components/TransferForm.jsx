import React, { useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import SecurityRadar from "./SecurityRadar";   // ⭐ Radar Chart
import { motion } from "framer-motion";         // ⭐ Animation

const API_BASE = "https://q-securepay.onrender.com"; // Live backend URL

const TransferForm = ({ addLog }) => {
  const [formData, setFormData] = useState({ source: "", dest: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // 🔍 WALLET RISK CHECK
  // -----------------------------
  const checkRisk = async () => {
    if (!formData.source) return;

    addLog(`Analyzing wallet: ${formData.source}...`);

    try {
      const res = await axios.post(`${API_BASE}/api/analyze-risk`, {
        wallet_id: formData.source,
        amount: parseFloat(formData.amount || 0),
      });

      setRiskData(res.data);

      addLog(
        `Risk Analysis Complete. Score: ${res.data.score}`,
        res.data.score > 50 ? "error" : "info"
      );

    } catch (err) {
      addLog("❌ Failed to connect to Risk Engine", "error");
    }
  };

  // -----------------------------
  // 🚀 FINAL TRANSFER
  // -----------------------------
  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/transfer`, {
        source_wallet: formData.source,
        dest_wallet: formData.dest,
        amount: parseFloat(formData.amount),
      });

      addLog(`SUCCESS: ${res.data.message}`, "info");
      alert("Transfer Successful! ✅");

    } catch (err) {
      const errMsg = err.response?.data?.detail?.message || "Transfer Failed";
      addLog(`BLOCKED: ${errMsg}`, "error");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card"
    >
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ShieldCheck color="var(--primary)" /> Secure Transfer
      </h2>

      <form onSubmit={handleTransfer}>
        {/* SOURCE */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#888" }}>
            Source Wallet (Your ID)
          </label>
          <input
            name="source"
            placeholder="Ex: J9... (Qubic ID)"
            onChange={handleChange}
            onBlur={checkRisk}
          />
        </div>

        {/* RISK BOX + RADAR CHART */}
        {riskData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                padding: "10px",
                background:
                  riskData.score > 70
                    ? "rgba(255,0,0,0.1)"
                    : "rgba(0,255,0,0.1)",
                border: `1px solid ${
                  riskData.score > 70 ? "red" : "green"
                }`,
                marginBottom: "1rem",
                borderRadius: "4px",
              }}
            >
              <strong>Risk Score: {riskData.score}/100</strong>
              <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem" }}>
                Status: {riskData.status}
              </p>
            </motion.div>

            {/* RADAR CHART */}
            <SecurityRadar risk={riskData.score} />
          </>
        )}

        {/* DESTINATION */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#888" }}>
            Destination Wallet
          </label>
          <input name="dest" placeholder="Ex: A1... (Receiver ID)" onChange={handleChange} />
        </div>

        {/* AMOUNT */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#888" }}>
            Amount (QUBIC)
          </label>
          <input name="amount" type="number" placeholder="1000" onChange={handleChange} />
        </div>

        {/* BUTTON */}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Processing..." : "EXECUTE TRANSFER"}
        </button>
      </form>
    </motion.div>
  );
};

export default TransferForm;
