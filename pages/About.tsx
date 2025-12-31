import React from 'react';
import { Book, Cpu, Users, BarChart, Rocket, Database, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen text-slate-300">
      <div className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-electric to-cyber w-fit">CodeX Platform</h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          CodeX is a next-generation distributed code execution platform that combines LeetCode-style problem solving with real-time collaboration, AI assistance, and advanced code visualization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4 text-electric">
              <Cpu size={24} />
              <h2 className="text-xl font-bold text-white">AI-Powered Engine</h2>
           </div>
           <p className="mb-4">Uses OpenRouter AI to simulate code execution traces, allowing for step-by-step visualization of algorithms without a heavy backend sandbox.</p>
           <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
             <li>Dynamic Execution Tracing</li>
             <li>Big-O Complexity Analysis</li>
             <li>Progressive Hints System</li>
           </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4 text-cyber">
              <BarChart size={24} />
              <h2 className="text-xl font-bold text-white">Visualization</h2>
           </div>
           <p className="mb-4">Automatically visualizes data structures (Arrays, Trees, Graphs) and algorithm logic as your code runs.</p>
           <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
             <li>Array sorting & searching</li>
             <li>Tree traversals</li>
             <li>Graph algorithms</li>
           </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4 text-neon">
              <Database size={24} />
              <h2 className="text-xl font-bold text-white">MongoDB Backend</h2>
           </div>
           <p className="mb-4">All user data, problems, submissions, and leaderboard rankings are stored in MongoDB Atlas for persistence and scalability.</p>
           <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
             <li>Real-time leaderboard updates (every 15 min)</li>
             <li>User progress tracking</li>
             <li>Submission history</li>
           </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4 text-yellow-500">
              <Shield size={24} />
              <h2 className="text-xl font-bold text-white">Authentication</h2>
           </div>
           <p className="mb-4">Secure JWT-based authentication with bcrypt password hashing. Your data is protected and your progress is saved.</p>
           <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
             <li>JWT token authentication</li>
             <li>Bcrypt password hashing</li>
             <li>Persistent sessions</li>
           </ul>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Rocket size={20} className="text-neon" /> Getting Started</h2>
          <div className="bg-space-800 rounded-xl p-6 border border-white/5 font-mono text-sm space-y-4">
            <div>
              <p className="text-slate-500 mb-1"># Start the backend server</p>
              <p className="text-slate-300">cd server && npm install && npm start</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1"># Start the frontend (in another terminal)</p>
              <p className="text-slate-300">npm run dev</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1"># Open in browser</p>
              <p className="text-slate-300">http://localhost:5173</p>
            </div>
          </div>
        </section>

        <section>
           <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
           <div className="flex flex-wrap gap-2">
              {["React 19", "TypeScript", "Tailwind CSS", "OpenRouter AI", "Node.js", "Express", "MongoDB", "JWT", "Vite"].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-space-800 rounded-full border border-white/10 text-sm text-slate-300">
                    {tech}
                  </span>
              ))}
           </div>
        </section>

        <section>
           <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div key={idx} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-electric"></div>
                  {feature}
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default About;
