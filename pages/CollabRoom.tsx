import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, Send, ArrowLeft, Code, MessageSquare, 
  Loader2, LogOut, Copy, Check, Play
} from 'lucide-react';
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

  // Fetch room data
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

  // Fetch messages (polling)
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

  // Initial load
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

  // Polling for new messages and room updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
      fetchRoom();
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages, fetchRoom]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle code changes with debounce
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

  // Send message
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

  // Leave room
  const handleLeaveRoom = async () => {
    try {
      await api.leaveRoom(id!);
      navigate('/rooms');
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  // Copy room link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Room not found</h2>
          <Link to="/rooms" className="text-electric hover:underline">Back to rooms</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-space-900 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-space-800 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/rooms')}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-white">{room.name}</h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Hosted by {room.hostName}</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 bg-space-700 rounded text-slate-300">{room.language}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-space-700 rounded-lg">
            <Users size={16} className="text-cyber" />
            <span className="text-sm text-white">{room.participants.length}/{room.maxParticipants}</span>
          </div>
          
          <button
            onClick={handleCopyLink}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Copy room link"
          >
            {copied ? <Check size={18} className="text-neon" /> : <Copy size={18} />}
          </button>
          
          <button
            onClick={handleLeaveRoom}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
          >
            <LogOut size={16} />
            Leave
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-white/10">
          <div className="h-10 bg-space-800/50 flex items-center px-4 border-b border-white/5">
            <Code size={16} className="text-electric mr-2" />
            <span className="text-sm text-slate-300">Shared Editor</span>
            <span className="ml-auto text-xs text-slate-500">Changes sync automatically</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
            placeholder="// Start coding together..."
          />
        </div>

        {/* Sidebar - Chat & Participants */}
        <div className="w-80 flex flex-col bg-space-800/50">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'text-white border-b-2 border-electric' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'code' 
                  ? 'text-white border-b-2 border-electric' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              People ({room.participants.length})
            </button>
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-500 text-sm py-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className={`${msg.type === 'system' ? 'text-center' : ''}`}>
                      {msg.type === 'system' ? (
                        <span className="text-xs text-slate-500 italic">{msg.content}</span>
                      ) : (
                        <div className={`${msg.userId === user?.id ? 'ml-auto' : ''} max-w-[85%]`}>
                          {msg.userId !== user?.id && (
                            <div className="text-xs text-slate-400 mb-1">{msg.userName}</div>
                          )}
                          <div className={`px-3 py-2 rounded-lg text-sm ${
                            msg.userId === user?.id 
                              ? 'bg-electric text-white rounded-br-none' 
                              : 'bg-space-700 text-slate-200 rounded-bl-none'
                          }`}>
                            {msg.type === 'code' ? (
                              <pre className="font-mono text-xs whitespace-pre-wrap">{msg.content}</pre>
                            ) : (
                              msg.content
                            )}
                          </div>
                          <div className="text-[10px] text-slate-600 mt-1">
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
              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-space-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric/50"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="p-2 bg-electric hover:bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Participants List */
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {room.participants.map((participant) => (
                  <div 
                    key={participant._id}
                    className="flex items-center gap-3 p-3 bg-space-700/50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center text-electric font-bold text-sm">
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {participant.name}
                        {participant._id === room.host && (
                          <span className="ml-2 text-xs text-cyber">(Host)</span>
                        )}
                        {participant._id === user?.id && (
                          <span className="ml-2 text-xs text-slate-500">(You)</span>
                        )}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-neon rounded-full" title="Online" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollabRoom;
