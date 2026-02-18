import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Search } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

export default function MakerPrograms() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState('');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${API}/programs`, { headers }).then(r => setPrograms(r.data)).catch(() => {});
  }, []);

  const filtered = programs.filter(p =>
    p.channel_partner.toLowerCase().includes(search.toLowerCase()) ||
    p.product.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n) => `₹${(n / 100000).toFixed(1)} L`;
  const pct = (u, t) => Math.round((u / t) * 100);

  return (
    <Layout>
      <div data-testid="maker-programs">
        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'Total Programs', value: programs.length },
            { label: 'Active', value: programs.filter(p => p.status === 'Active').length },
            { label: 'Total Limit', value: `₹${(programs.reduce((a, p) => a + p.total_limit, 0) / 10000000).toFixed(0)} Cr` },
            { label: 'Total Utilized', value: `₹${(programs.reduce((a, p) => a + p.utilized, 0) / 10000000).toFixed(0)} Cr` },
          ].map(s => (
            <div key={s.label} className="scf-stat-card">
              <div className="scf-stat-label">{s.label}</div>
              <div className="scf-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="scf-table-card">
          <div className="scf-table-header">
            <div>
              <div className="scf-table-title">Active Programs</div>
              <div className="scf-table-subtitle">{filtered.length} programs found</div>
            </div>
            <div className="scf-search-wrap">
              <Search />
              <input
                className="scf-search-input"
                placeholder="Search by partner or product..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                data-testid="programs-search"
              />
            </div>
          </div>

          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Anchor</th>
                  <th>Channel Partner</th>
                  <th>Product</th>
                  <th>PTE Days</th>
                  <th>Total Limit</th>
                  <th>Utilized</th>
                  <th>Available</th>
                  <th>Utilization %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ color: '#9ca3af' }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{p.anchor}</td>
                    <td style={{ fontWeight: 500 }}>{p.channel_partner}</td>
                    <td>
                      <span className={`scf-badge ${p.product === 'Dealer Finance' ? 'badge-checker' : 'badge-credit'}`}>
                        {p.product}
                      </span>
                    </td>
                    <td>{p.pte_days} days</td>
                    <td className="scf-amount">{fmt(p.total_limit)}</td>
                    <td>{fmt(p.utilized)}</td>
                    <td style={{ color: '#059669', fontWeight: 500 }}>{fmt(p.available)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3 }}>
                          <div style={{ width: `${pct(p.utilized, p.total_limit)}%`, height: '100%', background: '#7c3aed', borderRadius: 3 }}></div>
                        </div>
                        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 32 }}>{pct(p.utilized, p.total_limit)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`scf-badge ${p.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="scf-empty"><p>No programs found.</p></div>
          )}
        </div>
      </div>
    </Layout>
  );
}
