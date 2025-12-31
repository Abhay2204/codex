import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, Users, Trophy, Play, ArrowRight, Sparkles, BarChart, GitBranch, Cpu, Target, Rocket, Brain, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';

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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-space-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          style={{ y }}
          className="absolute top-20 left-10 w-72 h-72 bg-electric/20 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
          className="absolute top-40 right-20 w-96 h-96 bg-cyber/20 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '70%']) }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-neon/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber"
          >
            CodeX
          </motion.div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="px-5 py-2 bg-electric hover:bg-blue-600 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-electric/5 to-transparent pointer-events-none" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-8"
          >
            <Sparkles size={16} /> AI-Powered Code Visualization
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Code. <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Visualize.</span> Master.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The next-generation coding platform with real-time algorithm visualization, AI assistance, and collaborative learning. See your code come to life.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="px-8 py-4 bg-electric hover:bg-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 text-lg">
                Start Coding Free <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="px-8 py-4 bg-space-800 hover:bg-space-700 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center gap-2">
                <Play size={18} /> Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Code Blocks Animation */}
          <div className="mt-20 relative h-64">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-10 top-0 bg-space-800/50 backdrop-blur-sm border border-electric/20 rounded-lg p-4 text-left"
            >
              <code className="text-electric text-sm">
                <span className="text-cyan-400">function</span> <span className="text-yellow-400">binarySearch</span>()
              </code>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute right-10 top-10 bg-space-800/50 backdrop-blur-sm border border-cyber/20 rounded-lg p-4 text-left"
            >
              <code className="text-cyber text-sm">
                <span className="text-pink-400">class</span> <span className="text-yellow-400">TreeNode</span>
              </code>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-space-800/50 backdrop-blur-sm border border-neon/20 rounded-lg p-4 text-left"
            >
              <code className="text-neon text-sm">
                <span className="text-purple-400">const</span> result = <span className="text-green-400">solve</span>()
              </code>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is DSA Section - New Animated Section */}
      <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-space-900 to-space-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What are <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Data Structures & Algorithms?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              DSA is the foundation of computer science. Master them to write efficient code, ace technical interviews, and build scalable applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-2xl border border-electric/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GitBranch className="text-electric" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Data Structures</h3>
                  <p className="text-slate-400 mb-4">
                    Organized ways to store and manage data efficiently. Think of them as specialized containers for your information.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Arrays', 'Trees', 'Graphs', 'Hash Maps'].map(item => (
                      <span key={item} className="px-3 py-1 bg-electric/10 border border-electric/30 rounded-full text-electric text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-2xl border border-cyber/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyber/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cpu className="text-cyber" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Algorithms</h3>
                  <p className="text-slate-400 mb-4">
                    Step-by-step procedures to solve problems. The recipes that transform data into solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Sorting', 'Searching', 'DP', 'Recursion'].map(item => (
                      <span key={item} className="px-3 py-1 bg-cyber/10 border border-cyber/30 rounded-full text-cyber text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why DSA Matters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-neon/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Master DSA?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-neon flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-semibold mb-1">Ace Interviews</h4>
                  <p className="text-slate-400 text-sm">Top tech companies test DSA in coding interviews</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-neon flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-semibold mb-1">Write Better Code</h4>
                  <p className="text-slate-400 text-sm">Build faster, more efficient applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-neon flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-semibold mb-1">Problem Solving</h4>
                  <p className="text-slate-400 text-sm">Develop critical thinking and analytical skills</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 px-6 bg-space-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why CodeX?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to master data structures and algorithms</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Real-Time Visualization',
                description: 'Watch your algorithms execute step-by-step with beautiful animations for arrays, trees, graphs, and more.',
                color: 'electric',
                delay: 0
              },
              {
                icon: Sparkles,
                title: 'AI-Powered Hints',
                description: 'Get progressive hints from our AI tutor. Never get stuck again with personalized guidance.',
                color: 'cyber',
                delay: 0.1
              },
              {
                icon: Users,
                title: 'Collaborative Rooms',
                description: 'Code together in real-time with video chat. Perfect for interview prep and study groups.',
                color: 'neon',
                delay: 0.2
              },
              {
                icon: Trophy,
                title: 'Global Leaderboard',
                description: 'Compete with developers worldwide. Climb the ranks and showcase your skills.',
                color: 'yellow-500',
                delay: 0.3
              },
              {
                icon: BarChart,
                title: 'Progress Tracking',
                description: 'Track your streak, XP, and solved problems. Stay motivated with detailed analytics.',
                color: 'orange-500',
                delay: 0.4
              },
              {
                icon: Code,
                title: 'Multi-Language Support',
                description: 'Code in JavaScript, Python, Java, C++, or Go. Your choice, your comfort.',
                color: 'pink-500',
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`glass-panel p-8 rounded-2xl border border-white/5 hover:border-${feature.color}/30 transition-all group cursor-pointer`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className={`text-${feature.color}`} size={28} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Approach - Step by Step */}
      <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-space-800/50 to-space-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber">Learning Approach</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A proven methodology to take you from beginner to expert
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric via-cyber to-neon hidden md:block" />

            {[
              {
                icon: Target,
                title: 'Choose Your Path',
                description: 'Browse curated problems organized by topic and difficulty. Start with fundamentals or jump to advanced concepts.',
                color: 'electric',
                position: 'left'
              },
              {
                icon: Code,
                title: 'Code & Visualize',
                description: 'Write your solution in your preferred language. Watch it execute with real-time data structure visualization.',
                color: 'cyber',
                position: 'right'
              },
              {
                icon: Brain,
                title: 'Get AI Guidance',
                description: 'Stuck? Our AI tutor provides progressive hints without spoiling the solution. Learn at your own pace.',
                color: 'neon',
                position: 'left'
              },
              {
                icon: Rocket,
                title: 'Track & Compete',
                description: 'Earn XP, maintain streaks, climb the leaderboard. Turn learning into an engaging journey.',
                color: 'yellow-500',
                position: 'right'
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: step.position === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-8 mb-16 ${step.position === 'right' ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${step.position === 'right' ? 'md:text-right' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-${step.color}/30 transition-all"
                  >
                    <div className={`flex items-center gap-4 mb-4 ${step.position === 'right' ? 'md:justify-end' : ''}`}>
                      <div className={`w-12 h-12 bg-${step.color}/20 rounded-xl flex items-center justify-center`}>
                        <step.icon className={`text-${step.color}`} size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-lg">{step.description}</p>
                  </motion.div>
                </div>
                
                <div className="hidden md:flex w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/5 rounded-full items-center justify-center border-2 border-${step.color}/30 flex-shrink-0 relative z-10">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'DSA Problems', color: 'electric' },
              { number: '50K+', label: 'Active Users', color: 'cyber' },
              { number: '1M+', label: 'Solutions Submitted', color: 'neon' },
              { number: '95%', label: 'Interview Success', color: 'yellow-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${stat.color} to-${stat.color}/50 mb-2`}
                >
                  {stat.number}
                </motion.div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Three simple steps to level up your coding skills</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Choose a Problem', desc: 'Browse our curated collection of DSA problems organized by topic and difficulty.', color: 'electric' },
              { num: 2, title: 'Write & Visualize', desc: 'Code your solution and watch it execute with real-time data structure visualization.', color: 'cyber' },
              { num: 3, title: 'Learn & Compete', desc: 'Get AI feedback, earn XP, climb the leaderboard, and master algorithms.', color: 'neon' }
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg shadow-${step.color}/30`}
                >
                  {step.num}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Topics Preview */}
      <AnimatedSection className="py-20 px-6 bg-space-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Master Every Topic</h2>
            <p className="text-slate-400">Comprehensive curriculum covering all essential DSA concepts</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Stacks', 'Queues', 'Hash Tables', 'Heaps', 'Sorting', 'Searching', 'Recursion'].map((topic, index) => (
              <motion.span 
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-5 py-2.5 bg-space-800 border border-white/10 rounded-full text-slate-300 hover:border-electric/50 hover:text-white transition-all cursor-pointer"
              >
                {topic}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-electric/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Level Up?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 mb-10"
          >
            Join thousands of developers mastering algorithms with CodeX
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-electric hover:bg-blue-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all">
              Create Free Account <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

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
