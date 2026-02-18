import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Search, Eye, FileText, X } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TABS = [
  { key: 'all', label: 'All Invoices' },
  { key: 'pending_approval', label: 'Pending Approval' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

const fmt = (n) => `₹${(n / 100000).toFixed(2)} L`;
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const StatusBadge = ({ status }) => {
  const map = { pending_approval: ['badge-pending', 'Pending Approval'], approved: ['badge-approved', 'Approved'], rejected: ['badge-rejected', 'Rejected'] };
  const [cls, label] = map[status] || ['badge-inactive', status];
  return <span className={`scf-badge ${cls}`}>{label}</span>;
};

export default function CheckerInvoices() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeTab !== 'all' ? { status: activeTab } : {};
      const res = await axios.get(`${API}/invoices`, { headers, params });
      setInvoices(res.data);
    } catch { toast.error('Failed to load invoices'); }
    finally { setLoading(false); }
  }, [activeTab]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const filtered = invoices.filter(inv =>
    inv.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
    inv.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
    inv.channel_partner.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {};
  TABS.forEach(t => { counts[t.key] = t.key === 'all' ? invoices.length : invoices.filter(i => i.status === t.key).length; });

  return (
    <Layout>
      <div data-testid="checker-invoices">
        <div className="scf-table-card">
          <div style={{ padding: '0 20px' }}>
            <div className="scf-tabs">
              {TABS.map(t => (
                <div key={t.key} className={`scf-tab${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)} data-testid={`checker-tab-${t.key}`}>
                  {t.label}{counts[t.key] > 0 && <span className="scf-tab-count">{counts[t.key]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="scf-filter-bar">
            <div className="scf-search-wrap">
              <Search />
              <input className="scf-search-input" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} data-testid="checker-invoice-search" />
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: '#6b7280' }}>{filtered.length} records</span>
          </div>

          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr><th>#</th><th>Invoice No</th><th>Channel Partner</th><th>Invoice Date</th><th>Due Date</th><th>Amount</th><th>Discount Rate</th><th>Net Amount</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={10} className="scf-loading"><div className="scf-spinner"></div></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={10}><div className="scf-empty"><FileText /><h3>No invoices found</h3></div></td></tr>
                ) : (
                  filtered.map((inv, i) => (
                    <tr key={inv.id}>
                      <td style={{ color: '#9ca3af' }}>{i + 1}</td>
                      <td style={{ fontWeight: 600, color: '#5b21b6' }}>{inv.invoice_no}</td>
                      <td>{inv.channel_partner}</td>
                      <td>{fmtDate(inv.invoice_date)}</td>
                      <td>{fmtDate(inv.due_date)}</td>
                      <td className="scf-amount">{fmt(inv.amount)}</td>
                      <td>{inv.discount_rate}%</td>
                      <td className="scf-amount">{fmt(inv.net_amount)}</td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td>
                        <button className="scf-btn scf-btn-secondary scf-btn-sm" onClick={() => setSelected(inv)} data-testid={`checker-view-${inv.id}`}>
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="scf-pagination"><span>Showing {filtered.length} of {invoices.length} invoices</span></div>
        </div>

        {selected && (
          <div className="scf-modal-overlay" onClick={() => setSelected(null)}>
            <div className="scf-modal-panel" onClick={e => e.stopPropagation()} data-testid="checker-invoice-detail">
              <div className="scf-modal-header">
                <div>
                  <div className="scf-modal-title">{selected.invoice_no}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{selected.program_name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StatusBadge status={selected.status} />
                  <button className="scf-modal-close" onClick={() => setSelected(null)}><X size={14} /></button>
                </div>
              </div>
              <div className="scf-modal-body">
                <div className="scf-detail-section">
                  <div className="scf-detail-section-title">Invoice Information</div>
                  <div className="scf-detail-grid">
                    {[['Invoice No', selected.invoice_no], ['Program', selected.program_name], ['Invoice Date', fmtDate(selected.invoice_date)], ['Due Date', fmtDate(selected.due_date)], ['Buyer', selected.buyer_name], ['Seller', selected.seller_name], ['Channel Partner', selected.channel_partner], ['Raised By', selected.created_by_name]].map(([l, v]) => (
                      <div key={l} className="scf-detail-item"><label>{l}</label><span>{v}</span></div>
                    ))}
                  </div>
                </div>
                <div className="scf-detail-section">
                  <div className="scf-detail-section-title">Financial Summary</div>
                  <div className="scf-detail-grid">
                    {[['Invoice Amount', fmt(selected.amount)], ['Discount Rate', `${selected.discount_rate}% p.a.`], ['Discount Amount', fmt(selected.discount_amount)], ['Net Amount', fmt(selected.net_amount)]].map(([l, v]) => (
                      <div key={l} className="scf-detail-item"><label>{l}</label><span>{v}</span></div>
                    ))}
                  </div>
                </div>
                {selected.line_items?.length > 0 && (
                  <div className="scf-detail-section">
                    <div className="scf-detail-section-title">Line Items</div>
                    <table className="scf-line-table">
                      <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
                      <tbody>{selected.line_items.map((li, i) => (<tr key={i}><td>{li.description}</td><td>{li.qty}</td><td>{fmt(li.unit_price)}</td><td>{fmt(li.total)}</td></tr>))}</tbody>
                      <tfoot><tr><td colSpan={3}>Total</td><td>{fmt(selected.amount)}</td></tr></tfoot>
                    </table>
                  </div>
                )}
                {selected.remarks && (
                  <div className="scf-detail-section">
                    <div className="scf-detail-section-title">Remarks</div>
                    <p style={{ fontSize: 13.5, color: '#374151', background: '#f8f9fc', padding: '10px 14px', borderRadius: 6, margin: 0 }}>{selected.remarks}</p>
                  </div>
                )}
              </div>
              <div className="scf-modal-footer">
                <button className="scf-btn scf-btn-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
