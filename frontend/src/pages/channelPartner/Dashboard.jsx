import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';

// Static CP Leads Data matching reference design
const CP_LEADS_DATA = [
  {
    id: 'PSBLEAD042301',
    companyName: 'JAGDAMBA MOTORS',
    leadDate: '20-02-2026',
    typeOfLead: 'Channel Partner Lead',
    programNames: ['Tata-CBI Dealer Finance', 'TATA-DF-SBI PROGRAM 2', 'TATA-DF-SBI PROGRAM 3'],
    lenderNames: ['STATE BANK OF INDIA', 'CENTRAL BANK OF INDIA'],
    product: 'DF',
    ageing: 5,
    status: 'Offer Submitted',
  },
  {
    id: 'PSBLEAD042302',
    companyName: 'JAGDAMBA MOTORS',
    leadDate: '22-02-2026',
    typeOfLead: 'Channel Partner Lead',
    programNames: ['Tata-CBI Dealer Finance'],
    lenderNames: ['CENTRAL BANK OF INDIA'],
    product: 'DF',
    ageing: 3,
    status: 'Offer Expired',
  },
  {
    id: 'PSBLEAD042303',
    companyName: 'JAGDAMBA MOTORS',
    leadDate: '23-02-2026',
    typeOfLead: 'Channel Partner Lead',
    programNames: ['TATA-DF-SBI PROGRAM 3'],
    lenderNames: ['STATE BANK OF INDIA'],
    product: 'DF',
    ageing: 2,
    status: 'Match Found',
  },
  {
    id: 'PSBLEAD042304',
    companyName: 'JAGDAMBA MOTORS',
    leadDate: '24-02-2026',
    typeOfLead: 'Channel Partner Lead',
    programNames: ['Tata-CBI Dealer Finance', 'TATA-DF-SBI PROGRAM 2'],
    lenderNames: ['STATE BANK OF INDIA', 'CENTRAL BANK OF INDIA'],
    product: 'DF',
    ageing: 1,
    status: 'Opportunity',
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Offer Submitted':
      return { bg: '#dcfce7', color: '#15803d' };
    case 'Offer Expired':
      return { bg: '#fee2e2', color: '#dc2626' };
    case 'Match Found':
      return { bg: '#ede9fe', color: '#7c3aed' };
    case 'Opportunity':
      return { bg: '#fef3c7', color: '#b45309' };
    default:
      return { bg: '#f3f4f6', color: '#6b7280' };
  }
};

export default function CPDashboard() {
  const { user } = useAuth();
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <Layout>
      <div data-testid="cp-dashboard">
        {/* Header with + New Lead button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#6d28d9', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={16} />
            New Lead
          </button>
        </div>

        {/* Lead Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {CP_LEADS_DATA.map((lead) => {
            const statusStyle = getStatusStyle(lead.status);
            return (
              <div key={lead.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1e1b4b' }}>{lead.companyName}</div>
                    <div style={{ fontSize: 13, color: '#7c3aed', fontWeight: 500, marginTop: 2 }}>#{lead.id}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{lead.product}</span>
                    <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>▲ Ageing: {lead.ageing} Day{lead.ageing > 1 ? 's' : ''}</span>
                    <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{lead.status}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 2fr 2fr', gap: 20, padding: '16px 20px', alignItems: 'flex-start' }}>
                  {/* Lead Date */}
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', marginBottom: 4 }}>Lead Date</div>
                    <div style={{ fontSize: 14, color: '#1e1b4b', fontWeight: 600 }}>{lead.leadDate}</div>
                  </div>

                  {/* Type of Lead */}
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', marginBottom: 4 }}>Type of Lead</div>
                    <div style={{ fontSize: 14, color: '#7c3aed', fontWeight: 500 }}>{lead.typeOfLead}</div>
                  </div>

                  {/* Program Name */}
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', marginBottom: 4 }}>Program Name</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {lead.programNames.map((name, idx) => (
                        <div key={idx} style={{ fontSize: 13, color: '#1e1b4b', fontWeight: 500 }}>{name}</div>
                      ))}
                    </div>
                  </div>

                  {/* Lender Name */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', marginBottom: 4 }}>Lender Name</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {lead.lenderNames.map((name, idx) => (
                          <div key={idx} style={{ fontSize: 13, color: '#1e1b4b', fontWeight: 500 }}>{name}</div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(lead)}
                      style={{ background: '#ede9fe', color: '#6d28d9', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 24 }}>
          © 2023 Anchor Finance. All rights reserved. Data updated as of 2 hours ago.
        </div>

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="scf-modal-overlay" onClick={() => setSelectedLead(null)}>
            <div className="scf-modal-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
              <div className="scf-modal-header">
                <div>
                  <div className="scf-modal-title">{selectedLead.companyName}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>#{selectedLead.id}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: getStatusStyle(selectedLead.status).bg, color: getStatusStyle(selectedLead.status).color, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    {selectedLead.status}
                  </span>
                  <button className="scf-modal-close" onClick={() => setSelectedLead(null)}>×</button>
                </div>
              </div>
              <div className="scf-modal-body">
                <div className="scf-detail-section">
                  <div className="scf-detail-section-title">Lead Information</div>
                  <div className="scf-detail-grid">
                    <div className="scf-detail-item"><label>Lead ID</label><span>{selectedLead.id}</span></div>
                    <div className="scf-detail-item"><label>Lead Date</label><span>{selectedLead.leadDate}</span></div>
                    <div className="scf-detail-item"><label>Type of Lead</label><span>{selectedLead.typeOfLead}</span></div>
                    <div className="scf-detail-item"><label>Product</label><span>{selectedLead.product}</span></div>
                    <div className="scf-detail-item"><label>Ageing</label><span>{selectedLead.ageing} Day{selectedLead.ageing > 1 ? 's' : ''}</span></div>
                    <div className="scf-detail-item"><label>Status</label><span>{selectedLead.status}</span></div>
                  </div>
                </div>

                <div className="scf-detail-section">
                  <div className="scf-detail-section-title">Program Details</div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, border: '1px solid #e2e8f0' }}>
                    {selectedLead.programNames.map((name, idx) => (
                      <div key={idx} style={{ fontSize: 13, color: '#1e1b4b', fontWeight: 500, marginBottom: idx < selectedLead.programNames.length - 1 ? 6 : 0 }}>{name}</div>
                    ))}
                  </div>
                </div>

                <div className="scf-detail-section">
                  <div className="scf-detail-section-title">Lender Details</div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, border: '1px solid #e2e8f0' }}>
                    {selectedLead.lenderNames.map((name, idx) => (
                      <div key={idx} style={{ fontSize: 13, color: '#1e1b4b', fontWeight: 500, marginBottom: idx < selectedLead.lenderNames.length - 1 ? 6 : 0 }}>{name}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="scf-modal-footer">
                <button className="scf-btn scf-btn-secondary" onClick={() => setSelectedLead(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
