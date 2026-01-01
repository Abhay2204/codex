import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Trophy, Terminal, Target, Brain, BarChart, TrendingUp, Zap, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated code lines for hero
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

// Floating particles component
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * 800,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Animated typing code block
const AnimatedCodeBlock: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines(prev => (prev < codeLines.length ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(lineInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-2xl blur-xl" />
      
      <div className="relative bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 ml-2 font-mono">solution.js</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Running
            </span>
          </div>
        </div>
        
        {/* Code content */}
        <div className="p-4 font-mono text-sm">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index < visibleLines ? 1 : 0,
                x: index < visibleLines ? 0 : -20
              }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <span className="text-zinc-600 w-6 text-right mr-4 select-none">{index + 1}</span>
              <span className={line.color}>{line.text}</span>
              {index === visibleLines - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-5 bg-white/80 ml-1"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Output section */}
        <AnimatePresence>
          {visibleLines >= codeLines.length && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-zinc-700/50 bg-zinc-800/30 p-4"
            >
              <div className="text-xs text-zinc-500 mb-2">Output:</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-green-400 font-mono text-sm flex items-center gap-2"
              >
                <span className="text-zinc-500">{'>'}</span>
                [0, 1]
                <span className="text-xs text-zinc-500 ml-2">✓ Accepted - Runtime: 52ms</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Animated counter
const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-zinc-500 mt-1">{label}</div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
      </div>

      <FloatingParticles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-white flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            CodeX
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <Link to="/roadmap" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Roadmap
            </Link>
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Login
            </Link>
            <Link to="/register" className="group px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
              Get Started
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6"
                >
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-zinc-300">AI-Powered Learning Platform</span>
                  <span className="px-2 py-0.5 bg-purple-500/20 rounded-full text-xs text-purple-300">New</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
                  <span className="text-white">Master </span>
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Algorithms
                  </span>
                  <br />
                  <span className="text-white">Like a Pro</span>
                </h1>
                
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-lg">
                  500+ curated problems, real-time visualizations, AI hints, and collaborative coding rooms. 
                  Your complete toolkit for acing technical interviews.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                  <Link to="/register" className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Learning Free
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                    />
                  </Link>
                  <Link to="/problems" className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50 rounded-xl font-medium transition-all flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Browse Problems
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-6 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <span>50K+ users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-cyan-500" />
                    <span>AI-powered</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Animated code block */}
            <div className="hidden lg:block">
              <AnimatedCodeBlock />
            </div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl"
          >
            <AnimatedCounter value="500+" label="Curated Problems" />
            <AnimatedCounter value="50K+" label="Active Users" />
            <AnimatedCounter value="1M+" label="Solutions Submitted" />
            <AnimatedCounter value="95%" label="Interview Success" />
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A complete platform designed to take you from beginner to interview-ready
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Terminal,
                title: 'Real-Time Visualization',
                description: 'Watch algorithms execute step-by-step. Understand sorting, searching, and graph algorithms visually.',
                gradient: 'from-purple-500 to-pink-500',
                stats: '50+ visualizations'
              },
              {
                icon: Brain,
                title: 'AI-Powered Hints',
                description: 'Get progressive hints when stuck. Learn patterns without spoiling solutions.',
                gradient: 'from-cyan-500 to-blue-500',
                stats: 'GPT-4 powered'
              },
              {
                icon: Users,
                title: 'Collaborative Rooms',
                description: 'Code together in real-time with video chat and shared editors.',
                gradient: 'from-green-500 to-emerald-500',
                stats: 'Real-time sync'
              },
              {
                icon: Trophy,
                title: 'Global Leaderboard',
                description: 'Compete worldwide. Track ranking and compare performance.',
                gradient: 'from-yellow-500 to-orange-500',
                stats: '50K+ competitors'
              },
              {
                icon: BarChart,
                title: 'Progress Analytics',
                description: 'Detailed insights into your learning journey and topic mastery.',
                gradient: 'from-pink-500 to-rose-500',
                stats: 'Advanced metrics'
              },
              {
                icon: Code,
                title: 'Multi-Language',
                description: 'JavaScript, Python, Java, C++, Go with syntax highlighting.',
                gradient: 'from-indigo-500 to-purple-500',
                stats: '5 languages'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700 rounded-2xl p-6 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm mb-3 leading-relaxed">{feature.description}</p>
                <div className="text-xs text-zinc-600 font-medium">{feature.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Problem Categories</h2>
            <p className="text-zinc-400">Comprehensive coverage of all essential DSA topics</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: 'Data Structures',
                topics: [
                  { name: 'Arrays & Strings', count: 85 },
                  { name: 'Linked Lists', count: 42 },
                  { name: 'Trees & BST', count: 67 },
                  { name: 'Graphs', count: 54 },
                  { name: 'Hash Tables', count: 45 },
                  { name: 'Heaps', count: 32 },
                ]
              },
              {
                category: 'Algorithms',
                topics: [
                  { name: 'Dynamic Programming', count: 72 },
                  { name: 'Recursion & Backtracking', count: 56 },
                  { name: 'Sorting & Searching', count: 48 },
                  { name: 'Greedy', count: 41 },
                  { name: 'Sliding Window', count: 33 },
                  { name: 'Two Pointers', count: 37 },
                ]
              }
            ].map((section, idx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-purple-500' : 'bg-cyan-500'}`} />
                  {section.category}
                </h3>
                <div className="space-y-3">
                  {section.topics.map((topic) => (
                    <div key={topic.name} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                      <span className="text-zinc-300">{topic.name}</span>
                      <span className="text-zinc-500 text-sm">{topic.count} problems</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-zinc-400">Your path from beginner to interview-ready</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Target, title: 'Choose Problem', description: 'Browse 500+ problems by topic, difficulty, or company' },
              { step: '02', icon: Code, title: 'Code & Visualize', description: 'Write solutions and watch real-time algorithm visualization' },
              { step: '03', icon: Brain, title: 'Get AI Help', description: 'Request progressive hints and complexity analysis' },
              { step: '04', icon: TrendingUp, title: 'Track Progress', description: 'Earn XP, maintain streaks, unlock achievements' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="text-7xl font-bold text-zinc-900 mb-4">{item.step}</div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 px-6 bg-gradient-to-b from-zinc-900/50 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Interview Success</h2>
            <p className="text-zinc-400">Our users land offers at top tech companies</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '95%', label: 'Interview Success Rate', sub: 'Among users with 100+ problems' },
              { value: '$150K', label: 'Average Starting Salary', sub: 'For FAANG offers' },
              { value: '3 mo', label: 'Average Prep Time', sub: 'Beginner to interview-ready' }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-zinc-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Companies Our Users Work At</h3>
            <div className="flex flex-wrap justify-center gap-8 text-zinc-400">
              {['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix', 'Uber', 'Airbnb', 'LinkedIn', 'Stripe'].map(company => (
                <span key={company} className="hover:text-white transition-colors">{company}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Level Up?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join 50,000+ developers mastering algorithms and landing dream jobs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/register" className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2">
                Create Free Account
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/problems" className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium transition-colors">
                Explore Problems
              </Link>
            </div>
            <p className="text-sm text-zinc-600">No credit card required • 500+ problems • AI-powered hints</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              CodeX
            </div>
            <div className="flex items-center gap-8 text-zinc-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center text-zinc-600 text-sm">
            © 2024 CodeX Platform. Built for developers, by developers.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
