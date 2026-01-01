import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Trophy, Terminal, Brain, BarChart, Zap, ChevronRight, Play, Medal } from 'lucide-react';
import { api } from '../services/api';

interface Stats {
  problems: number;
  users: number;
  submissions: number;
  categories: Record<string, number>;
}

interface LeaderboardUser {
  _id: string;
  name: string;
  xp: number;
  solved: number;
  rank: number;
}

const codeLines = [
  { text: 'function twoSum(nums, target) {', color: '#c084fc' },
  { text: '  const map = new Map();', color: '#60a5fa' },
  { text: '  for (let i = 0; i < nums.length; i++) {', color: '#facc15' },
  { text: '    const complement = target - nums[i];', color: '#4ade80' },
  { text: '    if (map.has(complement)) {', color: '#f472b6' },
  { text: '      return [map.get(complement), i];', color: '#22d3ee' },
  { text: '    }', color: '#f472b6' },
  { text: '    map.set(nums[i], i);', color: '#fb923c' },
  { text: '  }', color: '#facc15' },
  { text: '}', color: '#c084fc' },
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
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: '-16px',
        background: 'linear-gradient(to right, rgba(168,85,247,0.2), rgba(34,211,238,0.2))',
        borderRadius: '16px', filter: 'blur(24px)'
      }} />
      <div style={{
        position: 'relative', background: 'rgba(24,24,27,0.95)',
        border: '1px solid rgba(63,63,70,0.5)', borderRadius: '12px', overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
          background: 'rgba(39,39,42,0.5)', borderBottom: '1px solid rgba(63,63,70,0.5)'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#71717a', marginLeft: '8px', fontFamily: 'monospace' }}>solution.js</span>
        </div>
        <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
          {codeLines.map((line, index) => (
            <div key={index} style={{ display: 'flex', opacity: index < visibleLines ? 1 : 0, transition: 'opacity 0.3s' }}>
              <span style={{ color: '#52525b', width: '24px', textAlign: 'right', marginRight: '16px' }}>{index + 1}</span>
              <span style={{ color: line.color }}>{line.text}</span>
            </div>
          ))}
        </div>
        {visibleLines >= codeLines.length && (
          <div style={{ borderTop: '1px solid rgba(63,63,70,0.5)', background: 'rgba(39,39,42,0.3)', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>Output:</div>
            <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '14px' }}>
              <span style={{ color: '#71717a' }}>{'>'}</span> [0, 1]
              <span style={{ fontSize: '12px', color: '#71717a', marginLeft: '8px' }}>✓ Accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, leaderboardData] = await Promise.all([
          api.getStats(),
          api.getLeaderboard()
        ]);
        setStats(statsData);
        setLeaderboard(leaderboardData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(39,39,42,0.5)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 'bold' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #a855f7, #22d3ee)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code style={{ width: '20px', height: '20px', color: '#fff' }} />
            </div>
            CodeX
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/roadmap" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px' }}>Roadmap</Link>
            <Link to="/login" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
            <Link to="/register" style={{ padding: '8px 20px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Get Started <ChevronRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '128px', paddingBottom: '80px', padding: '128px 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '9999px', marginBottom: '24px' }}>
                <Zap style={{ width: '16px', height: '16px', color: '#c084fc' }} />
                <span style={{ fontSize: '14px', color: '#d4d4d8' }}>AI-Powered Learning Platform</span>
              </div>

              <h1 style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
                <span style={{ color: '#fff' }}>Master </span>
                <span style={{ background: 'linear-gradient(to right, #c084fc, #f472b6, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Algorithms</span>
                <br />
                <span style={{ color: '#fff' }}>Like a Pro</span>
              </h1>
              
              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px', maxWidth: '500px', lineHeight: 1.6 }}>
                Curated problems, real-time visualizations, AI hints, and collaborative coding rooms.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <Link to="/register" style={{ padding: '16px 32px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', borderRadius: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
                  <Play style={{ width: '20px', height: '20px' }} /> Start Learning Free
                </Link>
                <Link to="/login" style={{ padding: '16px 32px', border: '1px solid #3f3f46', borderRadius: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', background: 'transparent' }}>
                  <Terminal style={{ width: '20px', height: '20px' }} /> Browse Problems
                </Link>
              </div>
            </div>

            <div>
              <AnimatedCodeBlock />
            </div>
          </div>

          {/* Real Stats */}
          <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: stats?.problems || 0, label: 'Problems', icon: Code },
              { value: stats?.users || 0, label: 'Users', icon: Users },
              { value: stats?.submissions || 0, label: 'Submissions', icon: BarChart },
              { value: leaderboard.length > 0 ? leaderboard[0].xp : 0, label: 'Top XP', icon: Trophy }
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <stat.icon style={{ width: '32px', height: '32px', color: '#a855f7', margin: '0 auto 12px' }} />
                <div style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(to right, #c084fc, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {loading ? '...' : formatNumber(stat.value)}
                </div>
                <div style={{ fontSize: '14px', color: '#71717a' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', background: '#09090b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Why Choose CodeX?</h2>
            <p style={{ fontSize: '18px', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto' }}>Everything you need to master algorithms and ace your interviews</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: Brain, title: 'AI-Powered Hints', desc: 'Get intelligent hints without spoiling the solution', color: '#c084fc' },
              { icon: Code, title: 'Real-Time Visualizer', desc: 'Watch algorithms come to life with step-by-step animations', color: '#22d3ee' },
              { icon: Users, title: 'Collab Rooms', desc: 'Code together with friends in real-time sessions', color: '#4ade80' },
              { icon: Trophy, title: 'Leaderboard', desc: 'Compete with others and track your progress', color: '#facc15' },
              { icon: Terminal, title: 'Multi-Language', desc: 'Practice in JavaScript, Python, Java, and more', color: '#f472b6' },
              { icon: BarChart, title: 'Progress Tracking', desc: 'Detailed analytics on your learning journey', color: '#fb923c' }
            ].map((feature) => (
              <div key={feature.title} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '32px' }}>
                <feature.icon style={{ width: '40px', height: '40px', color: feature.color, marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories Section */}
      <section style={{ padding: '80px 24px', background: '#000' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Problem Categories</h2>
            <p style={{ fontSize: '18px', color: '#a1a1aa' }}>Master every topic with our curated problem sets</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {stats?.categories && Object.entries(stats.categories).map(([category, count]) => (
              <Link to="/practice" key={category} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '20px', textDecoration: 'none', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>{category}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>{count as number}</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>problems</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '80px 24px', background: '#09090b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>How It Works</h2>
            <p style={{ fontSize: '18px', color: '#a1a1aa' }}>Start your journey in 4 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free and set up your profile' },
              { step: '02', title: 'Choose Topic', desc: 'Pick from arrays, trees, graphs, and more' },
              { step: '03', title: 'Solve Problems', desc: 'Practice with our curated problem sets' },
              { step: '04', title: 'Track Progress', desc: 'Monitor your growth and climb the ranks' }
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#a855f7', marginBottom: '16px', opacity: 0.8 }}>{item.step}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section style={{ padding: '80px 24px', background: '#000' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Top Performers</h2>
              <p style={{ fontSize: '18px', color: '#a1a1aa' }}>See who's leading the pack</p>
            </div>
            <Link to="/leaderboard" style={{ padding: '12px 24px', border: '1px solid #3f3f46', borderRadius: '8px', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All <ChevronRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
          <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', overflow: 'hidden' }}>
            {leaderboard.length > 0 ? leaderboard.map((user, index) => (
              <div key={user._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: index < leaderboard.length - 1 ? '1px solid #27272a' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: index === 0 ? 'linear-gradient(135deg, #facc15, #fb923c)' : index === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : index === 2 ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#fff' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#71717a' }}>{user.solved} problems solved</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Medal style={{ width: '20px', height: '20px', color: '#facc15' }} />
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{formatNumber(user.xp)} XP</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#71717a' }}>
                {loading ? 'Loading leaderboard...' : 'No users yet. Be the first!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(to bottom, #09090b, #000)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Ready to Level Up?</h2>
          <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px' }}>Join thousands of developers mastering algorithms every day</p>
          <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 40px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', borderRadius: '12px', fontWeight: '600', fontSize: '18px', textDecoration: 'none', color: '#fff' }}>
            Get Started Free <ChevronRight style={{ width: '20px', height: '20px' }} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', background: '#000', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #a855f7, #22d3ee)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code style={{ width: '20px', height: '20px', color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>CodeX</span>
          </div>
          <div style={{ fontSize: '14px', color: '#71717a' }}>© 2025 CodeX. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;