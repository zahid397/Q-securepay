import React from 'react';
import { Bell } from 'lucide-react';

const AlertsPanel = () => {
  // হ্যাকাথনের জন্য কিছু হার্ডকোডেড রিসেন্ট অ্যালার্ট
  const alerts = [
    { id: 1, msg: "High risk transfer blocked from Wallet J9...2x", time: "2 min ago", type: "crit" },
    { id: 2, msg: "New policy update detected on Qubic Network", time: "10 min ago", type: "info" },
    { id: 3, msg: "System connected to Qubic RPC Node", time: "15 min ago", type: "success" },
  ];

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffcc00' }}>
        <Bell size={20} /> System Alerts
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{
            padding: '10px',
            background: 'rgba(0,0,0,0.3)',
            borderLeft: `3px solid ${alert.type === 'crit' ? 'red' : alert.type === 'success' ? 'green' : 'cyan'}`,
            fontSize: '0.85rem'
          }}>
            <div style={{ marginBottom: '4px', color: '#fff' }}>{alert.msg}</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
