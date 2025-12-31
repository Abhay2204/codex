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
import About from './pages/About';
import { Home as HomeIcon, Code, Trophy, Users, BookOpen, Layers, LogOut, Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
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

  return (
    <div className="w-64 bg-space-900 border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber tracking-tight">CodeX</div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/dashboard') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <HomeIcon size={18} /> Dashboard
        </Link>
        <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase mt-4 tracking-wider">Learning</div>
        <Link to="/practice" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/practice') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <Layers size={18} /> Practice DSA
        </Link>
        <Link to="/problems" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/problems') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <Code size={18} /> Problem Set
        </Link>
        <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase mt-4 tracking-wider">Community</div>
        <Link to="/leaderboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/leaderboard') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <Trophy size={18} /> Leaderboard
        </Link>
        <Link to="/rooms" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/rooms') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <Users size={18} /> Collab Rooms
        </Link>
        <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase mt-4 tracking-wider">Info</div>
        <Link to="/about" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/about') ? 'bg-electric/10 text-electric' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
           <BookOpen size={18} /> About & Docs
        </Link>
      </nav>

      <div className="p-4 border-t border-white/5">
         <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-space-800 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center text-electric font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
               <div className="text-sm font-medium text-white truncate">{user?.name || 'User'}</div>
               <div className="text-xs text-slate-500">{user?.xp?.toLocaleString() || 0} XP</div>
            </div>
            <button onClick={logout} className="p-1.5 hover:bg-space-700 rounded text-slate-400 hover:text-white transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/problem/');
  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);
  
  if (isPublicPage) {
    return <>{children}</>;
  }
  
  return (
    <div className={`min-h-screen bg-space-900 ${!isWorkspace ? 'pl-64' : ''}`}>
      <Sidebar />
      <main className="h-full">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
        <Route path="/problem/:id" element={<ProtectedRoute><ProblemSolve /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><PracticeDSA /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><CollabRooms /></ProtectedRoute>} />
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
