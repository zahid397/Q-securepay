import React, { useState } from 'react';
import TransferForm from './components/TransferForm';
import './styles/main.css';

function App() {
  const [logs, setLogs] = useState([]);

  // লগ দেখানোর জন্য হেল্পার ফাংশন
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ time: timestamp, msg: message, type }, ...prev]);
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="neon-text">Q-SecurePay /// TERMINAL</h1>
        <p style={{ color: 'var(--text-muted)' }}>Secure Blockchain Transaction Guard</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Side: Transfer Form */}
        <div>
          <TransferForm addLog={addLog} />
        </div>

        {/* Right Side: Live Security Logs */}
        <div className="glass-card">
          <h2>Security Logs</h2>
          <div style={{ height: '300px', overflowY: 'auto', fontSize: '0.9rem' }}>
            {logs.length === 0 && <p style={{color: '#444'}}>Waiting for transactions...</p>}
            {logs.map((log, index) => (
              <div key={index} style={{ 
                marginBottom: '8px', 
                borderBottom: '1px solid #222', 
                paddingBottom: '4px',
                color: log.type === 'error' ? 'var(--danger)' : 'var(--primary)'
              }}>
                <span style={{ color: '#555', marginRight: '10px' }}>[{log.time}]</span>
                {log.msg}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
