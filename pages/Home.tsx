import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, Users, Trophy, Play, ArrowRight, Sparkles, BarChart, GitBranch, Cpu } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-space-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">
            CodeX
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-electric hover:bg-blue-600 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-8">
            <Sparkles size={16} /> AI-Powered Code Visualization
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Code. <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Visualize.</span> Master.
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The next-generation coding platform with real-time algorithm visualization, AI assistance, and collaborative learning. See your code come to life.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-electric hover:bg-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 text-lg">
              Start Coding Free <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-space-800 hover:bg-space-700 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center gap-2">
              <Play size={18} /> Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-space-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why CodeX?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to master data structures and algorithms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-electric/30 transition-all group">
              <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-electric" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Visualization</h3>
              <p className="text-slate-400">Watch your algorithms execute step-by-step with beautiful animations for arrays, trees, graphs, and more.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-cyber/30 transition-all group">
              <div className="w-14 h-14 bg-cyber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="text-cyber" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Hints</h3>
              <p className="text-slate-400">Get progressive hints from our AI tutor. Never get stuck again with personalized guidance.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-neon/30 transition-all group">
              <div className="w-14 h-14 bg-neon/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-neon" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collaborative Rooms</h3>
              <p className="text-slate-400">Code together in real-time with video chat. Perfect for interview prep and study groups.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all group">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="text-yellow-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Leaderboard</h3>
              <p className="text-slate-400">Compete with developers worldwide. Climb the ranks and showcase your skills.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all group">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart className="text-orange-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
              <p className="text-slate-400">Track your streak, XP, and solved problems. Stay motivated with detailed analytics.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group">
              <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="text-pink-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Language Support</h3>
              <p className="text-slate-400">Code in JavaScript, Python, Java, C++, or Go. Your choice, your comfort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Three simple steps to level up your coding skills</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-electric rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg shadow-electric/30">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Choose a Problem</h3>
              <p className="text-slate-400">Browse our curated collection of DSA problems organized by topic and difficulty.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyber rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg shadow-cyber/30">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Write & Visualize</h3>
              <p className="text-slate-400">Code your solution and watch it execute with real-time data structure visualization.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neon rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-space-900 shadow-lg shadow-neon/30">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Learn & Compete</h3>
              <p className="text-slate-400">Get AI feedback, earn XP, climb the leaderboard, and master algorithms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 px-6 bg-space-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Master Every Topic</h2>
            <p className="text-slate-400">Comprehensive curriculum covering all essential DSA concepts</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Stacks', 'Queues', 'Hash Tables', 'Heaps', 'Sorting', 'Searching', 'Recursion'].map(topic => (
              <span key={topic} className="px-5 py-2.5 bg-space-800 border border-white/10 rounded-full text-slate-300 hover:border-electric/50 hover:text-white transition-all cursor-pointer">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-electric/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Level Up?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of developers mastering algorithms with CodeX</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-electric hover:bg-blue-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all">
            Create Free Account <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">
            CodeX
          </div>
          <p className="text-slate-500 text-sm">© 2024 CodeX Platform. Built for developers, by developers.</p>
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
