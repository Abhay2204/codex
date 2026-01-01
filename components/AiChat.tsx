
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getProgressiveHint, getCodeAnalysis, getErrorExplanation } from '../services/gemini';
import { Bot, Send, X, AlertTriangle } from 'lucide-react';

interface AiChatProps {
  currentCode: string;
  problemDesc: string;
  executionError?: string | null;
  onClose?: () => void;
}

const AiChat: React.FC<AiChatProps> = ({ currentCode, problemDesc, executionError, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: "Hi! I'm Gemini, your coding assistant. Ask for a hint or analysis if you get stuck.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'ai', content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    addMessage('user', userMsg);
    setLoading(true);

    try {
        // Simple logic to direct intent to specific Gemini functions
        let response = '';
        if (userMsg.toLowerCase().includes('hint')) {
             const hintsGiven = messages.filter(m => m.role === 'ai' && m.content.includes('Hint:')).map(m => m.content);
             response = await getProgressiveHint(currentCode, problemDesc, hintsGiven);
        } else if (userMsg.toLowerCase().includes('analyze') || userMsg.toLowerCase().includes('review')) {
             response = await getCodeAnalysis(currentCode, problemDesc);
        } else if (userMsg.toLowerCase().includes('error') || userMsg.toLowerCase().includes('fix')) {
             if (executionError) {
                  response = await getErrorExplanation(currentCode, problemDesc, executionError);
             } else {
                  response = "I don't see any active error message from your latest run. Please run your code first to generate an error, or describe the issue you are facing.";
             }
        } else {
             // Fallback generic chat 
             response = "I can help you with hints, complexity analysis, or error explanations. Try asking 'Can you analyze my code?', 'Give me a hint', or 'Explain my error'.";
        }
        addMessage('ai', response);
    } catch (e) {
        addMessage('ai', "Sorry, I encountered an error connecting to the AI service.");
    } finally {
        setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="flex flex-col h-full bg-space-800">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-space-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyber" />
          <span className="font-semibold text-white">Gemini Assistant</span>
        </div>
        {onClose && (
            <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-electric text-white rounded-br-none' 
                : 'bg-space-700 text-gray-200 rounded-bl-none border border-white/5'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-space-700 rounded-2xl px-4 py-3 border border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-cyber rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-cyber rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-space-900/50 border-t border-white/10">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Analyze Complexity', 'Give me a Hint', 'Explain my error'].map(action => (
                <button 
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-space-700 hover:bg-space-600 text-xs text-cyber border border-cyber/20 transition-colors"
                >
                    {action}
                </button>
            ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Gemini..."
            className="w-full bg-space-900 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyber/50 transition-all placeholder:text-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyber rounded-lg text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
