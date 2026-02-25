import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, ArrowUpDown, Building2, CheckCircle2, Landmark, X, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Static program data matching the design
const PROGRAMS_DATA = [
  {
    id: 'PSBPGL-VF-0108',
    name: 'Tata-SBI Vendor Finance',
    lender: { name: 'SBI', color: '#16a34a' },
    programLimit: '₹500 Cr',
    pipelineLimit: '₹450 Cr',
    available: '₹120 Cr',
    availableColor: '#dc2626',
    utilized: '₹330 Cr',
    expiryDate: '31 Mar 2025',
    status: 'Active',
    isNPA: false,
  },
  {
    id: 'PSBPGL-DF-0165',
    name: 'Tata-CBI Dealer Finance',
    lender: { name: 'Central Bank', color: '#dc2626' },
    programLimit: '₹200 Cr',
    pipelineLimit: '₹200 Cr',
    available: '₹50 Cr',
    availableColor: '#dc2626',
    utilized: '₹150 Cr',
    expiryDate: '15 Aug 2024',
    status: 'Active',
    isNPA: false,
  },
  {
    id: 'PSBPGL-DF-0123',
    name: 'TATA - DF - SBI PROGRAM 2',
    lender: { name: 'SBI', color: '#16a34a' },
    programLimit: '₹150 Cr',
    pipelineLimit: '₹100 Cr',
    available: '₹100 Cr',
    availableColor: '#dc2626',
    utilized: '₹0 Cr',
    expiryDate: '31 Dec 2025',
    status: 'Inactive',
    isNPA: false,
  },
  {
    id: 'PSBPGL-DF-0156',
    name: 'TATA - DF - SBI PROGRAM 3',
    lender: { name: 'Central Bank', color: '#dc2626' },
    programLimit: '₹300 Cr',
    pipelineLimit: '₹280 Cr',
    available: '₹80 Cr',
    availableColor: '#dc2626',
    utilized: '₹200 Cr',
    expiryDate: '30 Sep 2024',
    status: 'Active',
    isNPA: false,
  },
];

// Static program detail data for modal
const PROGRAM_DETAIL = {
  name: 'TATA MOTORS SBI2 DF',
  status: 'Active',
  basicInfo: {
    programCode: 'PSBPGL-DF-0171',
    lender: 'STATE BANK OF INDIA',
    activationDate: '13-11-2025',
    sanctionDate: '13-11-2025',
    expiryDate: '27-12-2028',
  },
  interestParams: {
    interestBearingType: 'Dealer Bearing',
    interestType: 'Monthly Compounding',
    tenureDays: '1 - 90 Days',
    baseInterest: '20.0%',
    roiAnnualized: '21.0%',
    creditSpread: '10.0%',
    businessSpread: '10.0%',
  },
  limitDetails: {
    totalProgramLimit: '100,000,000 INR',
    outstandingLimit: '199,942.47 INR',
    availableLimit: '99,800,057.53 INR',
  },
  accountDetails: {
    accountHolder: 'Rachit',
    bankName: 'HDFC Bank',
    branch: 'Mumbai',
    accountType: 'Saving',
    accountNumber: '18629317369269832',
  },
  lmsDetails: {
    gracePeriodConfig: 'Applicable',
    gracePeriodDays: '5',
    stopSupplyDaysConfig: 'Applicable',
    stopSupplyDays: '5',
    programFLDGConfig: 'Applicable',
    programFLDGPercent: '95',
    penalInterestRate: '3',
    lmsProgramStatus: 'Active',
    lenderLMSProgramNPAStatus: 'No',
    lenderLMSProgramNPADate: 'Null',
    lmsProgramExitModeDate: 'Null',
    lmsProgramClosedDate: '',
    limitRemarks: 'Null',
    lmsBenchmarkCode: 'Base Rate',
    lmsSanctionDate: '12/02/2026',
    lmsLimitExpiryDate: '12/02/2029',
    lmsProgramCode: 'PSBPOL-DF-0146',
    lmsProgramLevelMaturityDueDateHandling: 'No Effect',
    lmsProgramDueDateCalcMechanism: 'Disbursement Date',
    lmsProgramInvoiceAttachmentRequired: 'Yes',
    lmsProgramEligibilityPercentage: '100.0 %',
    lmsProgramMarginPercentage: '0.0 %',
    lmsProgramMinFinancingDays: 'Null',
    lmsProgramMaxFinancingDays: 'Null',
    lmsAutoRequestFinanceConfig: 'Yes',
    lmsAutoApproveFinanceByBankConfig: 'No Effect',
  },
};

