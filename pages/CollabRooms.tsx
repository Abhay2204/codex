import React, { useState, useEffect } from 'react';
import { Users, Plus, Lock, Globe, Video, Loader2, X } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Room {
  _id: string;
  name: string;
  hostName: string;
  participants: string[];
  maxParticipants: number;
  type: 'public' | 'private';
  language: string;
}

const CollabRooms: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    maxParticipants: 5,
    type: 'public',
    language: 'JavaScript'
  });

  const fetchRooms = async () => {
    try {
      const data = await api.getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.name.trim()) return;
    
    setCreating(true);
    try {
      await api.createRoom(newRoom);
      setShowCreateModal(false);
      setNewRoom({ name: '', maxParticipants: 5, type: 'public', language: 'JavaScript' });
      fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await api.joinRoom(roomId);
      fetchRooms();
    } catch (error: any) {
      alert(error.message || 'Failed to join room');
    }
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
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white flex items-center gap-3">
             <Users className="text-cyber" /> Collaboration Rooms
           </h1>
           <p className="text-slate-400 mt-2">Code together in real-time with audio/video chat.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-electric hover:bg-blue-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/20 transition-all"
        >
           <Plus size={18} /> Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {rooms.map(room => (
            <div key={room._id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyber/50 transition-all group cursor-pointer hover:-translate-y-1">
               <div className="flex justify-between items-start mb-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${room.type === 'public' ? 'bg-neon/10 text-neon' : 'bg-red-500/10 text-red-500'}`}>
                     {room.type}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                     <Users size={14} /> {room.participants.length}/{room.maxParticipants}
                  </div>
               </div>
               
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber transition-colors">{room.name}</h3>
               <p className="text-sm text-slate-400 mb-6">Hosted by <span className="text-white">{room.hostName}</span></p>
               
               <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                     <span className="px-2 py-1 bg-space-900 rounded text-xs text-slate-300 border border-white/10 font-mono">{room.language}</span>
                     <span className="p-1 bg-space-900 rounded text-slate-300 border border-white/10"><Video size={14} /></span>
                  </div>
                  <button 
                    onClick={() => handleJoinRoom(room._id)}
                    disabled={room.participants.length >= room.maxParticipants}
                    className="text-sm font-medium text-white bg-space-700 hover:bg-space-600 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {room.participants.length >= room.maxParticipants ? 'Full' : 'Join Room'}
                  </button>
               </div>
            </div>
         ))}
         
         {/* Create New Placeholder */}
         <div 
           onClick={() => setShowCreateModal(true)}
           className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer min-h-[200px]"
         >
            <div className="w-12 h-12 rounded-full bg-space-800 flex items-center justify-center mb-4 text-slate-400">
               <Plus size={24} />
            </div>
            <h3 className="text-lg font-medium text-slate-300">Create New Room</h3>
            <p className="text-sm text-slate-500 mt-1">Start a private session or public challenge</p>
         </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-space-800 rounded-2xl border border-white/10 w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Room</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateRoom} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-electric/50"
                  placeholder="e.g., Interview Prep - Arrays"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Max Participants</label>
                  <select
                    value={newRoom.maxParticipants}
                    onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: parseInt(e.target.value) })}
                    className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric/50"
                  >
                    {[2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} people</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Room Type</label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric/50"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                <select
                  value={newRoom.language}
                  onChange={(e) => setNewRoom({ ...newRoom, language: e.target.value })}
                  className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric/50"
                >
                  {['JavaScript', 'Python', 'Java', 'C++', 'Go', 'TypeScript'].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                disabled={creating}
                className="w-full py-3.5 bg-electric hover:bg-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {creating ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                {creating ? 'Creating...' : 'Create Room'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollabRooms;
