import React from 'react';
import { Cpu, Users, BarChart, Rocket, Database, Shield, Code } from 'lucide-react';

const About: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px'
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1024px', margin: '0 auto', minHeight: '100vh', background: '#000', color: '#d4d4d8' }}>
      <div style={{ marginBottom: '48px', borderBottom: '1px solid #27272a', paddingBottom: '32px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(to right, #a855f7, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>CodeX Platform</h1>
        <p style={{ fontSize: '18px', color: '#71717a', maxWidth: '640px', lineHeight: 1.6 }}>
          CodeX is a next-generation distributed code execution platform that combines LeetCode-style problem solving with real-time collaboration, AI assistance, and advanced code visualization.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#a855f7' }}>
            <Cpu size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>AI-Powered Engine</h2>
          </div>
          <p style={{ marginBottom: '16px', color: '#a1a1aa', lineHeight: 1.6 }}>Uses OpenRouter AI to simulate code execution traces, allowing for step-by-step visualization of algorithms without a heavy backend sandbox.</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', color: '#71717a' }}>
            <li style={{ marginBottom: '4px' }}>Dynamic Execution Tracing</li>
            <li style={{ marginBottom: '4px' }}>Big-O Complexity Analysis</li>
            <li>Progressive Hints System</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#22d3ee' }}>
            <BarChart size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Visualization</h2>
          </div>
          <p style={{ marginBottom: '16px', color: '#a1a1aa', lineHeight: 1.6 }}>Automatically visualizes data structures (Arrays, Trees, Graphs) and algorithm logic as your code runs.</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', color: '#71717a' }}>
            <li style={{ marginBottom: '4px' }}>Array sorting & searching</li>
            <li style={{ marginBottom: '4px' }}>Tree traversals</li>
            <li>Graph algorithms</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#4ade80' }}>
            <Database size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>MongoDB Backend</h2>
          </div>
          <p style={{ marginBottom: '16px', color: '#a1a1aa', lineHeight: 1.6 }}>All user data, problems, submissions, and leaderboard rankings are stored in MongoDB Atlas for persistence and scalability.</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', color: '#71717a' }}>
            <li style={{ marginBottom: '4px' }}>Real-time leaderboard updates (every 15 min)</li>
            <li style={{ marginBottom: '4px' }}>User progress tracking</li>
            <li>Submission history</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#facc15' }}>
            <Shield size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Authentication</h2>
          </div>
          <p style={{ marginBottom: '16px', color: '#a1a1aa', lineHeight: 1.6 }}>Secure JWT-based authentication with bcrypt password hashing. Your data is protected and your progress is saved.</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', color: '#71717a' }}>
            <li style={{ marginBottom: '4px' }}>JWT token authentication</li>
            <li style={{ marginBottom: '4px' }}>Bcrypt password hashing</li>
            <li>Persistent sessions</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Rocket size={20} style={{ color: '#4ade80' }} /> Getting Started
        </h2>
        <div style={{ background: '#18181b', borderRadius: '16px', padding: '24px', border: '1px solid #27272a', fontFamily: 'monospace', fontSize: '14px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#52525b', marginBottom: '4px' }}># Start the backend server</p>
            <p style={{ color: '#d4d4d8' }}>cd server && npm install && npm start</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#52525b', marginBottom: '4px' }}># Start the frontend (in another terminal)</p>
            <p style={{ color: '#d4d4d8' }}>npm run dev</p>
          </div>
          <div>
            <p style={{ color: '#52525b', marginBottom: '4px' }}># Open in browser</p>
            <p style={{ color: '#d4d4d8' }}>http://localhost:5173</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Tech Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {["React 19", "TypeScript", "Tailwind CSS", "OpenRouter AI", "Node.js", "Express", "MongoDB", "JWT", "Vite"].map(tech => (
            <span key={tech} style={{ padding: '8px 16px', background: '#18181b', borderRadius: '9999px', border: '1px solid #27272a', fontSize: '14px', color: '#d4d4d8' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            "User authentication (register/login)",
            "Real-time leaderboard with auto-refresh",
            "Problem solving with AI visualization",
            "Progress tracking and XP system",
            "Collaborative coding rooms",
            "Multi-language support",
            "Submission history",
            "AI-powered hints and analysis"
          ].map((feature, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#71717a' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }} />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
