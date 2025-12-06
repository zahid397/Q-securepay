import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, AlertTriangle } from 'lucide-react'; // Icons

const API_BASE = "https://q-securepay.onrender.com"; // 🔥 Live backend URL

const TransferForm = ({ addLog }) => {
  const [formData, setFormData] = useState({ source: '', dest: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ১. রিস্ক চেক ফাংশন
  const checkRisk = async () => {
    if (!formData.source) return;
    try {
      addLog(`Analyzing wallet: ${formData.source}...`);

      const res = await axios.post(`${API_BASE}/api/analyze-risk`, {
        wallet_id: formData.source,
        amount: parseFloat(formData.amount || 0)
      });

      setRiskData(res.data);
      addLog(`Risk Analysis Complete. Score: ${res.data.score}`, res.data.score > 50 ? 'error' : 'info');
    } catch (err) {
      addLog('Failed to connect to Risk Engine', 'error');
    }
  };

  // ২. ফাইনাল ট্রান্সফার ফাংশন
  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/transfer`, {
        source_wallet: formData.source,
        dest_wallet: formData.dest,
        amount: parseFloat(formData.amount)
      });

      addLog(`SUCCESS: ${res.data.message}`, 'info');
      alert("Transfer Successful! ✅");

    } catch (err) {
      const errMsg = err.response?.data?.detail?.message || "Transfer Failed";
      addLog(`BLOCKED: ${errMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ShieldCheck color="var(--primary)" /> Secure Transfer
      </h2>
      
      <form onSubmit={handleTransfer}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Source Wallet (Your ID)</label>
          <input 
            name="source" 
            placeholder="Ex: J9... (Qubic ID)" 
            onChange={handleChange} 
            onBlur={checkRisk}
          />
        </div>

        {riskData && (
          <div style={{ 
            padding: '10px', 
            background: riskData.score > 70 ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)',
            border: `1px solid ${riskData.score > 70 ? 'red' : 'green'}`,
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            <strong>Risk Score: {riskData.score}/100</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem' }}>
              Status: {riskData.status}
            </p>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Destination Wallet</label>
          <input name="dest" placeholder="Ex: A1... (Receiver ID)" onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Amount (QUBIC)</label>
          <input name="amount" type="number" placeholder="1000" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Processing..." : "EXECUTE TRANSFER"}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
