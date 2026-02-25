import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, X, Building2, Filter, ArrowUpDown, RefreshCw, CheckCircle, Phone, Mail, Download } from 'lucide-react';

// Static Channel Partners Data with full details
const CHANNEL_PARTNERS_DATA = [
  {
    id: 1,
    partnerName: 'Jagdamba Motors - South',
    cpId: 'PSBCPL-DF-0163-0001',
    programId: 'PSBPGL-DF-0163',
    lender: 'SBI',
    lenderFull: 'STATE BANK OF INDIA',
    sanctionedLimit: 100000,
    pipelineLimit: 70000,
    available: 40000,
    utilized: 30000,
    expiryDate: '28-02-2031',
    status: 'Active',
    isNPA: false,
    gst: '27AABCU9603R1ZX',
    contact: '+91 98765 43210',
    email: 'south@jagdambamotors.com',
    address: '123, Industrial Area, Chennai, Tamil Nadu',
    roi: 21,
    pte_days: 45,
    // Basic Information
    anchorName: 'Tata motors',
    productCode: 'DF',
    programName: 'TATA MOTORS SBI2 DF',
    // Interest Parameters
    interestBorneBy: 'Dealer Bearing',
    interestPeriods: [{ fromPeriod: 1, toPeriod: 90, roi: 21, creditSpread: 10, businessSpread: 10, totalSpread: 20 }],
    // Limit Details
    sanctionDate: '04-02-2026',
    limitStatus: 'Approved',
    lmsReviewDate: '28-02-2026',
    lmsLimitExpiryDate: '28-02-2031',
    exitModeDate: 'null',
    closedDate: 'null',
    // Account Details
    lmsLoanAccountNo: '5324324234241',
    lenderLmsMappedAnchorAccount: '18628317369260812',
    lmsDynamicAccountRegEx: 'null',
    cpAccountName: 'JAGDAMBA MOTORS ENTERPRISE',
    cpAccountNo: '5004524234241',
    cpAccountBankName: 'HDFC BANK',
    cpAccountIfsc: 'HDFC0008341',
    // LMS Details
    gracePeriodConfig: 'Applicable',
    gracePeriodDays: 5,
    stopSupplyDaysConfig: 'Applicable',
    stopSupplyDays: 5,
    programFldgConfig: 'Applicable',
    programFldgPercent: 95,
    penalInterestRate: 3,
    programStatus: 'Active',
    lenderNpaStatus: 'No',
    lenderNpaDate: 'Null',
    lmsExitModeDate: 'Null',
    lmsClosedDate: 'Null',
    limitRemarks: 'Null',
    lmsBenchmarkCode: 'Base Rate',
    lmsSanctionDate: '12/02/2026',
    lmsLimitExpiryDate2: '12/02/2029',
    lmsProgramCode: 'PSBPGL-DF-0146',
    lmsMaturityDueHandling: 'No Effect',
    programDueDateCalc: 'Disbursement Date',
    invoiceAttachmentReq: 'Yes',
    eligibilityPercent: 100.0,
    marginPercent: 0.0,
    disbursementDate: 'Null',
    maxFinancingDays: 'Null',
    autoRequestFinance: 'Yes',
    autoApproveFinance: 'No Effect',
    minFinancingDays: 'Null',
  },
  {
    id: 2,
    partnerName: 'Jagdamba Motors - North',
    cpId: 'PSBCPL-DF-0164-0001',
    programId: 'PSBPGL-DF-0164',
    lender: 'CB',
    lenderFull: 'CENTRAL BANK OF INDIA',
    sanctionedLimit: 150000,
    pipelineLimit: 105000,
    available: 60000,
    utilized: 45000,
    expiryDate: '15-08-2030',
    status: 'Active',
    isNPA: false,
    gst: '07AABCU9603R1ZM',
    contact: '+91 98765 43211',
    email: 'north@jagdambamotors.com',
    address: '456, Industrial Area, Delhi',
    roi: 19,
    pte_days: 30,
    // Basic Information
    anchorName: 'Tata motors',
    productCode: 'DF',
    programName: 'TATA MOTORS CBI DF',
    // Interest Parameters
    interestBorneBy: 'Dealer Bearing',
    interestPeriods: [{ fromPeriod: 1, toPeriod: 60, roi: 19, creditSpread: 8, businessSpread: 8, totalSpread: 16 }],
    // Limit Details
    sanctionDate: '15-03-2026',
    limitStatus: 'Approved',
    lmsReviewDate: '15-03-2026',
    lmsLimitExpiryDate: '15-08-2030',
    exitModeDate: 'null',
    closedDate: 'null',
    // Account Details
    lmsLoanAccountNo: '6435435345352',
    lenderLmsMappedAnchorAccount: '28739428480371923',
    lmsDynamicAccountRegEx: 'null',
    cpAccountName: 'JAGDAMBA MOTORS NORTH',
    cpAccountNo: '6115635345352',
    cpAccountBankName: 'ICICI BANK',
    cpAccountIfsc: 'ICIC0009456',
    // LMS Details
    gracePeriodConfig: 'Applicable',
    gracePeriodDays: 3,
    stopSupplyDaysConfig: 'Applicable',
    stopSupplyDays: 3,
    programFldgConfig: 'Not Applicable',
    programFldgPercent: 0,
    penalInterestRate: 2,
    programStatus: 'Active',
    lenderNpaStatus: 'No',
    lenderNpaDate: 'Null',
    lmsExitModeDate: 'Null',
    lmsClosedDate: 'Null',
    limitRemarks: 'Null',
    lmsBenchmarkCode: 'Base Rate',
    lmsSanctionDate: '15/03/2026',
    lmsLimitExpiryDate2: '15/03/2029',
    lmsProgramCode: 'PSBPGL-DF-0147',
    lmsMaturityDueHandling: 'No Effect',
    programDueDateCalc: 'Disbursement Date',
    invoiceAttachmentReq: 'Yes',
    eligibilityPercent: 100.0,
    marginPercent: 0.0,
    disbursementDate: 'Null',
    maxFinancingDays: 'Null',
    autoRequestFinance: 'Yes',
    autoApproveFinance: 'No Effect',
    minFinancingDays: 'Null',
  },
  {
    id: 3,
    partnerName: 'Jagdamba Motors - West',
    cpId: 'PSBCPL-DF-0167-0001',
    programId: 'PSBPGL-DF-0167',
    lender: 'SBI',
    lenderFull: 'STATE BANK OF INDIA',
    sanctionedLimit: 120000,
    pipelineLimit: 85000,
    available: 50000,
    utilized: 35000,
    expiryDate: '31-12-2031',
    status: 'Inactive',
    isNPA: false,
    gst: '24AABCU9603R1ZN',
    contact: '+91 98765 43212',
    email: 'west@jagdambamotors.com',
    address: '789, Industrial Area, Mumbai, Maharashtra',
    roi: 22,
    pte_days: 60,
    // Basic Information
    anchorName: 'Tata motors',
    productCode: 'DF',
    programName: 'TATA MOTORS SBI3 DF',
    // Interest Parameters
    interestBorneBy: 'Dealer Bearing',
    interestPeriods: [{ fromPeriod: 1, toPeriod: 120, roi: 22, creditSpread: 11, businessSpread: 11, totalSpread: 22 }],
    // Limit Details
    sanctionDate: '01-06-2026',
    limitStatus: 'Approved',
    lmsReviewDate: '01-06-2026',
    lmsLimitExpiryDate: '31-12-2031',
    exitModeDate: 'null',
    closedDate: 'null',
    // Account Details
    lmsLoanAccountNo: '7546546456463',
    lenderLmsMappedAnchorAccount: '39850539591483034',
    lmsDynamicAccountRegEx: 'null',
    cpAccountName: 'JAGDAMBA MOTORS WEST',
    cpAccountNo: '7226746456463',
    cpAccountBankName: 'AXIS BANK',
    cpAccountIfsc: 'UTIB0010567',
    // LMS Details
    gracePeriodConfig: 'Not Applicable',
    gracePeriodDays: 0,
    stopSupplyDaysConfig: 'Not Applicable',
    stopSupplyDays: 0,
    programFldgConfig: 'Applicable',
    programFldgPercent: 90,
    penalInterestRate: 4,
    programStatus: 'Inactive',
    lenderNpaStatus: 'No',
    lenderNpaDate: 'Null',
    lmsExitModeDate: 'Null',
    lmsClosedDate: 'Null',
    limitRemarks: 'Under Review',
    lmsBenchmarkCode: 'MCLR',
    lmsSanctionDate: '01/06/2026',
    lmsLimitExpiryDate2: '01/06/2029',
    lmsProgramCode: 'PSBPGL-DF-0148',
    lmsMaturityDueHandling: 'No Effect',
    programDueDateCalc: 'Invoice Date',
    invoiceAttachmentReq: 'No',
    eligibilityPercent: 95.0,
    marginPercent: 5.0,
    disbursementDate: 'Null',
    maxFinancingDays: 'Null',
    autoRequestFinance: 'No',
    autoApproveFinance: 'No Effect',
    minFinancingDays: 'Null',
  },
  {
    id: 4,
    partnerName: 'Jagdamba Motors - East',
    cpId: 'PSBCPL-VF-0126-0001',
    programId: 'PSBPGL-VF-0126',
    lender: 'CB',
    lenderFull: 'CENTRAL BANK OF INDIA',
    sanctionedLimit: 180000,
    pipelineLimit: 125000,
    available: 80000,
    utilized: 55000,
    expiryDate: '30-09-2030',
    status: 'Active',
    isNPA: false,
    gst: '19AABCU9603R1ZP',
    contact: '+91 98765 43213',
    email: 'east@jagdambamotors.com',
    address: '321, Industrial Area, Kolkata, West Bengal',
    roi: 18,
    pte_days: 45,
    // Basic Information
    anchorName: 'Tata motors',
    productCode: 'VF',
    programName: 'TATA MOTORS CBI VF',
    // Interest Parameters
    interestBorneBy: 'Dealer Bearing',
    interestPeriods: [{ fromPeriod: 1, toPeriod: 75, roi: 18, creditSpread: 7, businessSpread: 7, totalSpread: 14 }],
    // Limit Details
    sanctionDate: '20-04-2026',
    limitStatus: 'Approved',
    lmsReviewDate: '20-04-2026',
    lmsLimitExpiryDate: '30-09-2030',
    exitModeDate: 'null',
    closedDate: 'null',
    // Account Details
    lmsLoanAccountNo: '8657657567574',
    lenderLmsMappedAnchorAccount: '40961640702594145',
    lmsDynamicAccountRegEx: 'null',
    cpAccountName: 'JAGDAMBA MOTORS EAST',
    cpAccountNo: '8337857567574',
    cpAccountBankName: 'KOTAK BANK',
    cpAccountIfsc: 'KKBK0011678',
    // LMS Details
    gracePeriodConfig: 'Applicable',
    gracePeriodDays: 7,
    stopSupplyDaysConfig: 'Applicable',
    stopSupplyDays: 7,
    programFldgConfig: 'Not Applicable',
    programFldgPercent: 0,
    penalInterestRate: 2.5,
    programStatus: 'Active',
    lenderNpaStatus: 'No',
    lenderNpaDate: 'Null',
    lmsExitModeDate: 'Null',
    lmsClosedDate: 'Null',
    limitRemarks: 'Null',
    lmsBenchmarkCode: 'Repo Rate',
    lmsSanctionDate: '20/04/2026',
    lmsLimitExpiryDate2: '20/04/2029',
    lmsProgramCode: 'PSBPGL-VF-0149',
    lmsMaturityDueHandling: 'No Effect',
    programDueDateCalc: 'Disbursement Date',
    invoiceAttachmentReq: 'Yes',
    eligibilityPercent: 100.0,
    marginPercent: 0.0,
    disbursementDate: 'Null',
    maxFinancingDays: 'Null',
    autoRequestFinance: 'Yes',
    autoApproveFinance: 'No Effect',
    minFinancingDays: 'Null',
  },
];

