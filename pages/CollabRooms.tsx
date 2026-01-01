import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Video, Loader2, X } from 'lucide-react';
import { api } from '../services/api';

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
  const navigate = useNavigate();
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
      const room = await api.createRoom(newRoom);
      setShowCreateModal(false);
      setNewRoom({ name: '', maxParticipants: 5, type: 'public', language: 'JavaScript' });
      navigate(`/room/${room._id}`);
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await api.joinRoom(roomId);
      navigate(`/room/${roomId}`);
    } catch (error: any) {
      alert(error.message || 'Failed to join room');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none'
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users style={{ color: '#22d3ee' }} /> Collaboration Rooms
          </h1>
          <p style={{ color: '#71717a', marginTop: '8px' }}>Code together in real-time with audio/video chat.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', borderRadius: '12px', color: '#fff', fontWeight: '500', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Create Room
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {rooms.map(room => (
          <div key={room._id} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', background: room.type === 'public' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: room.type === 'public' ? '#4ade80' : '#f87171' }}>
                {room.type}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#52525b', fontSize: '14px' }}>
                <Users size={14} /> {room.participants.length}/{room.maxParticipants}
              </div>
            </div>
            
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{room.name}</h3>
            <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '24px' }}>Hosted by <span style={{ color: '#fff' }}>{room.hostName}</span></p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '4px 10px', background: '#09090b', borderRadius: '8px', fontSize: '12px', color: '#d4d4d8', border: '1px solid #27272a', fontFamily: 'monospace' }}>{room.language}</span>
                <span style={{ padding: '4px 8px', background: '#09090b', borderRadius: '8px', color: '#d4d4d8', border: '1px solid #27272a' }}><Video size={14} /></span>
              </div>
              <button 
                onClick={() => handleJoinRoom(room._id)}
                disabled={room.participants.length >= room.maxParticipants}
                style={{ fontSize: '14px', fontWeight: '500', color: '#fff', background: '#27272a', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: room.participants.length >= room.maxParticipants ? 'not-allowed' : 'pointer', opacity: room.participants.length >= room.maxParticipants ? 0.5 : 1 }}
              >
                {room.participants.length >= room.maxParticipants ? 'Full' : 'Join Room'}
              </button>
            </div>
          </div>
        ))}
        
        {/* Create New Placeholder */}
        <div 
          onClick={() => setShowCreateModal(true)}
          style={{ border: '2px dashed #27272a', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', minHeight: '200px' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#71717a' }}>
            <Plus size={24} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#d4d4d8' }}>Create New Room</h3>
          <p style={{ fontSize: '14px', color: '#52525b', marginTop: '4px' }}>Start a private session or public challenge</p>
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ background: '#18181b', borderRadius: '24px', border: '1px solid #27272a', width: '100%', maxWidth: '420px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Create Room</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717a', borderRadius: '8px' }}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateRoom}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g., Interview Prep - Arrays"
                  required
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Max Participants</label>
                  <select
                    value={newRoom.maxParticipants}
                    onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: parseInt(e.target.value) })}
                    style={inputStyle}
                  >
                    {[2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} people</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Room Type</label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#d4d4d8', marginBottom: '8px' }}>Language</label>
                <select
                  value={newRoom.language}
                  onChange={(e) => setNewRoom({ ...newRoom, language: e.target.value })}
                  style={inputStyle}
                >
                  {['JavaScript', 'Python', 'Java', 'C++', 'Go', 'TypeScript'].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                disabled={creating}
                style={{ width: '100%', padding: '14px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: creating ? 'not-allowed' : 'pointer', opacity: creating ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {creating ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={20} />}
                {creating ? 'Creating...' : 'Create Room'}
              </button>
            </form>
          </div>
        </div>
      )}

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

export default CollabRooms;
