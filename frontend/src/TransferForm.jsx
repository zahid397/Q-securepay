import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck } from 'lucide-react';

const TransferForm = ({ addLog }) => {
  const [formData, setFormData] = useState({
    source: '',
    dest: '',
    amount: ''
  });

  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState(null);

  // Fix: Vercel build এর জন্য LOCALHOST replace করা হলো
  const API_BASE = "https://q-securepay.onrender.com"; // <-- YOUR BACKEND URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  ✓ RISK CHECK
  const checkRisk = async () => {
    if (!formData.source) return;

    try {
      addLog(`Analyzing wallet: ${formData.source}...`);

      const res = await axios.post(`${API_BASE}/api/analyze-risk`, {
        wallet_id: formData.source,
        amount: parseFloat(formData.amount || 0)
      });

      setRiskData(res.data);
      addLog(
        `Risk Score: ${res.data.score}`,
        res.data.score > 50 ? "error" : "info"
      );

    } catch (err) {
      addLog("Failed to connect to Risk Engine ❌", "error");
    }
  };

  //  ✓ TRANSFER
  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/transfer`, {
        source_wallet: formData.source,
        dest_wallet: formData.dest,
        amount: parseFloat(formData.amount)
      });

      addLog(`SUCCESS: ${res.data.message}`, "info");
      alert("Transfer Completed ✅");

    } catch (err) {
      const msg = err.response?.data?.detail?.message || "Transfer Blocked ❌";
      addLog(`BLOCKED: ${msg}`, "error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ShieldCheck color="var(--primary)" /> Secure Transfer
      </h2>

      <form onSubmit={handleTransfer}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Source Wallet</label>
          <input
            name="source"
            placeholder="J9... (Your Wallet)"
            onChange={handleChange}
            onBlur={checkRisk}
          />
        </div>

        {riskData && (
          <div
            style={{
              padding: "10px",
              marginBottom: "1rem",
              background: riskData.score > 70
                ? "rgba(255,0,0,0.1)"
                : "rgba(0,255,0,0.1)",
              border: `1px solid ${riskData.score > 70 ? "red" : "green"}`,
              borderRadius: "6px"
            }}
          >
            <strong>Risk Score: {riskData.score}/100</strong>
            <p>Status: {riskData.status}</p>
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label>Destination Wallet</label>
          <input
            name="dest"
            placeholder="A1... (Receiver)"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Amount (QUBIC)</label>
          <input
            name="amount"
            type="number"
            placeholder="1000"
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Processing..." : "EXECUTE TRANSFER"}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