const formatINR = (val) => `${val.toLocaleString('en-IN')} INR`;

export default function CPChannelPartners() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = CHANNEL_PARTNERS_DATA.filter(p =>
    p.partnerName.toLowerCase().includes(search.toLowerCase()) ||
    p.cpId.toLowerCase().includes(search.toLowerCase()) ||
    p.programId.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = CHANNEL_PARTNERS_DATA.filter(p => p.status === 'Active').length;
  const lenders = [...new Set(CHANNEL_PARTNERS_DATA.map(p => p.lender))];

  return (
    <Layout>
      <div data-testid="cp-channel-partners">
        {/* Header with Refresh Limits */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e1b4b', margin: 0 }}>Active Channel Partners</h1>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Manage your channel partners and their financing limits.</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#6d28d9', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <RefreshCw size={14} />
            Refresh Limits
          </button>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {/* Entity Name Card */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>Entity Name</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1e1b4b' }}>Jagdamba Motors</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    <CheckCircle size={12} />
                    KYC Verified
                  </span>
                </div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={22} color="#7c3aed" />
              </div>
            </div>
          </div>

          {/* Total Active Channel Partners Card */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>Total Active Channel Partners</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#1e1b4b' }}>{activeCount}</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${(activeCount / CHANNEL_PARTNERS_DATA.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', borderRadius: 3 }}></div>
              </div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>{activeCount} of {CHANNEL_PARTNERS_DATA.length} partners active</div>
            </div>
          </div>

          {/* Active Lenders Card */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>Active Lenders</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1e1b4b' }}>{lenders.length} Banks Onboarded</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {lenders.includes('SBI') && (
                <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>SBI</span>
              )}
              {lenders.includes('CB') && (
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>CB</span>
              )}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="scf-table-card">
          <div className="scf-table-header" style={{ flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className="scf-search-wrap" style={{ flex: 1, maxWidth: 320 }}>
                <Search size={16} />
                <input className="scf-search-input" placeholder="Search partners..." value={search} onChange={e => setSearch(e.target.value)} data-testid="cp-partner-search" />
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                <Filter size={14} />
                Filter
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                <ArrowUpDown size={14} />
                Sort
              </button>
            </div>
          </div>
          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Channel Partner ID / Lender</th>
                  <th>Program ID</th>
                  <th>Lender</th>
                  <th>Sanctioned Limit</th>
                  <th>Pipeline Limit</th>
                  <th>Available</th>
                  <th>Utilized</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Is NPA?</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} data-testid={`cp-row-${p.id}`}>
                    <td style={{ fontWeight: 600, color: '#1e1b4b' }}>{p.partnerName}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7280' }}>{p.cpId}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7280' }}>{p.programId}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.lender === 'SBI' ? '#dbeafe' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: p.lender === 'SBI' ? '#1d4ed8' : '#b45309' }}>
                          {p.lender}
                        </div>
                      </div>
                    </td>
                    <td className="scf-amount">{formatINR(p.sanctionedLimit)}</td>
                    <td className="scf-amount">{formatINR(p.pipelineLimit)}</td>
                    <td style={{ color: '#dc2626', fontWeight: 600 }}>{formatINR(p.available)}</td>
                    <td>{formatINR(p.utilized)}</td>
                    <td style={{ fontSize: 12, color: '#6b7280' }}>{p.expiryDate}</td>
                    <td>
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: p.status === 'Active' ? '#dcfce7' : '#fee2e2', color: p.status === 'Active' ? '#15803d' : '#dc2626' }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontSize: 16, color: '#9ca3af' }}>⊘</td>
                    <td>
                      <button onClick={() => setSelected(p)} style={{ background: '#ede9fe', color: '#6d28d9', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="scf-pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Showing 1 to {filtered.length} of {CHANNEL_PARTNERS_DATA.length} results</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', color: '#6b7280' }}>Previous</button>
              <button style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', color: '#6b7280' }}>Next</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 20 }}>
          © 2023 Anchor Finance. All rights reserved. Data updated as of 2 hours ago.
        </div>

        {/* Detail Modal */}
        {selected && (
          <div className="scf-modal-overlay" onClick={() => setSelected(null)}>
            <div className="scf-modal-panel" onClick={e => e.stopPropagation()} data-testid="cp-partner-detail" style={{ width: 700, maxWidth: '95vw' }}>
              <div className="scf-modal-header">
                <div>
                  <div className="scf-modal-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    Channel Partner Details: Jagdamba Motors
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: selected.status === 'Active' ? '#22c55e' : '#ef4444', color: '#fff' }}>
                      {selected.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Read-only view of program configuration parameters.</div>
                </div>
                <button className="scf-modal-close" onClick={() => setSelected(null)} data-testid="close-cp-detail"><X size={14} /></button>
              </div>
              <div className="scf-modal-body" style={{ padding: 20, maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>

                {/* BASIC INFORMATION */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 12, borderBottom: '2px solid #e5e7eb', paddingBottom: 6 }}>BASIC INFORMATION</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>PSB Program Lender Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lenderFull}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>PSB Identifier for Active Program</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.programId}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Anchor Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.anchorName}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Product Code (of the Program)</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.productCode}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Program Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.programName}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.partnerName.replace('Jagdamba Motors - ', 'Jagdamba Motors ')}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner ID</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.cpId}</div></div>
                  </div>
                </div>

                {/* INTEREST PARAMETERS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 12, borderBottom: '2px solid #e5e7eb', paddingBottom: 6 }}>INTEREST PARAMETERS</div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Interest Rate - Interest borne by ?</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.interestBorneBy}</div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: '#f3f4f6' }}>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>From Period</th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>To Period</th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>ROI (%)</th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Credit Spread (%)</th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Business Spread (%)</th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Total Spread (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.interestPeriods.map((p, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.fromPeriod}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.toPeriod}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.roi}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.creditSpread}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.businessSpread}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>{p.totalSpread}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* LIMIT DETAILS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 12, borderBottom: '2px solid #e5e7eb', paddingBottom: 6 }}>LIMIT DETAILS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Sanctioned Limit</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.sanctionedLimit.toLocaleString('en-IN')} INR</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Utilized Limit</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.utilized.toLocaleString('en-IN')} INR</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Available Limit</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.available.toLocaleString('en-IN')} INR</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Sanction Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.sanctionDate}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Limit Status</div><div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e' }}>{selected.limitStatus}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Review Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsReviewDate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Limit Expiry Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsLimitExpiryDate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Date when Limit is marked to be in Exit mode</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.exitModeDate}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Date when Limit is marked as Closed</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.closedDate}</div></div>
                  </div>
                </div>

                {/* ACCOUNT DETAILS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 12, borderBottom: '2px solid #e5e7eb', paddingBottom: 6 }}>ACCOUNT DETAILS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Loan Account No.</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsLoanAccountNo}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Lender LMS Mapped Anchor Account Details</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lenderLmsMappedAnchorAccount}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Dynamic Account Regular Expression</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.lmsDynamicAccountRegEx}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner Account No.</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.cpAccountNo}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner Account Bank Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.cpAccountBankName}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner Account IFSC Code</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.cpAccountIfsc}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Channel Partner Account Name</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.cpAccountName}</div></div>
                  </div>
                </div>

                {/* LMS DETAILS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 12, borderBottom: '2px solid #e5e7eb', paddingBottom: 6 }}>LMS DETAILS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Grace Period Configuration</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.gracePeriodConfig}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Grace Period Days</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.gracePeriodDays}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Stop Supply Days Configuration</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.stopSupplyDaysConfig}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Stop Supply Days</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.stopSupplyDays}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Program FLDG Configuration</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.programFldgConfig}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Program FLDG %</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.programFldgPercent}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Penal Interest Rate (%)</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.penalInterestRate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Program Status</div><div style={{ fontSize: 12, fontWeight: 600, color: selected.programStatus === 'Active' ? '#22c55e' : '#ef4444' }}>{selected.programStatus}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Lender LMS Program NPA Status</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lenderNpaStatus}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Lender LMS Program NPA Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.lenderNpaDate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Exit Mode Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.lmsExitModeDate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Closed Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.lmsClosedDate}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Limit Remarks</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.limitRemarks}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Benchmark Code</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsBenchmarkCode}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Sanction Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsSanctionDate}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Limit Expiry Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsLimitExpiryDate2}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Code</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsProgramCode}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Level Maturity Due Date Handling</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.lmsMaturityDueHandling}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Program Due Date Calculation Mechanism</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.programDueDateCalc}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Invoice Attachment Required</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.invoiceAttachmentReq}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Eligibility Percentage</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.eligibilityPercent} %</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Margin Percentage</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.marginPercent} %</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Disbursement Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.disbursementDate}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Max. Financing Days</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.maxFinancingDays}</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Auto Request Finance Configuration</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.autoRequestFinance}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Auto Approve Finance by Bank Configuration</div><div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{selected.autoApproveFinance}</div></div>
                    <div><div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>LMS Program Min. Financing Days</div><div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{selected.minFinancingDays}</div></div>
                  </div>
                </div>

              </div>
              <div className="scf-modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 20px', borderTop: '1px solid #e5e7eb' }}>
                <button className="scf-btn scf-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Download size={14} /> Download Terms</button>
                <button className="scf-btn scf-btn-primary">Refresh Details</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
