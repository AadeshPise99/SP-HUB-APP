import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Users, Clock, CheckCircle, PlusCircle, TrendingUp } from 'lucide-react';
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
    { label: 'Total Channel Partners', value: partners.length || 6, sub: 'Active partnerships', icon: <Users size={18} />, color: '#ede9fe', iconColor: '#6d28d9' },
    { label: 'Total Invoices Raised', value: stats?.total_invoices ?? '—', sub: 'All time', icon: <FileText size={18} />, color: '#fef3c7', iconColor: '#d97706' },
    { label: 'Pending Approval', value: stats?.pending_approval ?? '—', sub: 'Awaiting maker', icon: <Clock size={18} />, color: '#fef3c7', iconColor: '#d97706' },
    { label: 'Approved', value: stats?.approved ?? '—', sub: 'Successfully processed', icon: <CheckCircle size={18} />, color: '#d1fae5', iconColor: '#059669' },
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
          <div className="scf-table-card" style={{ padding: 24, cursor: 'pointer' }} onClick={() => navigate('/checker/raise-invoice')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#ede9fe', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlusCircle size={22} style={{ color: '#6d28d9' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1b4b' }}>Raise New Invoice</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Submit invoice for maker approval</div>
              </div>
            </div>
          </div>
          <div className="scf-table-card" style={{ padding: 24, cursor: 'pointer' }} onClick={() => navigate('/checker/channel-partners')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#d1fae5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} style={{ color: '#059669' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1b4b' }}>View Channel Partners</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Manage partner accounts</div>
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
                  <th>Limit</th>
                  <th>Utilized</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {partners.slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td><span className={`scf-badge ${p.type === 'Dealer' ? 'badge-checker' : 'badge-credit'}`}>{p.type}</span></td>
                    <td>{p.city}</td>
                    <td className="scf-amount">₹{(p.limit / 100000).toFixed(0)} L</td>
                    <td>₹{(p.utilized / 100000).toFixed(0)} L</td>
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
