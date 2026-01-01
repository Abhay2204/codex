import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Trophy, Terminal, Target, Brain, BarChart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            CodeX
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-white text-black hover:bg-zinc-200 rounded text-sm font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master Data Structures & Algorithms
              </h1>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                A comprehensive platform with 500+ problems, real-time visualization, AI-powered hints, and collaborative coding rooms. Everything you need to ace technical interviews.
              </p>
              <div className="flex items-center gap-4 mb-12">
                <Link to="/register" className="px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded font-medium transition-colors">
                  Start Learning Free
                </Link>
                <Link to="/problems" className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 rounded font-medium transition-colors">
                  Browse Problems
                </Link>
              </div>
            </motion.div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-zinc-800">
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-zinc-500">Curated Problems</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-zinc-500">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">1M+</div>
                <div className="text-sm text-zinc-500">Solutions Submitted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-zinc-500">Interview Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: 'Real-Time Visualization',
                description: 'Watch algorithms execute step-by-step with interactive visualizations. Understand how sorting, searching, and graph algorithms work internally.',
                stats: '50+ visualizations'
              },
              {
                icon: Brain,
                title: 'AI-Powered Hints',
                description: 'Get progressive hints from our AI tutor when stuck. Learn problem-solving patterns without spoiling the solution.',
                stats: 'GPT-4 powered'
              },
              {
                icon: Users,
                title: 'Collaborative Rooms',
                description: 'Code together in real-time with video chat, shared editors, and whiteboard. Perfect for mock interviews and pair programming.',
                stats: 'Real-time sync'
              },
              {
                icon: Trophy,
                title: 'Global Leaderboard',
                description: 'Compete with developers worldwide. Track your ranking, solve rate, and compare performance across different problem categories.',
                stats: '50K+ competitors'
              },
              {
                icon: BarChart,
                title: 'Progress Analytics',
                description: 'Detailed insights into your learning journey. Track problem completion, time complexity improvements, and topic mastery.',
                stats: 'Advanced metrics'
              },
              {
                icon: Code,
                title: 'Multi-Language Support',
                description: 'Write solutions in JavaScript, Python, Java, C++, or Go. All languages supported with syntax highlighting and auto-completion.',
                stats: '5 languages'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-zinc-800 hover:border-zinc-700 rounded-lg p-6 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm mb-3 leading-relaxed">{feature.description}</p>
                <div className="text-xs text-zinc-600 font-medium">{feature.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Problem Categories</h2>
          <p className="text-zinc-400 mb-12">Comprehensive coverage of all essential data structures and algorithms</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: 'Data Structures',
                topics: [
                  { name: 'Arrays & Strings', count: 85, difficulty: 'Easy to Hard' },
                  { name: 'Linked Lists', count: 42, difficulty: 'Easy to Medium' },
                  { name: 'Stacks & Queues', count: 38, difficulty: 'Easy to Medium' },
                  { name: 'Trees & BST', count: 67, difficulty: 'Medium to Hard' },
                  { name: 'Graphs', count: 54, difficulty: 'Medium to Hard' },
                  { name: 'Hash Tables', count: 45, difficulty: 'Easy to Medium' },
                  { name: 'Heaps & Priority Queues', count: 32, difficulty: 'Medium to Hard' },
                  { name: 'Tries', count: 18, difficulty: 'Medium' }
                ]
              },
              {
                category: 'Algorithms',
                topics: [
                  { name: 'Sorting & Searching', count: 48, difficulty: 'Easy to Hard' },
                  { name: 'Dynamic Programming', count: 72, difficulty: 'Medium to Hard' },
                  { name: 'Recursion & Backtracking', count: 56, difficulty: 'Medium to Hard' },
                  { name: 'Greedy Algorithms', count: 41, difficulty: 'Medium' },
                  { name: 'Divide & Conquer', count: 29, difficulty: 'Medium to Hard' },
                  { name: 'Bit Manipulation', count: 24, difficulty: 'Easy to Medium' },
                  { name: 'Sliding Window', count: 33, difficulty: 'Easy to Medium' },
                  { name: 'Two Pointers', count: 37, difficulty: 'Easy to Medium' }
                ]
              }
            ].map((section, idx) => (
              <div key={section.category} className="border border-zinc-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-6">{section.category}</h3>
                <div className="space-y-3">
                  {section.topics.map((topic) => (
                    <div key={topic.name} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                      <div>
                        <div className="text-white font-medium">{topic.name}</div>
                        <div className="text-xs text-zinc-500">{topic.difficulty}</div>
                      </div>
                      <div className="text-zinc-400 text-sm font-medium">{topic.count} problems</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-zinc-400 mb-12">Your path from beginner to interview-ready</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: Target,
                title: 'Choose Problem',
                description: 'Browse 500+ problems organized by topic, difficulty, and company tags. Filter by your target companies.'
              },
              {
                step: '02',
                icon: Code,
                title: 'Code & Visualize',
                description: 'Write your solution in your preferred language. Watch real-time visualization of your algorithm execution.'
              },
              {
                step: '03',
                icon: Brain,
                title: 'Get AI Help',
                description: 'Stuck? Request progressive hints from AI. Get explanations of optimal approaches and time complexity analysis.'
              },
              {
                step: '04',
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Earn XP, maintain streaks, unlock achievements. See your improvement over time with detailed analytics.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-zinc-900 mb-4">{item.step}</div>
                <item.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Success */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Interview Success</h2>
          <p className="text-zinc-400 mb-12">Our users have landed offers at top tech companies</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="border border-zinc-800 rounded-lg p-8">
              <div className="text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-zinc-400">Interview Success Rate</div>
              <div className="text-xs text-zinc-600 mt-2">Among active users who completed 100+ problems</div>
            </div>
            <div className="border border-zinc-800 rounded-lg p-8">
              <div className="text-5xl font-bold text-white mb-2">$150K</div>
              <div className="text-zinc-400">Average Starting Salary</div>
              <div className="text-xs text-zinc-600 mt-2">For users who landed FAANG offers</div>
            </div>
            <div className="border border-zinc-800 rounded-lg p-8">
              <div className="text-5xl font-bold text-white mb-2">3 months</div>
              <div className="text-zinc-400">Average Prep Time</div>
              <div className="text-xs text-zinc-600 mt-2">From beginner to interview-ready</div>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Companies Our Users Work At</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-zinc-500 text-sm">
              <div>Google</div>
              <div>Meta</div>
              <div>Amazon</div>
              <div>Apple</div>
              <div>Microsoft</div>
              <div>Netflix</div>
              <div>Uber</div>
              <div>Airbnb</div>
              <div>LinkedIn</div>
              <div>Stripe</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join 50,000+ developers mastering algorithms and landing dream jobs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/register" className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded font-medium transition-colors">
              Create Free Account
            </Link>
            <Link to="/problems" className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 rounded font-medium transition-colors">
              Explore Problems
            </Link>
          </div>
          <p className="text-sm text-zinc-600">No credit card required • 500+ problems • AI-powered hints</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-xl font-bold text-white">CodeX</div>
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
