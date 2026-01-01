import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Trophy, Terminal, Target, Brain, BarChart, TrendingUp, Zap, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const codeLines = [
  { text: 'function twoSum(nums, target) {', color: 'text-purple-400' },
  { text: '  const map = new Map();', color: 'text-blue-400' },
  { text: '  for (let i = 0; i < nums.length; i++) {', color: 'text-yellow-400' },
  { text: '    const complement = target - nums[i];', color: 'text-green-400' },
  { text: '    if (map.has(complement)) {', color: 'text-pink-400' },
  { text: '      return [map.get(complement), i];', color: 'text-cyan-400' },
  { text: '    }', color: 'text-pink-400' },
  { text: '    map.set(nums[i], i);', color: 'text-orange-400' },
  { text: '  }', color: 'text-yellow-400' },
  { text: '}', color: 'text-purple-400' },
];

const AnimatedCodeBlock: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => (prev < codeLines.length ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-2xl blur-xl" />
      <div className="relative bg-zinc-900/90 border border-zinc-700/50 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 ml-2 font-mono">solution.js</span>
        </div>
        <div className="p-4 font-mono text-sm">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className={`flex transition-opacity duration-300 ${index < visibleLines ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-zinc-600 w-6 text-right mr-4">{index + 1}</span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
        </div>
        {visibleLines >= codeLines.length && (
          <div className="border-t border-zinc-700/50 bg-zinc-800/30 p-4">
            <div className="text-xs text-zinc-500 mb-2">Output:</div>
            <div className="text-green-400 font-mono text-sm">
              <span className="text-zinc-500">{'>'}</span> [0, 1]
              <span className="text-xs text-zinc-500 ml-2">✓ Accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            CodeX
          </div>
          <div className="flex items-center gap-6">
            <Link to="/roadmap" className="text-zinc-400 hover:text-white transition-colors text-sm">Roadmap</Link>
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">Login</Link>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-sm font-medium flex items-center gap-2">
              Get Started <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-zinc-300">AI-Powered Learning Platform</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Master </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Algorithms</span>
                <br />
                <span className="text-white">Like a Pro</span>
              </h1>
              
              <p className="text-lg text-zinc-400 mb-8 max-w-lg">
                500+ curated problems, real-time visualizations, AI hints, and collaborative coding rooms.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-medium flex items-center gap-2">
                  <Play className="w-5 h-5" /> Start Learning Free
                </Link>
                <Link to="/problems" className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium flex items-center gap-2">
                  <Terminal className="w-5 h-5" /> Browse Problems
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> No credit card</span>
                <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-purple-500" /> 50K+ users</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <AnimatedCodeBlock />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl">
            {[
              { value: '500+', label: 'Problems' },
              { value: '50K+', label: 'Users' },
              { value: '1M+', label: 'Solutions' },
              { value: '95%', label: 'Success Rate' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-zinc-400">A complete platform to take you from beginner to interview-ready</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: 'Real-Time Visualization', desc: 'Watch algorithms execute step-by-step', color: 'from-purple-500 to-pink-500' },
              { icon: Brain, title: 'AI-Powered Hints', desc: 'Get progressive hints when stuck', color: 'from-cyan-500 to-blue-500' },
              { icon: Users, title: 'Collaborative Rooms', desc: 'Code together in real-time', color: 'from-green-500 to-emerald-500' },
              { icon: Trophy, title: 'Global Leaderboard', desc: 'Compete with developers worldwide', color: 'from-yellow-500 to-orange-500' },
              { icon: BarChart, title: 'Progress Analytics', desc: 'Track your learning journey', color: 'from-pink-500 to-rose-500' },
              { icon: Code, title: 'Multi-Language', desc: 'JS, Python, Java, C++, Go', color: 'from-indigo-500 to-purple-500' }
            ].map((feature) => (
              <div key={feature.title} className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Problem Categories</h2>
            <p className="text-zinc-400">Comprehensive coverage of all essential DSA topics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                Data Structures
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Arrays & Strings', count: 85 },
                  { name: 'Linked Lists', count: 42 },
                  { name: 'Trees & BST', count: 67 },
                  { name: 'Graphs', count: 54 },
                  { name: 'Hash Tables', count: 45 },
                  { name: 'Heaps', count: 32 }
                ].map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                    <span className="text-zinc-300">{topic.name}</span>
                    <span className="text-zinc-500 text-sm">{topic.count} problems</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Algorithms
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Dynamic Programming', count: 72 },
                  { name: 'Recursion & Backtracking', count: 56 },
                  { name: 'Sorting & Searching', count: 48 },
                  { name: 'Greedy', count: 41 },
                  { name: 'Sliding Window', count: 33 },
                  { name: 'Two Pointers', count: 37 }
                ].map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                    <span className="text-zinc-300">{topic.name}</span>
                    <span className="text-zinc-500 text-sm">{topic.count} problems</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-zinc-400">Your path from beginner to interview-ready</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Target, title: 'Choose Problem', desc: 'Browse by topic or difficulty' },
              { step: '02', icon: Code, title: 'Code & Visualize', desc: 'Watch your algorithm run' },
              { step: '03', icon: Brain, title: 'Get AI Help', desc: 'Progressive hints when stuck' },
              { step: '04', icon: TrendingUp, title: 'Track Progress', desc: 'Earn XP and level up' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-bold text-zinc-900 mb-4">{item.step}</div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Interview Success</h2>
            <p className="text-zinc-400">Our users land offers at top tech companies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '95%', label: 'Success Rate', sub: 'Users with 100+ problems' },
              { value: '$150K', label: 'Avg Salary', sub: 'FAANG offers' },
              { value: '3 mo', label: 'Prep Time', sub: 'Beginner to ready' }
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-zinc-500">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-6">Companies Our Users Work At</h3>
            <div className="flex flex-wrap justify-center gap-8 text-zinc-400">
              {['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix', 'Uber', 'Airbnb'].map(company => (
                <span key={company} className="hover:text-white transition-colors">{company}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Level Up?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-8">Join 50,000+ developers mastering algorithms</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-medium flex items-center gap-2">
              Create Free Account <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/problems" className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium">
              Explore Problems
            </Link>
          </div>
          <p className="text-sm text-zinc-600">No credit card required • 500+ problems • AI-powered hints</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            CodeX
          </div>
          <div className="text-zinc-600 text-sm">© 2024 CodeX Platform</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
