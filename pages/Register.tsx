import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, AlertCircle, ArrowLeft, AlertTriangle, Code } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '14px 16px 14px 48px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background effects */}
      <div style={{ position: 'absolute', top: '15%', right: '20%', width: '400px', height: '400px', background: 'rgba(34,211,238,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '20%', width: '300px', height: '300px', background: 'rgba(168,85,247,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: '24px', padding: '40px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #a855f7, #22d3ee)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code style={{ width: '28px', height: '28px', color: '#fff' }} />
              </div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', background: 'linear-gradient(to right, #c084fc, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CodeX</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Start your coding journey today</p>
          </div>

          {/* Warning */}
          <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertTriangle size={20} style={{ color: '#facc15', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ color: '#facc15', fontWeight: '500', fontSize: '14px' }}>Important Note</p>
              <p style={{ color: 'rgba(250,204,21,0.8)', fontSize: '12px', marginTop: '4px' }}>
                Please save your password securely. Password recovery is not available at this time.
              </p>
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={20} style={{ color: '#f87171' }} />
              <span style={{ color: '#f87171', fontSize: '14px' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="••••••••"
                  required
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(to right, #a855f7, #22d3ee)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ color: '#71717a', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: '500' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #52525b; }
        input:focus { border-color: #a855f7; box-shadow: 0 0 0 2px rgba(168,85,247,0.2); }
      `}</style>
    </div>
  );
};

export default Register;
