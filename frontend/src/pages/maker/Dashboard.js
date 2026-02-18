import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, FileText, CheckCircle, Clock, XCircle, IndianRupee } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const PROGRAMS_MOCK = [
  { anchor: 'Tata Motors Ltd', channelPartner: 'Jagdamba Motors', product: 'Dealer Finance', pte: 30, limit: 500, utilized: 150, status: 'Active' },
  { anchor: 'Tata Motors Ltd', channelPartner: 'Krishna Auto Dealers', product: 'Dealer Finance', pte: 45, limit: 300, utilized: 85, status: 'Active' },
  { anchor: 'Tata Motors Ltd', channelPartner: 'Shree Ganesh Motors', product: 'Vendor Finance', pte: 60, limit: 800, utilized: 320, status: 'Active' },
  { anchor: 'Tata Motors Ltd', channelPartner: 'Meenakshi Auto', product: 'Dealer Finance', pte: 30, limit: 250, utilized: 98, status: 'Active' },
  { anchor: 'Tata Motors Ltd', channelPartner: 'Sunrise Vehicles', product: 'Vendor Finance', pte: 45, limit: 450, utilized: 180, status: 'Active' },
];

const fmtCr = (v) => `₹${(v / 100).toFixed(1)} Cr`;

export default function MakerDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${API}/stats`, { headers }).then(r => setStats(r.data)).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total SCF Limit', value: '₹200 Cr', sub: 'Sanctioned by bank', icon: <IndianRupee size={18} />, color: '#ede9fe', iconColor: '#6d28d9' },
    { label: 'Active Programs', value: '5', sub: '1 inactive', icon: <TrendingUp size={18} />, color: '#d1fae5', iconColor: '#059669' },
    { label: 'Total Invoices', value: stats?.total_invoices ?? '—', sub: `${stats?.pending_approval ?? 0} pending approval`, icon: <FileText size={18} />, color: '#fef3c7', iconColor: '#d97706' },
    { label: 'Approved Invoices', value: stats?.approved ?? '—', sub: `₹${((stats?.approved_amount || 0) / 10000000).toFixed(1)} Cr disbursed`, icon: <CheckCircle size={18} />, color: '#d1fae5', iconColor: '#059669' },
  ];

  return (
    <Layout>
      <div data-testid="maker-dashboard">
        {/* Stats */}
        <div className="scf-stats-grid">
          {statCards.map(c => (
            <div className="scf-stat-card" key={c.label}>
              <div className="scf-stat-icon" style={{ background: c.color }}>
                <span style={{ color: c.iconColor }}>{c.icon}</span>
              </div>
              <div className="scf-stat-label">{c.label}</div>
              <div className="scf-stat-value">{c.value}</div>
              <div className="scf-stat-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Active Programs Summary */}
        <div className="scf-table-card" style={{ marginBottom: 20 }}>
          <div className="scf-table-header">
            <div>
              <div className="scf-table-title">Active Programs</div>
              <div className="scf-table-subtitle">Current SCF programs</div>
            </div>
            <span style={{ fontSize: 12, color: '#6d28d9', cursor: 'pointer', fontWeight: 500 }}
              onClick={() => window.location.href = '/maker/programs'}>View All →</span>
          </div>
          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr>
                  <th>Channel Partner</th>
                  <th>Product</th>
                  <th>PTE Days</th>
                  <th>Total Limit</th>
                  <th>Utilized</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMS_MOCK.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{p.channelPartner}</td>
                    <td>{p.product}</td>
                    <td>{p.pte}</td>
                    <td className="scf-amount">₹{p.limit} L</td>
                    <td>₹{p.utilized} L</td>
                    <td style={{ color: '#059669', fontWeight: 500 }}>₹{p.limit - p.utilized} L</td>
                    <td><span className="scf-badge badge-active">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { label: 'Pending Approvals', value: stats?.pending_approval ?? 0, color: '#fef3c7', text: '#92400e', icon: <Clock size={20} /> },
            { label: 'Approved This Month', value: stats?.approved ?? 0, color: '#d1fae5', text: '#065f46', icon: <CheckCircle size={20} /> },
            { label: 'Rejected Invoices', value: stats?.rejected ?? 0, color: '#fee2e2', text: '#991b1b', icon: <XCircle size={20} /> },
          ].map(item => (
            <div key={item.label} className="scf-stat-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.text }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1e1b4b' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
