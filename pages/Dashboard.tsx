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
      <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  const solvedCount = user?.solvedProblems?.length || 0;
  const totalProblems = problems.length || 7;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);

  // Get recommended problems (unsolved ones)
  const recommendedProblems = problems
    .filter(p => !user?.solvedProblems?.includes(p._id))
    .slice(0, 3);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
       {/* Welcome Section */}
       <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Welcome back, {user?.name?.split(' ')[0] || 'Developer'}.
            </h1>
            <p className="text-slate-400 mt-2">Ready to solve some problems today?</p>
          </div>
          <Link to="/problems" className="bg-electric hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all">
             Daily Challenge
          </Link>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy size={64} />
             </div>
             <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Trophy size={16} className="text-yellow-500" />
                <span className="text-sm font-medium uppercase tracking-wider">Rank</span>
             </div>
             <div className="text-3xl font-bold font-mono">#{user?.rank?.toLocaleString() || '—'}</div>
             <div className="text-xs text-neon mt-2 flex items-center gap-1">
                <Activity size={12} /> Global Ranking
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={64} />
             </div>
             <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Target size={16} className="text-electric" />
                <span className="text-sm font-medium uppercase tracking-wider">Solved</span>
             </div>
             <div className="text-3xl font-bold font-mono">{user?.solved || 0}</div>
             <div className="w-full bg-space-900 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-electric h-full transition-all" style={{ width: `${progressPercent}%` }}></div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame size={64} />
             </div>
             <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Flame size={16} className="text-orange-500" />
                <span className="text-sm font-medium uppercase tracking-wider">Streak</span>
             </div>
             <div className="text-3xl font-bold font-mono text-white">{user?.streak || 0} <span className="text-base font-normal text-slate-500">days</span></div>
             <div className="flex gap-1 mt-3">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i < (user?.streak || 0) % 7 ? 'bg-orange-500' : 'bg-space-900'}`}></div>
                ))}
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={64} />
             </div>
             <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Zap size={16} className="text-cyber" />
                <span className="text-sm font-medium uppercase tracking-wider">XP</span>
             </div>
             <div className="text-3xl font-bold font-mono">{user?.xp?.toLocaleString() || 0}</div>
             <div className="text-xs text-slate-500 mt-2">
                Level {Math.floor((user?.xp || 0) / 1000)}
             </div>
          </div>
       </div>

       {/* Activity & Recommended */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-white/5">
             <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity size={18} className="text-neon" /> Recent Activity
             </h3>
             <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-px before:bg-white/10">
                {user?.solvedProblems && user.solvedProblems.length > 0 ? (
                    user.solvedProblems.slice(-5).reverse().map((problemId, idx) => {
                        const problem = problems.find(p => p._id === problemId);
                        return (
                            <div key={problemId} className="flex gap-4 relative pl-8">
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-space-900 border-2 border-electric z-10"></div>
                                <div>
                                    <div className="text-sm font-medium text-white">
                                      Solved: {problem?.title || `Problem #${problemId.slice(-4)}`}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                      {problem?.difficulty || 'Unknown'} • {problem?.tags?.join(', ') || 'DSA'}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="pl-8 text-slate-500 text-sm">No recent activity. Start solving!</div>
                )}
             </div>
          </div>

          <div className="glass-panel rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold mb-4">Recommended</h3>
              <div className="space-y-3">
                  {recommendedProblems.length > 0 ? (
                    recommendedProblems.map(problem => (
                      <Link 
                        key={problem._id} 
                        to={`/problem/${problem._id}`}
                        className="block p-3 rounded-lg bg-space-800 hover:bg-space-700 transition-colors cursor-pointer border border-white/5 group"
                      >
                         <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm group-hover:text-electric transition-colors">{problem.title}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${
                              problem.difficulty === 'Easy' ? 'bg-neon/10 text-neon border-neon/20' :
                              problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                              'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>{problem.difficulty}</span>
                         </div>
                         <div className="text-xs text-slate-500">{problem.tags?.join(' • ')}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-slate-500 text-sm text-center py-4">
                      All problems solved! 🎉
                    </div>
                  )}
              </div>
              <Link to="/problems" className="block text-center mt-6 text-sm text-electric hover:underline">View all problems</Link>
          </div>
       </div>
    </div>
  );
};

export default Dashboard;
