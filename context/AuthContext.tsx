import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  solved: number;
  streak: number;
  rank: number;
  solvedProblems: string[];
  country: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateStats: (stats: { xp?: number; solved?: number; problemId?: string; streak?: number }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUser()
        .then(userData => setUser({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          xp: userData.xp,
          solved: userData.solved,
          streak: userData.streak,
          rank: userData.rank,
          solvedProblems: userData.solvedProblems || [],
          country: userData.country || 'IN'
        }))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: userData } = await api.login(email, password);
    localStorage.setItem('token', token);
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      xp: userData.xp,
      solved: userData.solved,
      streak: userData.streak,
      rank: userData.rank,
      solvedProblems: userData.solvedProblems || [],
      country: userData.country || 'IN'
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const { token, user: userData } = await api.register(name, email, password);
    localStorage.setItem('token', token);
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      xp: userData.xp,
      solved: userData.solved,
      streak: userData.streak,
      rank: userData.rank,
      solvedProblems: [],
      country: 'IN'
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateStats = async (stats: { xp?: number; solved?: number; problemId?: string; streak?: number }) => {
    const updatedUser = await api.updateUserStats(stats);
    setUser(prev => prev ? {
      ...prev,
      xp: updatedUser.xp,
      solved: updatedUser.solved,
      streak: updatedUser.streak,
      solvedProblems: updatedUser.solvedProblems
    } : null);
  };

  const refreshUser = async () => {
    const userData = await api.getUser();
    setUser({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      xp: userData.xp,
      solved: userData.solved,
      streak: userData.streak,
      rank: userData.rank,
      solvedProblems: userData.solvedProblems || [],
      country: userData.country || 'IN'
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateStats, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
