import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Tag, CheckCircle2, Circle, Loader2 } from 'lucide-react';

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
      <div className="p-8 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white">Problem Set</h1>
           <p className="text-slate-400 mt-2 text-sm">Curated problems with AI-powered visualization.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-electric transition-colors" />
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search problems or tags..." 
               className="bg-space-800 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/50 w-full md:w-80 transition-all shadow-sm"
             />
           </div>
           <select 
             value={difficultyFilter}
             onChange={(e) => setDifficultyFilter(e.target.value)}
             className="px-4 py-2.5 bg-space-800 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-electric/50"
           >
             <option value="all">All Difficulties</option>
             <option value="Easy">Easy</option>
             <option value="Medium">Medium</option>
             <option value="Hard">Hard</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProblems.length > 0 ? (
            filteredProblems.map(problem => {
              const isSolved = user?.solvedProblems?.includes(problem._id);
              return (
                <Link 
                    key={problem._id} 
                    to={`/problem/${problem._id}`}
                    className="group glass-panel p-5 rounded-xl border border-white/5 hover:border-electric/30 transition-all hover:translate-x-1 hover:shadow-lg hover:shadow-electric/5 relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-electric to-cyber opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="mt-1">
                            {isSolved ? (
                                <CheckCircle2 size={20} className="text-neon" />
                            ) : (
                                <Circle size={20} className="text-slate-600" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-electric transition-colors flex items-center gap-2">
                                {problem.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${
                                    problem.difficulty === 'Easy' ? 'border-neon/30 text-neon bg-neon/5' :
                                    problem.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' :
                                    'border-red-500/30 text-red-500 bg-red-500/5'
                                }`}>
                                    {problem.difficulty}
                                </span>
                                <div className="h-1 w-1 rounded-full bg-slate-600"></div>
                                <div className="flex gap-2">
                                    {problem.tags.map(tag => (
                                    <span key={tag} className="text-xs text-slate-400 flex items-center gap-1 hover:text-slate-200 transition-colors">
                                        <Tag size={10} /> {tag}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-right hidden sm:block">
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Acceptance</div>
                        <div className="text-lg font-bold text-white font-mono">{problem.acceptanceRate}%</div>
                    </div>
                    </div>
                </Link>
              );
            })
        ) : (
            <div className="text-center py-20 bg-space-800/30 rounded-xl border border-dashed border-white/10">
                <Search size={48} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-300">No problems found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProblemList;
