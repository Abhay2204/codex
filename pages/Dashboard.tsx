import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Trophy, Flame, Target, Zap, Activity, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  tags: string[];
}

const Dashboard: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsData] = await Promise.all([
          api.getProblems(),
          refreshUser()
        ]);
        setProblems(problemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#a855f7', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const solvedCount = user?.solvedProblems?.length || 0;
  const totalProblems = problems.length || 7;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);

  const recommendedProblems = problems
    .filter(p => !user?.solvedProblems?.includes(p._id))
    .slice(0, 3);

  const cardStyle: React.CSSProperties = {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', minHeight: '100vh', background: '#000' }}>
      {/* Welcome Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Developer'}.
          </h1>
          <p style={{ color: '#71717a', fontSize: '16px' }}>Ready to solve some problems today?</p>
        </div>
        <Link to="/problems" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', borderRadius: '12px', color: '#fff', fontWeight: '500', textDecoration: 'none' }}>
          Daily Challenge
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={cardStyle}>
          <div style={{ position: 'absolute', right: '16px', top: '16px', opacity: 0.1 }}>
            <Trophy size={64} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#71717a' }}>
            <Trophy size={16} style={{ color: '#facc15' }} />
            <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rank</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>#{user?.rank?.toLocaleString() || '—'}</div>
          <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={12} /> Global Ranking
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ position: 'absolute', right: '16px', top: '16px', opacity: 0.1 }}>
            <CheckCircle2 size={64} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#71717a' }}>
            <Target size={16} style={{ color: '#a855f7' }} />
            <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solved</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{user?.solved || 0}</div>
          <div style={{ width: '100%', background: '#09090b', height: '6px', borderRadius: '9999px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(to right, #a855f7, #22d3ee)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ position: 'absolute', right: '16px', top: '16px', opacity: 0.1 }}>
            <Flame size={64} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#71717a' }}>
            <Flame size={16} style={{ color: '#f97316' }} />
            <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Streak</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{user?.streak || 0} <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#52525b' }}>days</span></div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ height: '8px', width: '8px', borderRadius: '50%', background: i < (user?.streak || 0) % 7 ? '#f97316' : '#09090b' }} />
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ position: 'absolute', right: '16px', top: '16px', opacity: 0.1 }}>
            <Zap size={64} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#71717a' }}>
            <Zap size={16} style={{ color: '#22d3ee' }} />
            <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>XP</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{user?.xp?.toLocaleString() || 0}</div>
          <div style={{ fontSize: '12px', color: '#52525b', marginTop: '8px' }}>
            Level {Math.floor((user?.xp || 0) / 1000)}
          </div>
        </div>
      </div>

      {/* Activity & Recommended */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div style={{ ...cardStyle, padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} style={{ color: '#4ade80' }} /> Recent Activity
          </h3>
          <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '1px solid #27272a' }}>
            {user?.solvedProblems && user.solvedProblems.length > 0 ? (
              user.solvedProblems.slice(-5).reverse().map((problemId, idx) => {
                const problem = problems.find(p => p._id === problemId);
                return (
                  <div key={problemId} style={{ marginBottom: '24px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-29px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#09090b', border: '2px solid #a855f7' }} />
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff' }}>
                      Solved: {problem?.title || `Problem #${problemId.slice(-4)}`}
                    </div>
                    <div style={{ fontSize: '12px', color: '#52525b', marginTop: '4px' }}>
                      {problem?.difficulty || 'Unknown'} • {problem?.tags?.join(', ') || 'DSA'}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: '#52525b', fontSize: '14px' }}>No recent activity. Start solving!</div>
            )}
          </div>
        </div>

        <div style={{ ...cardStyle, padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Recommended</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recommendedProblems.length > 0 ? (
              recommendedProblems.map(problem => (
                <Link 
                  key={problem._id} 
                  to={`/problem/${problem._id}`}
                  style={{ display: 'block', padding: '12px', borderRadius: '12px', background: '#09090b', border: '1px solid #27272a', textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#fff' }}>{problem.title}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '9999px', background: problem.difficulty === 'Easy' ? 'rgba(74,222,128,0.1)' : problem.difficulty === 'Medium' ? 'rgba(250,204,21,0.1)' : 'rgba(248,113,113,0.1)', color: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#facc15' : '#f87171' }}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#52525b' }}>{problem.tags?.join(' • ')}</div>
                </Link>
              ))
            ) : (
              <div style={{ color: '#52525b', fontSize: '14px', textAlign: 'center', padding: '16px' }}>
                All problems solved! 🎉
              </div>
            )}
          </div>
          <Link to="/problems" style={{ display: 'block', textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#a855f7', textDecoration: 'none' }}>View all problems</Link>
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

export default Dashboard;
