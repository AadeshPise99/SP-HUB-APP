import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Users, Clock, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

export default function CheckerDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [partners, setPartners] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${API}/stats`, { headers }).then(r => setStats(r.data)).catch(() => {});
    axios.get(`${API}/channel-partners`, { headers }).then(r => setPartners(r.data)).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Channel Partners', value: partners.length || '—', sub: 'Active partnerships', icon: <Users size={18} />, color: '#ede9fe', iconColor: '#6d28d9' },
    { label: 'Total Invoices', value: stats?.total_invoices ?? '—', sub: 'All time', icon: <FileText size={18} />, color: '#fef3c7', iconColor: '#d97706' },
    { label: 'Pending My Approval', value: stats?.pending_checker ?? '—', sub: 'Awaiting checker review', icon: <Clock size={18} />, color: '#fef3c7', iconColor: '#d97706' },
    { label: 'Approved (L1)', value: stats?.approved_l1 ?? '—', sub: 'Approved by checker', icon: <CheckCircle size={18} />, color: '#d1fae5', iconColor: '#059669' },
  ];

  return (
    <Layout>
      <div data-testid="checker-dashboard">
        <div className="scf-stats-grid">
          {statCards.map(c => (
            <div className="scf-stat-card" key={c.label}>
              <div className="scf-stat-icon" style={{ background: c.color }}><span style={{ color: c.iconColor }}>{c.icon}</span></div>
              <div className="scf-stat-label">{c.label}</div>
              <div className="scf-stat-value">{c.value}</div>
              <div className="scf-stat-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div className="scf-table-card" style={{ padding: 24, cursor: 'pointer' }} onClick={() => navigate('/checker/invoices')} data-testid="quick-action-invoices">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#fef3c7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} style={{ color: '#d97706' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1b4b' }}>Review Invoices</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Approve or reject pending invoices</div>
              </div>
            </div>
          </div>
          <div className="scf-table-card" style={{ padding: 24, cursor: 'pointer' }} onClick={() => navigate('/checker/channel-partners')} data-testid="quick-action-partners">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#d1fae5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} style={{ color: '#059669' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1b4b' }}>View Channel Partners</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Manage partner accounts & limits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Channel Partners */}
        <div className="scf-table-card">
          <div className="scf-table-header">
            <div>
              <div className="scf-table-title">Channel Partners Overview</div>
              <div className="scf-table-subtitle">Limit utilization summary</div>
            </div>
          </div>
          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>Sanctioned Limit</th>
                  <th>Utilized</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {partners.slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td><span className={`scf-badge ${p.type === 'Dealer' ? 'badge-checker' : 'badge-credit'}`}>{p.type}</span></td>
                    <td>{p.city}</td>
                    <td className="scf-amount">₹{(p.sanctioned_limit / 100000).toFixed(0)} L</td>
                    <td>₹{(p.utilized / 100000).toFixed(0)} L</td>
                    <td style={{ color: '#059669', fontWeight: 500 }}>₹{(p.available / 100000).toFixed(0)} L</td>
                    <td><span className={`scf-badge ${p.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
