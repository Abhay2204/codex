import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import ProblemSolve from './pages/ProblemSolve';
import PracticeDSA from './pages/PracticeDSA';
import Leaderboard from './pages/Leaderboard';
import CollabRooms from './pages/CollabRooms';
import CollabRoom from './pages/CollabRoom';
import About from './pages/About';
import DSARoadmap from './pages/DSARoadmap';
import { Home as HomeIcon, Code, Trophy, Users, BookOpen, Layers, LogOut, Loader2, Map, Globe } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#a855f7', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  if (location.pathname.startsWith('/problem/')) return null;

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.2s',
    background: active ? 'rgba(168,85,247,0.1)' : 'transparent',
    color: active ? '#a855f7' : '#71717a'
  });

  const sectionTitle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#3f3f46',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginTop: '16px'
  };

  return (
    <div style={{ width: '256px', background: '#09090b', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 50 }}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #a855f7, #22d3ee)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Code style={{ width: '20px', height: '20px', color: '#fff' }} />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 'bold', background: 'linear-gradient(to right, #a855f7, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CodeX</span>
        </div>
      </div>
      
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link to="/dashboard" style={linkStyle(isActive('/dashboard'))}>
          <HomeIcon size={18} /> Dashboard
        </Link>
        
        <div style={sectionTitle}>Learning</div>
        <Link to="/roadmap" style={linkStyle(isActive('/roadmap'))}>
          <Map size={18} /> DSA Roadmap
        </Link>
        <Link to="/practice" style={linkStyle(isActive('/practice'))}>
          <Layers size={18} /> Practice DSA
        </Link>
        <Link to="/problems" style={linkStyle(isActive('/problems'))}>
          <Code size={18} /> Problem Set
        </Link>
        
        <div style={sectionTitle}>Community</div>
        <Link to="/leaderboard" style={linkStyle(isActive('/leaderboard'))}>
          <Trophy size={18} /> Leaderboard
        </Link>
        <Link to="/rooms" style={linkStyle(isActive('/rooms'))}>
          <Users size={18} /> Collab Rooms
        </Link>
        
        <div style={sectionTitle}>Info</div>
        <Link to="/" style={linkStyle(false)}>
          <Globe size={18} /> Home
        </Link>
        <Link to="/about" style={linkStyle(isActive('/about'))}>
          <BookOpen size={18} /> About & Docs
        </Link>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid #27272a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: '#18181b', border: '1px solid #27272a' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontWeight: 'bold' }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: '12px', color: '#52525b' }}>{user?.xp?.toLocaleString() || 0} XP</div>
          </div>
          <button onClick={logout} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717a', borderRadius: '8px' }} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/problem/');
  const isPublicPage = ['/', '/login', '/register', '/roadmap'].includes(location.pathname);
  
  if (isPublicPage) {
    return <>{children}</>;
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingLeft: isWorkspace ? 0 : '256px' }}>
      <Sidebar />
      <main style={{ height: '100%' }}>
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#a855f7', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/roadmap" element={<DSARoadmap />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
        <Route path="/problem/:id" element={<ProtectedRoute><ProblemSolve /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><PracticeDSA /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><CollabRooms /></ProtectedRoute>} />
        <Route path="/room/:id" element={<ProtectedRoute><CollabRoom /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Routes>
    </LayoutWrapper>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
