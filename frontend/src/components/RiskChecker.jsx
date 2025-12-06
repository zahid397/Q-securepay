import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const API_BASE = "https://q-securepay.onrender.com"; // LIVE Backend

const RiskChecker = () => {
  const [walletId, setWalletId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!walletId) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/api/analyze-risk`, {
        wallet_id: walletId,
        amount: 0
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <h3>🕵️ Wallet Investigator</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          placeholder="Enter Wallet ID to Scan..." 
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
        <button className="btn-primary" style={{ width: 'auto' }} onClick={handleCheck} disabled={loading}>
          <Search size={20} />
        </button>
      </div>

      {loading && <p className="neon-text">Scanning Blockchain Nodes...</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p>Risk Score: {result.score}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
};

export default RiskChecker;
