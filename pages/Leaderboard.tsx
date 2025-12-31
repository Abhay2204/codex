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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [nextUpdate, setNextUpdate] = useState(15 * 60);

  const fetchLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setUsers(data);
      setLastUpdated(new Date());
      setNextUpdate(15 * 60);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Auto-refresh every 15 minutes
    const refreshInterval = setInterval(fetchLeaderboard, 15 * 60 * 1000);
    
    // Countdown timer
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
  const restUsers = filteredUsers.slice(3);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-500" /> Global Leaderboard
          </h1>
          <p className="text-slate-400 mt-2">Compete with the top developers worldwide.</p>
        </div>
        
        <div className="flex gap-4 items-center">
           <div className="text-xs text-slate-500 flex items-center gap-2">
             <RefreshCw size={12} className={nextUpdate < 60 ? 'animate-spin text-electric' : ''} />
             Next update in {formatTime(nextUpdate)}
           </div>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search user..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-space-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-electric w-64"
             />
           </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {/* 2nd Place */}
           <div className="glass-panel p-6 rounded-xl border border-slate-300/20 bg-gradient-to-br from-space-800 to-slate-300/5 relative overflow-hidden mt-4 order-1 md:order-1">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={80} /></div>
               <div className="relative z-10 text-center">
                 <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center text-space-900 font-bold text-2xl mx-auto mb-3 border-4 border-space-900 shadow-lg">2</div>
                 <h3 className="text-xl font-bold text-white truncate">{topThree[1]?.name}</h3>
                 <p className="text-slate-300 font-mono mt-1">{topThree[1]?.xp?.toLocaleString()} XP</p>
                 <p className="text-xs text-slate-500 mt-1">{topThree[1]?.solved} solved</p>
              </div>
           </div>
           
           {/* 1st Place */}
           <div className="glass-panel p-6 rounded-xl border border-yellow-500/20 bg-gradient-to-br from-space-800 to-yellow-500/5 relative overflow-hidden order-0 md:order-2">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={80} /></div>
              <div className="relative z-10 text-center">
                 <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-space-900 font-bold text-3xl mx-auto mb-3 border-4 border-space-900 shadow-lg shadow-yellow-500/30">1</div>
                 <h3 className="text-2xl font-bold text-white truncate">{topThree[0]?.name}</h3>
                 <p className="text-yellow-500 font-mono mt-1 text-lg">{topThree[0]?.xp?.toLocaleString()} XP</p>
                 <p className="text-xs text-slate-500 mt-1">{topThree[0]?.solved} solved</p>
              </div>
           </div>
           
           {/* 3rd Place */}
           <div className="glass-panel p-6 rounded-xl border border-orange-700/20 bg-gradient-to-br from-space-800 to-orange-700/5 relative overflow-hidden mt-8 order-2 md:order-3">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={80} /></div>
               <div className="relative z-10 text-center">
                 <div className="w-16 h-16 rounded-full bg-orange-700 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 border-4 border-space-900 shadow-lg">3</div>
                 <h3 className="text-xl font-bold text-white truncate">{topThree[2]?.name}</h3>
                 <p className="text-orange-500 font-mono mt-1">{topThree[2]?.xp?.toLocaleString()} XP</p>
                 <p className="text-xs text-slate-500 mt-1">{topThree[2]?.solved} solved</p>
              </div>
           </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
         <div className="flex items-center gap-6 p-4 border-b border-white/5 bg-space-800/50">
            <button className="flex items-center gap-2 px-4 py-2 bg-space-700 rounded-lg text-sm text-white font-medium"><Globe size={14} /> Global</button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-space-700 rounded-lg text-sm text-slate-400 font-medium transition-colors"><Users size={14} /> Friends</button>
            <div className="ml-auto text-xs text-slate-500">
              {users.length} users ranked
            </div>
         </div>
         
         {users.length === 0 ? (
           <div className="p-12 text-center text-slate-500">
             No users found. Be the first to join!
           </div>
         ) : (
           <table className="w-full text-left">
              <thead className="bg-space-800/50 text-slate-400 text-xs uppercase font-medium">
                 <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Country</th>
                    <th className="px-6 py-4">Problems Solved</th>
                    <th className="px-6 py-4 text-right">Score</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {filteredUsers.map((leaderUser, index) => {
                    const isCurrentUser = user?.id === leaderUser._id;
                    return (
                      <tr key={leaderUser._id} className={`hover:bg-white/5 transition-colors ${isCurrentUser ? "bg-electric/10 border-l-2 border-electric" : ""}`}>
                         <td className="px-6 py-4 font-mono text-slate-300">#{leaderUser.rank || index + 1}</td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${leaderUser.rank <= 3 ? 'bg-gradient-to-br from-electric to-cyber text-white' : 'bg-space-700 text-slate-400'}`}>
                                  {leaderUser.name.charAt(0).toUpperCase()}
                               </div>
                               <span className={isCurrentUser ? "font-bold text-white" : "text-slate-300"}>
                                 {leaderUser.name} {isCurrentUser && '(You)'}
                               </span>
                               {leaderUser.rank <= 3 && <Medal size={14} className="text-yellow-500" />}
                            </div>
                         </td>
                         <td className="px-6 py-4 text-slate-400 font-mono text-sm">{leaderUser.country || 'IN'}</td>
                         <td className="px-6 py-4 text-slate-300">{leaderUser.solved}</td>
                         <td className="px-6 py-4 text-right font-bold font-mono text-electric">{leaderUser.xp?.toLocaleString()}</td>
                      </tr>
                    );
                 })}
              </tbody>
           </table>
         )}
      </div>
    </div>
  );
};

export default Leaderboard;
