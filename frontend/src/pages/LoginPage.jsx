import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL + '/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      sessionStorage.setItem('scf_session_id', res.data.session_id);
      sessionStorage.setItem('scf_login_email', email);
      navigate('/otp');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Supply Chain Illustration SVG Component
  const SupplyChainIllustration = () => (
    <svg viewBox="0 0 500 350" style={{ width: '100%', maxWidth: 480, height: 'auto' }}>
      {/* Globe */}
      <circle cx="250" cy="140" r="70" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.6"/>
      <ellipse cx="250" cy="140" rx="70" ry="25" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.4"/>
      <ellipse cx="250" cy="140" rx="25" ry="70" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="250" cy="140" r="65" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4"/>

      {/* Dotted trade routes */}
      <path d="M120 180 Q 180 120 250 140 Q 320 160 380 130" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 4"/>
      <path d="M100 220 Q 200 180 300 200 Q 380 220 420 180" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 4"/>

      {/* Shipping Container - Left */}
      <rect x="60" y="200" width="60" height="35" rx="3" fill="#6d28d9"/>
      <rect x="65" y="205" width="12" height="25" rx="1" fill="#8b5cf6"/>
      <rect x="80" y="205" width="12" height="25" rx="1" fill="#8b5cf6"/>
      <rect x="95" y="205" width="12" height="25" rx="1" fill="#8b5cf6"/>
      <rect x="110" y="205" width="6" height="25" rx="1" fill="#8b5cf6"/>

      {/* Truck */}
      <rect x="140" y="250" width="55" height="30" rx="3" fill="#7c3aed"/>
      <rect x="195" y="260" width="25" height="20" rx="2" fill="#5b21b6"/>
      <circle cx="155" cy="285" r="8" fill="#1e1b4b"/>
      <circle cx="185" cy="285" r="8" fill="#1e1b4b"/>
      <circle cx="210" cy="285" r="8" fill="#1e1b4b"/>
      <circle cx="155" cy="285" r="4" fill="#374151"/>
      <circle cx="185" cy="285" r="4" fill="#374151"/>
      <circle cx="210" cy="285" r="4" fill="#374151"/>

      {/* Warehouse/Factory */}
      <rect x="340" y="220" width="80" height="60" rx="3" fill="#6d28d9"/>
      <rect x="350" y="240" width="20" height="40" rx="2" fill="#1e1b4b"/>
      <rect x="380" y="250" width="15" height="15" rx="1" fill="#a78bfa"/>
      <rect x="400" y="250" width="15" height="15" rx="1" fill="#a78bfa"/>
      <polygon points="340,220 380,190 420,220" fill="#5b21b6"/>

      {/* Airplane */}
      <g transform="translate(350, 80) rotate(-15)">
        <ellipse cx="0" cy="0" rx="35" ry="8" fill="#8b5cf6"/>
        <polygon points="-15,-8 -15,-25 5,-8" fill="#a78bfa"/>
        <polygon points="20,-5 35,-15 35,5 20,5" fill="#a78bfa"/>
        <circle cx="-25" cy="0" r="5" fill="#6d28d9"/>
      </g>

      {/* Packages/Boxes */}
      <rect x="260" y="260" width="25" height="25" rx="2" fill="#7c3aed"/>
      <rect x="270" y="250" width="20" height="20" rx="2" fill="#8b5cf6"/>
      <rect x="295" y="265" width="20" height="20" rx="2" fill="#6d28d9"/>

      {/* Worker Figure */}
      <circle cx="80" cy="270" r="10" fill="#c4b5fd"/>
      <rect x="73" y="282" width="14" height="25" rx="3" fill="#8b5cf6"/>
      <rect x="68" y="285" width="8" height="15" rx="2" fill="#7c3aed"/>
      <rect x="84" y="285" width="8" height="15" rx="2" fill="#7c3aed"/>

      {/* Dollar Signs */}
      <g fill="#c4b5fd" fontSize="16" fontWeight="bold">
        <text x="160" y="120">$</text>
        <text x="320" y="100">$</text>
        <text x="400" y="160">$</text>
        <text x="100" y="160">$</text>
        <text x="450" y="240">$</text>
      </g>

      {/* Small circles (connection points) */}
      <circle cx="120" cy="180" r="4" fill="#a78bfa"/>
      <circle cx="380" cy="130" r="4" fill="#a78bfa"/>
      <circle cx="300" cy="200" r="4" fill="#a78bfa"/>
    </svg>
  );

  return (
    <div className="scf-login-page">
      {/* Left panel */}
      <div className="scf-login-left">
        <div className="scf-login-left-bg" style={{ opacity: 0.1, background: 'linear-gradient(135deg, #1a1563 0%, #2d1b69 50%, #1a1563 100%)' }}></div>
        <div className="scf-login-logo">
          <span style={{ fontSize: 20 }}>Sourcing Partner SCF Platform</span>
          <small>(Demo)</small>
        </div>
        <div className="scf-login-left-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <h1 className="scf-login-tagline" style={{ textAlign: 'center', marginBottom: 24 }}>Welcome to<br />Sourcing Partner<br />SCF Platform (Demo)</h1>
          <SupplyChainIllustration />
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="scf-login-right">
        <div style={{ marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, background: '#6d28d9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>SP</span>
          </div>
          <h2 className="scf-login-form-title">Welcome back</h2>
          <p className="scf-login-form-sub">Sign in to Sourcing Partner SCF Platform</p>
        </div>

        <form onSubmit={handleLogin} data-testid="login-form">
          <div className="scf-form-group">
            <label className="scf-label">Email Address</label>
            <input
              className="scf-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              data-testid="login-email-input"
              autoComplete="email"
            />
          </div>

          <div className="scf-form-group">
            <label className="scf-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="scf-input"
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                data-testid="login-password-input"
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <span style={{ fontSize: 12.5, color: '#6d28d9', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
          </div>

          <button
            type="submit"
            className="scf-login-btn"
            disabled={loading}
            data-testid="login-submit-btn"
          >
            {loading ? <Loader size={16} style={{ display: 'inline', animation: 'spin 0.8s linear infinite' }} /> : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 32, padding: 16, background: '#f8f5ff', borderRadius: 8, border: '1px solid #ede9fe' }}>
          <p style={{ fontSize: 12, color: '#5b21b6', fontWeight: 600, margin: '0 0 6px' }}>Demo Credentials</p>
          {[
            { role: 'Anchor Maker', email: 'ramesh@tatamotors.com' },
            { role: 'Anchor Checker', email: 'suresh@tatamotors.com' },
            { role: 'Channel Partner', email: 'ganga@jagdambamotors.com' },
          ].map(u => (
            <div key={u.email} style={{ marginBottom: 4, cursor: 'pointer' }} onClick={() => { setEmail(u.email); setPassword('password'); }}>
              <span style={{ fontSize: 11.5, color: '#374151' }}><strong>{u.role}:</strong> {u.email}</span>
            </div>
          ))}
          <p style={{ fontSize: 11, color: '#9ca3af', margin: '6px 0 0' }}>Password: password | OTP: 000000</p>
        </div>

        <p style={{ marginTop: 32, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
          © 2024 Sourcing Partner SCF Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}
