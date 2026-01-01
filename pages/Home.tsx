import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, Users, Trophy, Play, ArrowRight, Sparkles, BarChart, GitBranch, Cpu, Target, Rocket, Brain, CheckCircle, Terminal, Layers, Flame, Star, TrendingUp, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

// Animated Section Component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <section className={className}>
      {children}
    </section>
  );
};

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Particles configuration
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(() => ({
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ['#3b82f6', '#8b5cf6', '#06b6d4'],
      },
      links: {
        color: '#3b82f6',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none' as const,
        random: false,
        straight: false,
        outModes: {
          default: 'bounce' as const,
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <div className="min-h-screen bg-space-900 overflow-hidden relative">
      {/* Particles Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          id="tsparticles"
          options={particlesOptions}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-electric/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-cyber/30 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-neon/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-space-900/60 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon">
              CodeX
            </span>
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="px-6 py-2.5 bg-gradient-to-r from-electric to-cyber hover:from-blue-600 hover:to-purple-600 rounded-lg text-white text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all">
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Explosive Entry */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-electric/20 to-cyber/20 border border-electric/30 rounded-full text-electric text-sm font-semibold mb-8 backdrop-blur-sm"
          >
            <Sparkles size={18} className="animate-pulse" /> 
            <span>AI-Powered Visualization Platform</span>
            <Flame size={18} className="text-orange-500 animate-pulse" />
          </motion.div>
          
          {/* Main Heading with Typing Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-electric to-cyber bg-[length:200%_auto]"
              >
                Master DSA
              </motion.span>
              <br />
              <TypeAnimation
                sequence={[
                  'Visualize Code',
                  2000,
                  'Ace Interviews',
                  2000,
                  'Build Skills',
                  2000,
                  'Compete Globally',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon"
                repeat={Infinity}
              />
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Experience algorithms like never before with{' '}
            <span className="text-electric font-semibold">real-time visualization</span>,{' '}
            <span className="text-cyber font-semibold">AI guidance</span>, and{' '}
            <span className="text-neon font-semibold">collaborative learning</span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.08, boxShadow: "0 20px 60px rgba(59, 130, 246, 0.4)" }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className="group px-10 py-5 bg-gradient-to-r from-electric to-cyber hover:from-blue-600 hover:to-purple-600 rounded-2xl text-white font-bold shadow-2xl shadow-blue-500/40 transition-all flex items-center gap-3 text-lg">
                Start Coding Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={22} />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.8)" }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/problems" className="px-10 py-5 bg-space-800/50 hover:bg-space-700/50 border-2 border-white/20 backdrop-blur-sm rounded-2xl text-white font-semibold transition-all flex items-center gap-3">
                <Play size={20} /> Explore Problems
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Interactive Code Cards */}
          <div className="relative h-80 mt-20">
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.15, rotate: 15, zIndex: 50 }}
              className="absolute left-[5%] top-10 bg-gradient-to-br from-space-800/90 to-space-900/90 backdrop-blur-xl border border-electric/40 rounded-2xl p-6 shadow-2xl shadow-electric/20 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <code className="text-electric text-sm font-mono block">
                <span className="text-cyan-400">function</span>{' '}
                <span className="text-yellow-400">quickSort</span>
                <span className="text-slate-400">(arr) {'{'}</span>
                <br />
                <span className="text-slate-400 ml-4">// O(n log n)</span>
                <br />
                <span className="text-slate-400">{'}'}</span>
              </code>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 35, 0],
                rotate: [0, -8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              whileHover={{ scale: 1.15, rotate: -15, zIndex: 50 }}
              className="absolute right-[8%] top-0 bg-gradient-to-br from-space-800/90 to-space-900/90 backdrop-blur-xl border border-cyber/40 rounded-2xl p-6 shadow-2xl shadow-cyber/20 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <code className="text-cyber text-sm font-mono block">
                <span className="text-pink-400">class</span>{' '}
                <span className="text-yellow-400">BinaryTree</span>{' '}
                <span className="text-slate-400">{'{'}</span>
                <br />
                <span className="text-slate-400 ml-4">traverse() {'{'}</span>
                <br />
                <span className="text-slate-400 ml-4">{'}'}</span>
                <br />
                <span className="text-slate-400">{'}'}</span>
              </code>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              whileHover={{ scale: 1.15, rotate: 10, zIndex: 50 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-10 bg-gradient-to-br from-space-800/90 to-space-900/90 backdrop-blur-xl border border-neon/40 rounded-2xl p-6 shadow-2xl shadow-neon/20 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <code className="text-neon text-sm font-mono block">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-white">result</span> ={' '}
                <span className="text-green-400">dfs</span>
                <span className="text-slate-400">(graph)</span>
                <br />
                <span className="text-slate-400">// Depth First Search</span>
              </code>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ 
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              whileHover={{ scale: 1.15, rotate: -10, zIndex: 50 }}
              className="absolute right-[25%] bottom-20 bg-gradient-to-br from-space-800/90 to-space-900/90 backdrop-blur-xl border border-yellow-500/40 rounded-2xl p-6 shadow-2xl shadow-yellow-500/20 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <code className="text-yellow-400 text-sm font-mono block">
                <span className="text-orange-400">dp</span>
                <span className="text-slate-400">[i] = </span>
                <span className="text-green-400">min</span>
                <span className="text-slate-400">(dp[i-1])</span>
                <br />
                <span className="text-slate-400">// Dynamic Programming</span>
              </code>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explosive Stats Section */}
      <AnimatedSection className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '500+', label: 'DSA Problems', icon: Code, color: 'from-electric to-blue-600' },
              { number: '50K+', label: 'Active Coders', icon: Users, color: 'from-cyber to-purple-600' },
              { number: '1M+', label: 'Solutions', icon: Terminal, color: 'from-neon to-green-600' },
              { number: '95%', label: 'Success Rate', icon: Trophy, color: 'from-yellow-500 to-orange-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" 
                     style={{ background: `linear-gradient(135deg, ${stat.color})` }} 
                />
                <div className="relative glass-panel p-8 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-white/50 group-hover:text-white transition-colors" />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-slate-400 font-semibold group-hover:text-white transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* What is DSA - Interactive Cards */}
      <AnimatedSection className="py-32 px-6 bg-gradient-to-b from-transparent via-space-800/30 to-transparent relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              What is{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon bg-[length:200%_auto]">
                DSA?
              </span>
            </motion.h2>
            <p className="text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              The secret weapon of top developers worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric/30 to-blue-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative glass-panel p-10 rounded-3xl border-2 border-electric/30 group-hover:border-electric/60 transition-all backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-electric to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-electric/50"
                  >
                    <Layers className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white">Data Structures</h3>
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  Organized ways to store and manage data efficiently. The building blocks of every application.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Arrays', 'Trees', 'Graphs', 'Hash Maps', 'Stacks', 'Queues'].map((item, i) => (
                    <motion.span 
                      key={item}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.15, y: -5 }}
                      className="px-4 py-2 bg-electric/20 border border-electric/40 rounded-xl text-electric font-semibold text-sm backdrop-blur-sm cursor-pointer"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber/30 to-purple-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative glass-panel p-10 rounded-3xl border-2 border-cyber/30 group-hover:border-cyber/60 transition-all backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyber to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyber/50"
                  >
                    <Cpu className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white">Algorithms</h3>
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  Step-by-step procedures to solve problems. The recipes that transform data into solutions.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Sorting', 'Searching', 'Dynamic Programming', 'Recursion', 'Greedy', 'Backtracking'].map((item, i) => (
                    <motion.span 
                      key={item}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.15, y: -5 }}
                      className="px-4 py-2 bg-cyber/20 border border-cyber/40 rounded-xl text-cyber font-semibold text-sm backdrop-blur-sm cursor-pointer"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why DSA Matters - Animated Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-green-600/10 rounded-3xl blur-2xl" />
            <div className="relative glass-panel p-12 rounded-3xl border-2 border-neon/30 backdrop-blur-xl">
              <h3 className="text-4xl font-black text-white mb-10 text-center">
                Why Master <span className="text-neon">DSA?</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Trophy, title: 'Ace Interviews', desc: 'FAANG companies test DSA in every coding interview', color: 'neon' },
                  { icon: Rocket, title: 'Build Better', desc: 'Write faster, more efficient, and scalable code', color: 'electric' },
                  { icon: Brain, title: 'Think Smarter', desc: 'Develop problem-solving and analytical skills', color: 'cyber' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 bg-gradient-to-br from-${item.color} to-${item.color}/50 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${item.color}/50 group-hover:shadow-2xl group-hover:shadow-${item.color}/70 transition-all`}
                    >
                      <item.icon className="text-white" size={36} />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-neon transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-lg group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features - 3D Card Grid */}
      <AnimatedSection className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Supercharge Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Learning</span>
            </h2>
            <p className="text-2xl text-slate-400 max-w-3xl mx-auto">
              Everything you need to become a DSA master
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Real-Time Visualization',
                description: 'Watch algorithms execute step-by-step with stunning 3D animations',
                color: 'electric',
                gradient: 'from-electric to-blue-600'
              },
              {
                icon: Sparkles,
                title: 'AI-Powered Hints',
                description: 'Get progressive hints from our AI tutor without spoiling solutions',
                color: 'cyber',
                gradient: 'from-cyber to-purple-600'
              },
              {
                icon: Users,
                title: 'Collaborative Rooms',
                description: 'Code together in real-time with video chat and shared editors',
                color: 'neon',
                gradient: 'from-neon to-green-600'
              },
              {
                icon: Trophy,
                title: 'Global Leaderboard',
                description: 'Compete with developers worldwide and climb the ranks',
                color: 'yellow-500',
                gradient: 'from-yellow-500 to-orange-600'
              },
              {
                icon: BarChart,
                title: 'Progress Tracking',
                description: 'Track streaks, XP, and achievements with detailed analytics',
                color: 'orange-500',
                gradient: 'from-orange-500 to-red-600'
              },
              {
                icon: Code,
                title: 'Multi-Language',
                description: 'Code in JavaScript, Python, Java, C++, or Go',
                color: 'pink-500',
                gradient: 'from-pink-500 to-rose-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  z: 50
                }}
                className="relative group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-all duration-500`} />
                <div className="relative glass-panel p-8 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all backdrop-blur-xl h-full">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all`}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.gradient} transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-lg group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Learning Path - Timeline */}
      <AnimatedSection className="py-32 px-6 bg-gradient-to-b from-transparent via-space-800/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon">Journey</span>
            </h2>
            <p className="text-2xl text-slate-400 max-w-3xl mx-auto">
              From beginner to expert in 4 simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric via-cyber to-neon origin-top hidden md:block"
            />

            {[
              {
                icon: Target,
                title: 'Choose Your Path',
                description: 'Browse 500+ curated problems organized by topic and difficulty. Start with fundamentals or jump to advanced concepts.',
                color: 'electric',
                position: 'left'
              },
              {
                icon: Code,
                title: 'Code & Visualize',
                description: 'Write your solution and watch it execute with real-time 3D visualization. See every step of your algorithm.',
                color: 'cyber',
                position: 'right'
              },
              {
                icon: Brain,
                title: 'Get AI Guidance',
                description: 'Stuck? Our AI tutor provides progressive hints and explanations. Learn at your own pace without spoilers.',
                color: 'neon',
                position: 'left'
              },
              {
                icon: Rocket,
                title: 'Track & Compete',
                description: 'Earn XP, maintain streaks, unlock achievements, and climb the global leaderboard. Make learning addictive.',
                color: 'yellow-500',
                position: 'right'
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: step.position === 'left' ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-8 mb-20 ${step.position === 'right' ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${step.position === 'right' ? 'md:text-right' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: step.position === 'left' ? 5 : -5 }}
                    className="relative group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}/20 to-${step.color}/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all`} />
                    <div className="relative glass-panel p-10 rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-all backdrop-blur-xl">
                      <div className={`flex items-center gap-6 mb-6 ${step.position === 'right' ? 'md:justify-end' : ''}`}>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 bg-gradient-to-br from-${step.color} to-${step.color}/50 rounded-2xl flex items-center justify-center shadow-lg shadow-${step.color}/50`}
                        >
                          <step.icon className="text-white" size={32} />
                        </motion.div>
                        <h3 className="text-3xl font-black text-white">{step.title}</h3>
                      </div>
                      <p className="text-slate-300 text-xl leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`hidden md:flex w-20 h-20 bg-gradient-to-br from-${step.color} to-${step.color}/50 rounded-full items-center justify-center border-4 border-space-900 flex-shrink-0 relative z-10 shadow-2xl shadow-${step.color}/50`}
                >
                  <span className="text-3xl font-black text-white">{index + 1}</span>
                </motion.div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Topics Cloud - Interactive */}
      <AnimatedSection className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Master <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Every Topic</span>
            </h2>
            <p className="text-2xl text-slate-400">
              Comprehensive curriculum covering all essential concepts
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              'Arrays', 'Linked Lists', 'Binary Trees', 'Graphs', 'Dynamic Programming', 
              'Stacks', 'Queues', 'Hash Tables', 'Heaps', 'Sorting Algorithms', 
              'Searching', 'Recursion', 'Backtracking', 'Greedy', 'Bit Manipulation', 
              'Tries', 'Segment Trees', 'Sliding Window'
            ].map((topic, index) => (
              <motion.span 
                key={topic}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                  borderColor: "rgba(59, 130, 246, 0.8)"
                }}
                className="px-6 py-3 bg-gradient-to-br from-space-800 to-space-900 border-2 border-white/20 rounded-2xl text-slate-300 hover:text-white hover:border-electric transition-all cursor-pointer font-semibold backdrop-blur-sm"
              >
                {topic}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA - Explosive */}
      <AnimatedSection className="py-32 px-6 relative overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-t from-electric/20 via-cyber/20 to-neon/20 blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-6xl md:text-8xl font-black text-white mb-8"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Ready to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon bg-[length:200%_auto]">
                Dominate?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-slate-300 mb-12 leading-relaxed"
            >
              Join <span className="text-electric font-bold">50,000+</span> developers mastering algorithms
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.1, boxShadow: "0 30px 80px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-electric via-cyber to-neon hover:from-blue-600 hover:via-purple-600 hover:to-green-600 rounded-2xl text-white font-black text-2xl shadow-2xl shadow-blue-500/50 transition-all">
                Start Free Now
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Rocket size={32} />
                </motion.div>
              </Link>
            </motion.div>
            <p className="text-slate-500 mt-8 text-lg">No credit card required • 500+ problems • AI-powered</p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-black"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric via-cyber to-neon">
                CodeX
              </span>
            </motion.div>
            <div className="flex items-center gap-8 text-slate-400">
              <motion.a whileHover={{ scale: 1.1, color: '#fff' }} href="#" className="hover:text-white transition-colors font-medium">
                Privacy
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, color: '#fff' }} href="#" className="hover:text-white transition-colors font-medium">
                Terms
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, color: '#fff' }} href="#" className="hover:text-white transition-colors font-medium">
                Contact
              </motion.a>
            </div>
          </div>
          <div className="text-center text-slate-500">
            <p className="text-lg">© 2024 CodeX Platform. Built for developers, by developers.</p>
            <p className="text-sm mt-2">Empowering the next generation of software engineers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
