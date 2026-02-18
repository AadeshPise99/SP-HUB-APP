import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import OTPPage from '@/pages/OTPPage';
import MakerDashboard from '@/pages/maker/Dashboard';
import MakerPrograms from '@/pages/maker/Programs';
import MakerInvoices from '@/pages/maker/Invoices';
import MakerLenders from '@/pages/maker/Lenders';
import CheckerDashboard from '@/pages/checker/Dashboard';
import CheckerChannelPartners from '@/pages/checker/ChannelPartners';
import CheckerInvoices from '@/pages/checker/Invoices';
import CheckerRaiseInvoice from '@/pages/checker/RaiseInvoice';
import CPDashboard from '@/pages/channelPartner/Dashboard';
import CPPrograms from '@/pages/channelPartner/Programs';
import CPInvoices from '@/pages/channelPartner/Invoices';
import '@/App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="scf-spinner"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'anchor_maker') return <Navigate to="/maker/dashboard" replace />;
    if (user.role === 'anchor_checker') return <Navigate to="/checker/dashboard" replace />;
    if (user.role === 'channel_partner') return <Navigate to="/cp/dashboard" replace />;
  }
  return children;
};

const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'anchor_maker') return <Navigate to="/maker/dashboard" replace />;
  if (user.role === 'anchor_checker') return <Navigate to="/checker/dashboard" replace />;
  if (user.role === 'channel_partner') return <Navigate to="/cp/dashboard" replace />;
  return <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />

      {/* Anchor Maker Routes */}
      <Route path="/maker/dashboard" element={<ProtectedRoute allowedRoles={['anchor_maker']}><MakerDashboard /></ProtectedRoute>} />
      <Route path="/maker/programs" element={<ProtectedRoute allowedRoles={['anchor_maker']}><MakerPrograms /></ProtectedRoute>} />
      <Route path="/maker/invoices" element={<ProtectedRoute allowedRoles={['anchor_maker']}><MakerInvoices /></ProtectedRoute>} />

      {/* Anchor Checker Routes */}
      <Route path="/checker/dashboard" element={<ProtectedRoute allowedRoles={['anchor_checker']}><CheckerDashboard /></ProtectedRoute>} />
      <Route path="/checker/channel-partners" element={<ProtectedRoute allowedRoles={['anchor_checker']}><CheckerChannelPartners /></ProtectedRoute>} />
      <Route path="/checker/invoices" element={<ProtectedRoute allowedRoles={['anchor_checker']}><CheckerInvoices /></ProtectedRoute>} />
      <Route path="/checker/raise-invoice" element={<ProtectedRoute allowedRoles={['anchor_checker']}><CheckerRaiseInvoice /></ProtectedRoute>} />

      {/* Channel Partner Routes */}
      <Route path="/cp/dashboard" element={<ProtectedRoute allowedRoles={['channel_partner']}><CPDashboard /></ProtectedRoute>} />
      <Route path="/cp/programs" element={<ProtectedRoute allowedRoles={['channel_partner']}><CPPrograms /></ProtectedRoute>} />
      <Route path="/cp/invoices" element={<ProtectedRoute allowedRoles={['channel_partner']}><CPInvoices /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
