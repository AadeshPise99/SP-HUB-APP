import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Building2, FileText, Users, PlusCircle,
  LogOut, ChevronRight, Bell, Settings
} from 'lucide-react';

const MAKER_NAV = [
  { path: '/maker/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/maker/programs', icon: Building2, label: 'Active Programs' },
  { path: '/maker/invoices', icon: FileText, label: 'Invoice Management' },
];

const CHECKER_NAV = [
  { path: '/checker/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/checker/channel-partners', icon: Users, label: 'Channel Partners' },
  { path: '/checker/invoices', icon: FileText, label: 'Invoice Management' },
  { path: '/checker/raise-invoice', icon: PlusCircle, label: 'Raise Invoice' },
];

const CP_NAV = [
  { path: '/cp/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/cp/programs', icon: Building2, label: 'Active Programs' },
  { path: '/cp/invoices', icon: FileText, label: 'My Invoices' },
];

const PAGE_TITLES = {
  '/maker/dashboard': { title: 'Dashboard', sub: 'Overview of SCF activity' },
  '/maker/programs': { title: 'Active Programs', sub: 'Manage supply chain finance programs' },
  '/maker/invoices': { title: 'Invoice Management', sub: 'Review and approve invoices' },
  '/checker/dashboard': { title: 'Dashboard', sub: 'Overview of SCF activity' },
  '/checker/channel-partners': { title: 'Channel Partners', sub: 'Manage channel partner details' },
  '/checker/invoices': { title: 'Invoice Management', sub: 'View and manage invoices' },
  '/checker/raise-invoice': { title: 'Raise Invoice', sub: 'Submit a new invoice for approval' },
  '/cp/dashboard': { title: 'Dashboard', sub: 'Your financing overview' },
  '/cp/programs': { title: 'Active Programs', sub: 'Your financing programs' },
  '/cp/invoices': { title: 'My Invoices', sub: 'Track your invoice submissions' },
};

const ROLE_LABELS = {
  anchor_maker: 'Anchor Maker',
  anchor_checker: 'Anchor Checker',
  channel_partner: 'Channel Partner',
};

const ROLE_BADGE_CLASS = {
  anchor_maker: 'badge-approved',
  anchor_checker: 'badge-checker',
  channel_partner: 'badge-credit',
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = user?.role === 'anchor_maker' ? MAKER_NAV
    : user?.role === 'anchor_checker' ? CHECKER_NAV : CP_NAV;

  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'SCF Platform', sub: '' };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="scf-layout">
      {/* Sidebar */}
      <aside className="scf-sidebar" data-testid="sidebar">
        <div className="scf-sidebar-logo">
          <h1>AnchorPay</h1>
          <p>Supply Chain Finance</p>
        </div>

        <nav className="scf-sidebar-nav">
          <div className="scf-nav-section">Main Menu</div>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={({ isActive }) => `scf-nav-item${isActive ? ' active' : ''}`}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
          <div className="scf-nav-section" style={{ marginTop: 12 }}>Settings</div>
          <div className="scf-nav-item">
            <Settings size={16} />
            Preferences
          </div>
        </nav>

        <div className="scf-sidebar-footer">
          <div className="scf-user-info">
            <div className="scf-avatar">{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="scf-user-name">{user?.name}</div>
              <div className="scf-user-email">{user?.email}</div>
            </div>
            <button className="scf-logout-btn" onClick={handleLogout} data-testid="logout-btn" title="Logout">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="scf-content">
        {/* Header */}
        <header className="scf-header" data-testid="main-header">
          <div className="scf-header-left">
            <h2>{pageInfo.title}</h2>
            <p>{pageInfo.sub}</p>
          </div>
          <div className="scf-header-right">
            <span className={`scf-badge ${ROLE_BADGE_CLASS[user?.role]}`}>
              {ROLE_LABELS[user?.role]}
            </span>
            <div style={{ position: 'relative' }}>
              <Bell size={18} style={{ color: '#6b7280', cursor: 'pointer' }} />
              <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: '#7c3aed', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="scf-avatar" style={{ width: 30, height: 30, fontSize: 12 }}>{initials}</div>
              <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="scf-page">
          {children}
        </main>
      </div>
    </div>
  );
}
