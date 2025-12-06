import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const RiskChecker = () => {
  const [walletId, setWalletId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!walletId) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/analyze-risk', {
        wallet_id: walletId,
        amount: 0 // Just checking reputation
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
        <div style={{ marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Trust Score:</span>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: result.score > 50 ? 'var(--danger)' : '#00ff80' 
            }}>
              {100 - result.score}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', marginTop: '5px' }}>
            <div style={{ 
              width: `${100 - result.score}%`, 
              height: '100%', 
              background: result.score > 50 ? 'red' : 'green',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }}></div>
          </div>

          <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#ccc' }}>
            Verdict: {result.status === 'SAFE' ? '✅ Safe Entity' : '⚠️ Suspicious Activity Detected'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskChecker;