// Program Details Modal Component
function ProgramDetailsModal({ program, onClose }) {
  return (
    <div className="scf-modal-overlay" onClick={onClose}>
      <div
        className="scf-modal-panel"
        style={{ width: 580, maxHeight: '100vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e1b4b' }}>Program Details: {PROGRAM_DETAIL.name}</h2>
              <span style={{ background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>{PROGRAM_DETAIL.status}</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7280' }}>Read-only view of program configuration parameters.</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Basic Information */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <DetailItem label="Program Code" value={PROGRAM_DETAIL.basicInfo.programCode} />
              <DetailItem label="Lender" value={PROGRAM_DETAIL.basicInfo.lender} />
              <DetailItem label="Activation Date" value={PROGRAM_DETAIL.basicInfo.activationDate} />
              <DetailItem label="Sanction Date" value={PROGRAM_DETAIL.basicInfo.sanctionDate} />
            </div>
            <div style={{ marginTop: 12 }}>
              <DetailItem label="Expiry Date" value={PROGRAM_DETAIL.basicInfo.expiryDate} />
            </div>
          </div>

          {/* Interest Parameters */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Interest Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <DetailItem label="Interest Bearing Type" value={PROGRAM_DETAIL.interestParams.interestBearingType} />
              <DetailItem label="Interest Type" value={PROGRAM_DETAIL.interestParams.interestType} />
            </div>
            {/* Interest Parameters Table */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Tenure (Days)</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Base Interest</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>ROI (Annualized)</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Credit Spread</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Business Spread</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{PROGRAM_DETAIL.interestParams.tenureDays}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{PROGRAM_DETAIL.interestParams.baseInterest}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{PROGRAM_DETAIL.interestParams.roiAnnualized}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{PROGRAM_DETAIL.interestParams.creditSpread}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{PROGRAM_DETAIL.interestParams.businessSpread}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Limit Details */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Limit Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <DetailItem label="Total Program Limit" value={PROGRAM_DETAIL.limitDetails.totalProgramLimit} />
              <DetailItem label="Outstanding Limit" value={PROGRAM_DETAIL.limitDetails.outstandingLimit} />
              <DetailItem label="Available Limit" value={PROGRAM_DETAIL.limitDetails.availableLimit} />
            </div>
          </div>

          {/* Account Details */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Account Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <DetailItem label="Account Holder" value={PROGRAM_DETAIL.accountDetails.accountHolder} />
              <DetailItem label="Bank Name" value={PROGRAM_DETAIL.accountDetails.bankName} />
              <DetailItem label="Branch" value={PROGRAM_DETAIL.accountDetails.branch} />
              <DetailItem label="Account Type" value={PROGRAM_DETAIL.accountDetails.accountType} />
            </div>
            <div style={{ marginTop: 12 }}>
              <DetailItem label="Account Number" value={PROGRAM_DETAIL.accountDetails.accountNumber} />
            </div>
          </div>

          {/* LMS Details */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>LMS Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <DetailItem label="Grace Period Configuration" value={PROGRAM_DETAIL.lmsDetails.gracePeriodConfig} />
              <DetailItem label="Grace Period Days" value={PROGRAM_DETAIL.lmsDetails.gracePeriodDays} />
              <DetailItem label="Stop Supply Days Configuration" value={PROGRAM_DETAIL.lmsDetails.stopSupplyDaysConfig} />
              <DetailItem label="Stop Supply Days" value={PROGRAM_DETAIL.lmsDetails.stopSupplyDays} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="Program FLDG Configuration" value={PROGRAM_DETAIL.lmsDetails.programFLDGConfig} />
              <DetailItem label="Program FLDG %" value={PROGRAM_DETAIL.lmsDetails.programFLDGPercent} />
              <DetailItem label="Penal Interest Rate (%)" value={PROGRAM_DETAIL.lmsDetails.penalInterestRate} />
              <DetailItem label="LMS Program Status" value={PROGRAM_DETAIL.lmsDetails.lmsProgramStatus} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="Lender LMS Program NPA Status" value={PROGRAM_DETAIL.lmsDetails.lenderLMSProgramNPAStatus} />
              <DetailItem label="Lender LMS Program NPA Date" value={PROGRAM_DETAIL.lmsDetails.lenderLMSProgramNPADate} />
              <DetailItem label="LMS Program Exit Mode Date" value={PROGRAM_DETAIL.lmsDetails.lmsProgramExitModeDate} />
              <DetailItem label="LMS Program Closed Date" value={PROGRAM_DETAIL.lmsDetails.lmsProgramClosedDate || '-'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="Limit Remarks" value={PROGRAM_DETAIL.lmsDetails.limitRemarks} />
              <DetailItem label="LMS Benchmark Code" value={PROGRAM_DETAIL.lmsDetails.lmsBenchmarkCode} />
              <DetailItem label="LMS Sanction Date" value={PROGRAM_DETAIL.lmsDetails.lmsSanctionDate} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="LMS Limit Expiry Date" value={PROGRAM_DETAIL.lmsDetails.lmsLimitExpiryDate} />
              <DetailItem label="LMS Program Code" value={PROGRAM_DETAIL.lmsDetails.lmsProgramCode} />
              <DetailItem label="LMS Program Level Maturity Due Date Handling" value={PROGRAM_DETAIL.lmsDetails.lmsProgramLevelMaturityDueDateHandling} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="LMS Program Due Date Calculation Mechanism" value={PROGRAM_DETAIL.lmsDetails.lmsProgramDueDateCalcMechanism} />
              <DetailItem label="LMS Program Invoice Attachment Required" value={PROGRAM_DETAIL.lmsDetails.lmsProgramInvoiceAttachmentRequired} />
              <DetailItem label="LMS Program Eligibility Percentage" value={PROGRAM_DETAIL.lmsDetails.lmsProgramEligibilityPercentage} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="LMS Program Margin Percentage" value={PROGRAM_DETAIL.lmsDetails.lmsProgramMarginPercentage} />
              <DetailItem label="LMS Program Min. Financing Days" value={PROGRAM_DETAIL.lmsDetails.lmsProgramMinFinancingDays} />
              <DetailItem label="LMS Program Max. Financing Days" value={PROGRAM_DETAIL.lmsDetails.lmsProgramMaxFinancingDays} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 12 }}>
              <DetailItem label="LMS Auto Request Finance Configuration" value={PROGRAM_DETAIL.lmsDetails.lmsAutoRequestFinanceConfig} />
              <DetailItem label="LMS Auto Approve Finance by Bank Configuration" value={PROGRAM_DETAIL.lmsDetails.lmsAutoApproveFinanceByBankConfig} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#fff', position: 'sticky', bottom: 0 }}>
          <button className="scf-btn scf-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={14} /> Download Terms
          </button>
          <button className="scf-btn scf-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} /> Refresh Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Detail item component
function DetailItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#1f2937', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

export default function MakerPrograms() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const filtered = PROGRAMS_DATA.filter(p => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.lender.name.toLowerCase().includes(q);
  });

  const activeLenders = [...new Set(PROGRAMS_DATA.map(p => p.lender.name))];

  return (
    <Layout
      headerActions={
        <button className="scf-btn scf-btn-primary" data-testid="refresh-limits-btn">
          Refresh Limits
        </button>
      }
    >
      <div data-testid="maker-programs">
        {/* Page Title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1e1b4b', margin: 0 }}>Active Programs</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Manage your credit programs and sanctioned limits.</p>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {/* Entity Name Card */}
          <div className="scf-stat-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} color="#6d28d9" />
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Entity Name</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>Tata Motors Limited</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle2 size={14} color="#16a34a" />
              <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>KYC Verified</span>
            </div>
          </div>

          {/* Total Active Programs Card */}
          <div className="scf-stat-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Total Active Programs</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{PROGRAMS_DATA.filter(p => p.status === 'Active').length}</div>
            <div style={{ height: 4, background: '#e5e7eb', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '75%', background: '#6d28d9', borderRadius: 2 }}></div>
            </div>
          </div>

          {/* Active Lenders Card */}
          <div className="scf-stat-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Landmark size={18} color="#6d28d9" />
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Active Lenders</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#1e1b4b' }}>{activeLenders.length}</span>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Banks Onboarded</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              {activeLenders.map((lender, idx) => (
                <span key={lender} style={{
                  background: idx === 0 ? '#16a34a' : '#dc2626',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 4
                }}>
                  {lender === 'SBI' ? 'SBI' : 'CB'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Programs Table Card */}
        <div className="scf-table-card">
          {/* Search & Filter Bar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="scf-search-wrap">
              <Search />
              <input
                className="scf-search-input"
                placeholder="Search by Program Name, ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                data-testid="programs-search"
                style={{ width: 280 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="scf-btn scf-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Filter size={14} /> Filter
              </button>
              <button className="scf-btn scf-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowUpDown size={14} /> Sort
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="scf-table-wrap">
            <table className="scf-table">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Identifier</th>
                  <th>Lender</th>
                  <th>Program Limit</th>
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
                {filtered.map(program => (
                  <tr key={program.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{program.name}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: 11, color: '#6b7280' }}>{program.id}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: program.lender.color,
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {program.lender.name.charAt(0)}
                        </span>
                        <span style={{ fontSize: 13 }}>{program.lender.name}</span>
                      </div>
                    </td>
                    <td><span style={{ fontWeight: 500 }}>{program.programLimit}</span></td>
                    <td><span style={{ fontWeight: 500 }}>{program.pipelineLimit}</span></td>
                    <td><span style={{ fontWeight: 600, color: program.availableColor }}>{program.available}</span></td>
                    <td><span style={{ fontWeight: 500 }}>{program.utilized}</span></td>
                    <td><span style={{ fontSize: 12, color: '#6b7280' }}>{program.expiryDate}</span></td>
                    <td>
                      <span className={`scf-badge ${program.status === 'Active' ? 'badge-active' : 'badge-inactive'}`} style={program.status === 'Inactive' ? { background: '#fef3c7', color: '#92400e' } : {}}>
                        {program.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#6b7280' }}>⊝</span>
                    </td>
                    <td>
                      <button
                        className="scf-btn scf-btn-outline-purple scf-btn-sm"
                        onClick={() => setSelectedProgram(program)}
                        data-testid={`view-details-${program.id}`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>© 2023 Anchor Finance. All rights reserved. Data updated as of 2 hours ago.</span>
          </div>
        </div>

        {/* Program Details Modal */}
        {selectedProgram && (
          <ProgramDetailsModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
        )}
      </div>
    </Layout>
  );
}
