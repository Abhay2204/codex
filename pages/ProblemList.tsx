import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, Tag, CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  tags: string[];
  acceptanceRate: number;
}

const ProblemList: React.FC = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await api.getProblems();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

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
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>Problem Set</h1>
          <p style={{ color: '#71717a', marginTop: '8px', fontSize: '14px' }}>Curated problems with AI-powered visualization.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#52525b' }} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search problems or tags..." 
              style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px 16px 12px 40px', fontSize: '14px', color: '#fff', outline: 'none', width: '280px' }}
            />
          </div>
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: '12px 16px', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '14px', color: '#d4d4d8', outline: 'none', cursor: 'pointer' }}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredProblems.length > 0 ? (
          filteredProblems.map(problem => {
            const isSolved = user?.solvedProblems?.includes(problem._id);
            return (
              <Link 
                key={problem._id} 
                to={`/problem/${problem._id}`}
                style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '20px', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ marginTop: '4px' }}>
                      {isSolved ? (
                        <CheckCircle2 size={20} style={{ color: '#4ade80' }} />
                      ) : (
                        <Circle size={20} style={{ color: '#3f3f46' }} />
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                        {problem.title}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em', background: problem.difficulty === 'Easy' ? 'rgba(74,222,128,0.1)' : problem.difficulty === 'Medium' ? 'rgba(250,204,21,0.1)' : 'rgba(248,113,113,0.1)', color: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#facc15' : '#f87171', border: `1px solid ${problem.difficulty === 'Easy' ? 'rgba(74,222,128,0.3)' : problem.difficulty === 'Medium' ? 'rgba(250,204,21,0.3)' : 'rgba(248,113,113,0.3)'}` }}>
                          {problem.difficulty}
                        </span>
                        <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: '#3f3f46' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {problem.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '12px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Tag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Acceptance</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{problem.acceptanceRate}%</div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '80px', background: '#18181b', borderRadius: '16px', border: '2px dashed #27272a' }}>
            <Search size={48} style={{ margin: '0 auto 16px', color: '#3f3f46' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4d4d8' }}>No problems found</h3>
            <p style={{ color: '#52525b', marginTop: '8px' }}>Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #52525b; }
        input:focus, select:focus { border-color: #a855f7; }
      `}</style>
    </div>
  );
};

export default ProblemList;
