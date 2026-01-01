import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Search, Globe, Users, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface LeaderboardUser {
  _id: string;
  name: string;
  xp: number;
  solved: number;
  country: string;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextUpdate, setNextUpdate] = useState(15 * 60);

  const fetchLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setUsers(data);
      setNextUpdate(15 * 60);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const refreshInterval = setInterval(fetchLeaderboard, 15 * 60 * 1000);
    const countdownInterval = setInterval(() => {
      setNextUpdate(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topThree = filteredUsers.slice(0, 3);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#a855f7', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', minHeight: '100vh', background: '#000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy style={{ color: '#facc15' }} /> Global Leaderboard
          </h1>
          <p style={{ color: '#71717a', marginTop: '8px' }}>Compete with the top developers worldwide.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#52525b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={12} style={{ animation: nextUpdate < 60 ? 'spin 1s linear infinite' : 'none' }} />
            Next update in {formatTime(nextUpdate)}
          </div>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#52525b' }} />
            <input 
              type="text" 
              placeholder="Search user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '10px 16px 10px 40px', fontSize: '14px', color: '#fff', outline: 'none', width: '240px' }}
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {/* 2nd Place */}
          <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', textAlign: 'center', marginTop: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #94a3b8, #64748b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '24px', margin: '0 auto 12px', border: '4px solid #09090b' }}>2</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{topThree[1]?.name}</h3>
            <p style={{ color: '#94a3b8', fontFamily: 'monospace', marginTop: '4px' }}>{topThree[1]?.xp?.toLocaleString()} XP</p>
            <p style={{ fontSize: '12px', color: '#52525b', marginTop: '4px' }}>{topThree[1]?.solved} solved</p>
          </div>
          
          {/* 1st Place */}
          <div style={{ background: '#18181b', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #facc15, #fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '32px', margin: '0 auto 12px', border: '4px solid #09090b', boxShadow: '0 0 30px rgba(250,204,21,0.3)' }}>1</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{topThree[0]?.name}</h3>
            <p style={{ color: '#facc15', fontFamily: 'monospace', marginTop: '4px', fontSize: '18px' }}>{topThree[0]?.xp?.toLocaleString()} XP</p>
            <p style={{ fontSize: '12px', color: '#52525b', marginTop: '4px' }}>{topThree[0]?.solved} solved</p>
          </div>
          
          {/* 3rd Place */}
          <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', textAlign: 'center', marginTop: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '24px', margin: '0 auto 12px', border: '4px solid #09090b' }}>3</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{topThree[2]?.name}</h3>
            <p style={{ color: '#f97316', fontFamily: 'monospace', marginTop: '4px' }}>{topThree[2]?.xp?.toLocaleString()} XP</p>
            <p style={{ fontSize: '12px', color: '#52525b', marginTop: '4px' }}>{topThree[2]?.solved} solved</p>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px', borderBottom: '1px solid #27272a', background: '#09090b' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#27272a', borderRadius: '8px', fontSize: '14px', color: '#fff', fontWeight: '500', border: 'none', cursor: 'pointer' }}><Globe size={14} /> Global</button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'transparent', borderRadius: '8px', fontSize: '14px', color: '#71717a', fontWeight: '500', border: 'none', cursor: 'pointer' }}><Users size={14} /> Friends</button>
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#52525b' }}>
            {users.length} users ranked
          </div>
        </div>
        
        {users.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#52525b' }}>
            No users found. Be the first to join!
          </div>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#09090b', color: '#71717a', fontSize: '12px', textTransform: 'uppercase', fontWeight: '500' }}>
                <th style={{ padding: '16px 24px' }}>Rank</th>
                <th style={{ padding: '16px 24px' }}>User</th>
                <th style={{ padding: '16px 24px' }}>Country</th>
                <th style={{ padding: '16px 24px' }}>Problems Solved</th>
                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((leaderUser, index) => {
                const isCurrentUser = user?.id === leaderUser._id;
                return (
                  <tr key={leaderUser._id} style={{ borderBottom: '1px solid #27272a', background: isCurrentUser ? 'rgba(168,85,247,0.1)' : 'transparent' }}>
                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: '#a1a1aa' }}>#{leaderUser.rank || index + 1}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', background: leaderUser.rank <= 3 ? 'linear-gradient(135deg, #a855f7, #22d3ee)' : '#27272a', color: leaderUser.rank <= 3 ? '#fff' : '#71717a' }}>
                          {leaderUser.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ color: isCurrentUser ? '#fff' : '#d4d4d8', fontWeight: isCurrentUser ? 'bold' : 'normal' }}>
                          {leaderUser.name} {isCurrentUser && '(You)'}
                        </span>
                        {leaderUser.rank <= 3 && <Medal size={14} style={{ color: '#facc15' }} />}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', color: '#71717a', fontFamily: 'monospace', fontSize: '14px' }}>{leaderUser.country || 'IN'}</td>
                    <td style={{ padding: '16px 24px', color: '#d4d4d8' }}>{leaderUser.solved}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 'bold', fontFamily: 'monospace', color: '#a855f7' }}>{leaderUser.xp?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #52525b; }
        input:focus { border-color: #a855f7; }
      `}</style>
    </div>
  );
};

export default Leaderboard;
