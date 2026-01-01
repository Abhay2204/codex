import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Send, ArrowLeft, Code, MessageSquare, Loader2, LogOut, Copy, Check } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Message {
  _id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'chat' | 'code' | 'system';
  createdAt: string;
}

interface Participant {
  _id: string;
  name: string;
  email: string;
}

interface Room {
  _id: string;
  name: string;
  hostName: string;
  host: string;
  participants: Participant[];
  maxParticipants: number;
  type: 'public' | 'private';
  language: string;
  sharedCode: string;
}

const CollabRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [code, setCode] = useState('// Start coding together!\n');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTime = useRef<string | null>(null);
  const codeUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchRoom = useCallback(async () => {
    if (!id) return;
    try {
      const data = await api.getRoom(id);
      setRoom(data);
      setCode(data.sharedCode || '// Start coding together!\n');
    } catch (error) {
      console.error('Error fetching room:', error);
      navigate('/rooms');
    }
  }, [id, navigate]);

  const fetchMessages = useCallback(async () => {
    if (!id) return;
    try {
      const data = await api.getRoomMessages(id, lastMessageTime.current || undefined);
      if (data.length > 0) {
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m._id));
          const newMessages = data.filter((m: Message) => !existingIds.has(m._id));
          if (newMessages.length > 0) {
            lastMessageTime.current = newMessages[newMessages.length - 1].createdAt;
            return [...prev, ...newMessages];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [id]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchRoom();
      const msgs = await api.getRoomMessages(id!);
      setMessages(msgs);
      if (msgs.length > 0) {
        lastMessageTime.current = msgs[msgs.length - 1].createdAt;
      }
      setLoading(false);
    };
    init();
  }, [id, fetchRoom]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
      fetchRoom();
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages, fetchRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (codeUpdateTimeout.current) {
      clearTimeout(codeUpdateTimeout.current);
    }
    codeUpdateTimeout.current = setTimeout(async () => {
      try {
        await api.updateRoomCode(id!, newCode);
      } catch (error) {
        console.error('Error updating code:', error);
      }
    }, 500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    try {
      await api.sendRoomMessage(id!, newMessage.trim());
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await api.leaveRoom(id!);
      navigate('/rooms');
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: '#a855f7', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!room) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Room not found</h2>
          <Link to="/rooms" style={{ color: '#a855f7', textDecoration: 'none' }}>Back to rooms</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ height: '56px', background: '#18181b', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/rooms')} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717a', borderRadius: '8px' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontWeight: 'bold', color: '#fff', fontSize: '16px' }}>{room.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#71717a' }}>
              <span>Hosted by {room.hostName}</span>
              <span>•</span>
              <span style={{ padding: '2px 8px', background: '#27272a', borderRadius: '4px', color: '#d4d4d8' }}>{room.language}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#27272a', borderRadius: '8px' }}>
            <Users size={16} style={{ color: '#22d3ee' }} />
            <span style={{ fontSize: '14px', color: '#fff' }}>{room.participants.length}/{room.maxParticipants}</span>
          </div>
          
          <button onClick={handleCopyLink} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717a', borderRadius: '8px' }} title="Copy room link">
            {copied ? <Check size={18} style={{ color: '#4ade80' }} /> : <Copy size={18} />}
          </button>
          
          <button onClick={handleLeaveRoom} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
            <LogOut size={16} />
            Leave
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Code Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a' }}>
          <div style={{ height: '40px', background: '#09090b', display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid #27272a' }}>
            <Code size={16} style={{ color: '#a855f7', marginRight: '8px' }} />
            <span style={{ fontSize: '14px', color: '#d4d4d8' }}>Shared Editor</span>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#52525b' }}>Changes sync automatically</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            style={{ flex: 1, background: '#0a0a0a', color: '#d4d4d4', padding: '16px', fontFamily: 'monospace', fontSize: '14px', resize: 'none', border: 'none', outline: 'none' }}
            spellCheck={false}
            placeholder="// Start coding together..."
          />
        </div>

        {/* Sidebar - Chat & Participants */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', background: '#09090b' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #27272a' }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: '500', background: 'transparent', border: 'none', cursor: 'pointer', color: activeTab === 'chat' ? '#fff' : '#71717a', borderBottom: activeTab === 'chat' ? '2px solid #a855f7' : '2px solid transparent' }}
            >
              <MessageSquare size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: '500', background: 'transparent', border: 'none', cursor: 'pointer', color: activeTab === 'code' ? '#fff' : '#71717a', borderBottom: activeTab === 'code' ? '2px solid #a855f7' : '2px solid transparent' }}
            >
              <Users size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              People ({room.participants.length})
            </button>
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#52525b', fontSize: '14px', padding: '32px 0' }}>
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} style={{ textAlign: msg.type === 'system' ? 'center' : 'left' }}>
                      {msg.type === 'system' ? (
                        <span style={{ fontSize: '12px', color: '#52525b', fontStyle: 'italic' }}>{msg.content}</span>
                      ) : (
                        <div style={{ marginLeft: msg.userId === user?.id ? 'auto' : 0, maxWidth: '85%' }}>
                          {msg.userId !== user?.id && (
                            <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px' }}>{msg.userName}</div>
                          )}
                          <div style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '14px', background: msg.userId === user?.id ? '#a855f7' : '#27272a', color: msg.userId === user?.id ? '#fff' : '#d4d4d8', borderBottomRightRadius: msg.userId === user?.id ? '4px' : '12px', borderBottomLeftRadius: msg.userId === user?.id ? '12px' : '4px' }}>
                            {msg.type === 'code' ? (
                              <pre style={{ fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</pre>
                            ) : (
                              msg.content
                            )}
                          </div>
                          <div style={{ fontSize: '10px', color: '#3f3f46', marginTop: '4px' }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #27272a' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#fff', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    style={{ padding: '10px', background: '#a855f7', borderRadius: '8px', color: '#fff', border: 'none', cursor: !newMessage.trim() || sending ? 'not-allowed' : 'pointer', opacity: !newMessage.trim() || sending ? 0.5 : 1 }}
                  >
                    {sending ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Participants List */
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {room.participants.map((participant) => (
                  <div key={participant._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#18181b', borderRadius: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontWeight: 'bold', fontSize: '14px' }}>
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {participant.name}
                        {participant._id === room.host && (
                          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#22d3ee' }}>(Host)</span>
                        )}
                        {participant._id === user?.id && (
                          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#52525b' }}>(You)</span>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} title="Online" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

export default CollabRoom;
