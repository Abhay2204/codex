import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, GitBranch, Box, Network, Cpu, PlayCircle, Loader2, 
  ChevronRight, CheckCircle2, Lock, Zap, Search, Binary, 
  Hash, RotateCcw, TreeDeciduous, Route, Sparkles, Target,
  BookOpen, Code, Database, Triangle, X, Eye, ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  tags: string[];
  description?: string;
  starterCode?: string;
  examples?: { input: string; expected: string }[];
}

interface Topic {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  tags: string[];
}

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  topics: Topic[];
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Phase 1: Foundations",
    subtitle: "The Toolbox",
    description: "Master the basic tools and understand how to measure efficiency before diving into complex problems.",
    color: "from-blue-500 to-cyan-500",
    topics: [
      { id: "oop", title: "Language Basics & OOP", icon: Code, color: "text-blue-400", description: "Classes, inheritance, encapsulation, polymorphism, and design patterns.", tags: ["OOP", "Basics", "Design Pattern", "Inheritance", "Encapsulation", "Polymorphism", "Interface", "Generics", "Exception", "Functional"] },
      { id: "complexity", title: "Algorithmic Complexity", icon: Zap, color: "text-yellow-400", description: "Big-O analysis, time/space trade-offs, and complexity optimization.", tags: ["Complexity", "Big-O", "Analysis", "Amortized"] },
      { id: "arrays", title: "Arrays & Strings", icon: Layers, color: "text-green-400", description: "Two pointers, prefix sums, matrix operations, and string manipulation.", tags: ["Array", "String", "Matrix", "Prefix Sum", "Two Pointers"] },
      { id: "linkedlist", title: "Linked Lists", icon: GitBranch, color: "text-purple-400", description: "Singly, doubly linked lists, fast/slow pointers, and cycle detection.", tags: ["Linked List", "Fast Slow"] },
      { id: "stacks-queues", title: "Stacks & Queues", icon: Box, color: "text-pink-400", description: "LIFO/FIFO principles, monotonic stacks, and circular queues.", tags: ["Stack", "Queue", "Monotonic Stack", "Design"] }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Intermediate",
    subtitle: "Core Logic",
    description: "Learn techniques that organize and retrieve data more efficiently.",
    color: "from-purple-500 to-pink-500",
    topics: [
      { id: "searching", title: "Searching Algorithms", icon: Search, color: "text-blue-400", description: "Master O(log n) search patterns and boundary conditions.", tags: ["Binary Search", "Search"] },
      { id: "sorting", title: "Sorting Algorithms", icon: Triangle, color: "text-orange-400", description: "Divide and conquer, efficient data reordering.", tags: ["Sorting", "Divide and Conquer", "QuickSelect", "Cyclic Sort"] },
      { id: "hashing", title: "Hash Tables", icon: Hash, color: "text-cyan-400", description: "O(1) lookups, frequency counting, and key-value mapping.", tags: ["Hash Table", "HashMap", "Design", "Prefix Sum"] },
      { id: "recursion", title: "Recursion & Backtracking", icon: RotateCcw, color: "text-yellow-400", description: "Explore all states and prune the search space.", tags: ["Recursion", "Backtracking"] },
      { id: "trees", title: "Tree Data Structures", icon: TreeDeciduous, color: "text-green-400", description: "Binary Trees, BST, traversals, and tree properties.", tags: ["Tree", "BST", "DFS", "BFS"] }
    ]
  },
  {
    id: 3,
    title: "Phase 3: Advanced",
    subtitle: "Optimized Problem Solving",
    description: "Complex relationships between data and high-level optimization strategies.",
    color: "from-orange-500 to-red-500",
    topics: [
      { id: "graphs", title: "Graph Algorithms", icon: Network, color: "text-purple-400", description: "BFS, DFS, Dijkstra, Bellman-Ford, MST algorithms.", tags: ["Graph", "BFS", "DFS", "Shortest Path", "Topological Sort"] },
      { id: "dp", title: "Dynamic Programming", icon: Cpu, color: "text-orange-400", description: "Overlapping subproblems, memoization, tabulation.", tags: ["DP", "Dynamic Programming"] },
      { id: "heaps", title: "Heaps & Priority Queues", icon: Database, color: "text-pink-400", description: "K-th element problems and heap operations.", tags: ["Heap", "Priority Queue"] },
      { id: "tries", title: "Tries & Advanced Trees", icon: Binary, color: "text-cyan-400", description: "Prefix matching, Segment Trees, Fenwick Trees.", tags: ["Trie", "Segment Tree"] },
      { id: "union-find", title: "Disjoint Set (Union-Find)", icon: Route, color: "text-green-400", description: "Connectivity problems and cycle detection.", tags: ["Union Find", "DSU"] }
    ]
  },
  {
    id: 4,
    title: "Phase 4: Mastery",
    subtitle: "Practice & Patterns",
    description: "Solidify knowledge through application and pattern recognition.",
    color: "from-emerald-500 to-teal-500",
    topics: [
      { id: "sliding-window", title: "Sliding Window", icon: Layers, color: "text-blue-400", description: "Fixed and variable window techniques.", tags: ["Sliding Window"] },
      { id: "two-pointers", title: "Two Pointers", icon: Target, color: "text-purple-400", description: "Opposite direction and same direction patterns.", tags: ["Two Pointers"] },
      { id: "intervals", title: "Intervals & Merging", icon: GitBranch, color: "text-orange-400", description: "Merge intervals, meeting rooms, scheduling.", tags: ["Intervals"] },
      { id: "greedy", title: "Greedy Algorithms", icon: Sparkles, color: "text-yellow-400", description: "Local optimal choices for global solutions.", tags: ["Greedy"] },
      { id: "bit-manipulation", title: "Bit Manipulation", icon: Binary, color: "text-cyan-400", description: "XOR tricks, bit masking, and binary operations.", tags: ["Bit Manipulation"] }
    ]
  }
];


// Answer Modal Component
const AnswerModal = ({ problem, onClose }: { problem: Problem; onClose: () => void }) => {
  const getExplanation = (title: string) => {
    // Generate explanation based on problem type
    const explanations: Record<string, string> = {
      'Two Sum': `Use a hash map to store each number and its index as you iterate. For each number, check if (target - current) exists in the map. This gives O(n) time complexity instead of O(n²) with nested loops.`,
      'Reverse Linked List': `Use three pointers: prev (starts null), curr (starts at head), and next. In each iteration, save next, point curr.next to prev, move prev to curr, and curr to next. Continue until curr is null.`,
      'Valid Parentheses': `Use a stack. Push opening brackets onto the stack. For closing brackets, check if the stack top matches. If not, or if stack is empty when expecting a match, return false.`,
      'Binary Search': `Compare target with middle element. If equal, return index. If target is smaller, search left half. If larger, search right half. Repeat until found or search space is empty.`,
      'Climbing Stairs': `This is a Fibonacci sequence! dp[i] = dp[i-1] + dp[i-2]. You can reach step i either from step i-1 (1 step) or step i-2 (2 steps).`,
      'Merge Intervals': `Sort intervals by start time. Iterate through and merge overlapping intervals by comparing current start with previous end. If overlap, extend the end; otherwise, add new interval.`,
    };
    return explanations[title] || `Analyze the problem constraints and identify the pattern. Consider time/space trade-offs. Start with a brute force approach, then optimize using appropriate data structures.`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-space-800 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{problem.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>{problem.difficulty}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-electric mb-2">Problem Description</h4>
            <p className="text-slate-300 text-sm">{problem.description}</p>
          </div>
          
          {problem.examples && problem.examples.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-electric mb-2">Examples</h4>
              {problem.examples.map((ex, i) => (
                <div key={i} className="bg-space-900 rounded-lg p-3 mb-2 font-mono text-xs">
                  <div className="text-slate-400">Input: <span className="text-white">{ex.input}</span></div>
                  <div className="text-slate-400">Output: <span className="text-neon">{ex.expected}</span></div>
                </div>
              ))}
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-semibold text-electric mb-2">💡 Approach & Explanation</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{getExplanation(problem.title)}</p>
          </div>
          
          {problem.starterCode && (
            <div>
              <h4 className="text-sm font-semibold text-electric mb-2">Solution Template</h4>
              <pre className="bg-space-900 rounded-lg p-4 overflow-x-auto text-xs text-slate-300 font-mono">
                {problem.starterCode}
              </pre>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-white/10 flex gap-3">
          <Link 
            to={`/problem/${problem._id}`}
            className="flex-1 py-2 px-4 bg-electric hover:bg-electric/80 text-white rounded-lg font-medium text-center transition-colors flex items-center justify-center gap-2"
          >
            <PlayCircle size={16} /> Solve Problem
          </Link>
          <button onClick={onClose} className="py-2 px-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// Topic Problems Modal Component
const TopicModal = ({ 
  topic, 
  problems, 
  solvedProblems, 
  onClose,
  onViewAnswer 
}: { 
  topic: Topic; 
  problems: Problem[]; 
  solvedProblems: string[];
  onClose: () => void;
  onViewAnswer: (problem: Problem) => void;
}) => {
  const topicProblems = problems.filter(p => topic.tags.some(tag => p.tags.includes(tag)));
  const Icon = topic.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-space-800 rounded-2xl border border-white/10 max-w-3xl w-full max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10`}>
                <Icon size={24} className={topic.color} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
                <p className="text-sm text-slate-400">{topic.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-slate-400">{topicProblems.length} problems</span>
            <span className="text-neon">{topicProblems.filter(p => solvedProblems?.includes(p._id)).length} solved</span>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-2">
            {topicProblems.map((problem, index) => {
              const isSolved = solvedProblems?.includes(problem._id);
              return (
                <div 
                  key={problem._id}
                  className={`group p-4 rounded-xl border transition-all ${
                    isSolved 
                      ? 'bg-neon/5 border-neon/20' 
                      : 'bg-space-900/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500 font-mono text-sm w-6">{index + 1}</span>
                      {isSolved ? (
                        <CheckCircle2 size={18} className="text-neon" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-600" />
                      )}
                      <div>
                        <h3 className="font-medium text-white group-hover:text-electric transition-colors">
                          {problem.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                          {problem.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs text-slate-500">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewAnswer(problem)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                      >
                        <Eye size={14} /> View Answer
                      </button>
                      <Link
                        to={`/problem/${problem._id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-electric hover:bg-electric/80 text-white rounded-lg transition-colors"
                      >
                        <PlayCircle size={14} /> Solve
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={onClose} className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// Topic Card Component
const TopicCard = ({ 
  topic, 
  problems, 
  solvedProblems, 
  isLocked,
  onOpenTopic 
}: { 
  topic: Topic; 
  problems: Problem[]; 
  solvedProblems: string[]; 
  isLocked: boolean;
  onOpenTopic: () => void;
}) => {
  const topicProblems = problems.filter(p => topic.tags.some(tag => p.tags.includes(tag)));
  const solvedCount = topicProblems.filter(p => solvedProblems?.includes(p._id)).length;
  const progressPercent = topicProblems.length > 0 ? Math.round((solvedCount / topicProblems.length) * 100) : 0;
  const Icon = topic.icon;

  return (
    <div 
      onClick={!isLocked ? onOpenTopic : undefined}
      className={`group relative overflow-hidden glass-panel rounded-xl border transition-all duration-300 ${
        isLocked 
          ? 'opacity-50 border-white/5 cursor-not-allowed' 
          : 'border-white/5 hover:border-white/20 hover:-translate-y-1 cursor-pointer'
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-space-900/80 z-10 flex items-center justify-center">
          <Lock className="text-slate-500" size={24} />
        </div>
      )}
      
      <div className="p-5 relative z-0">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10`}>
            <Icon size={20} className={topic.color} />
          </div>
          <span className="text-xs font-mono text-slate-500">{topicProblems.length} problems</span>
        </div>
        
        <h3 className="text-base font-bold text-white mb-1 group-hover:text-electric transition-colors">{topic.title}</h3>
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{topic.description}</p>
        
        <div className="flex items-center justify-between text-xs">
          <span className={`${progressPercent === 100 ? 'text-neon' : 'text-slate-500'}`}>
            {progressPercent}% complete
          </span>
          {progressPercent === 100 && <CheckCircle2 size={14} className="text-neon" />}
        </div>
        
        <div className="w-full bg-space-900 h-1 rounded-full mt-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${progressPercent === 100 ? 'from-neon to-emerald-400' : 'from-electric to-cyber'} transition-all`} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {!isLocked && (
          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-xs text-electric group-hover:text-white transition-colors">
              <ExternalLink size={14} />
              <span>Click to view all {topicProblems.length} problems</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Phase Section Component
const PhaseSection = ({ 
  phase, 
  problems, 
  solvedProblems, 
  isExpanded, 
  onToggle, 
  isUnlocked,
  onOpenTopic 
}: { 
  phase: Phase; 
  problems: Problem[]; 
  solvedProblems: string[]; 
  isExpanded: boolean;
  onToggle: () => void;
  isUnlocked: boolean;
  onOpenTopic: (topic: Topic) => void;
}) => {
  const phaseProblems = problems.filter(p => 
    phase.topics.some(topic => topic.tags.some(tag => p.tags.includes(tag)))
  );
  const solvedCount = phaseProblems.filter(p => solvedProblems?.includes(p._id)).length;
  const progressPercent = phaseProblems.length > 0 ? Math.round((solvedCount / phaseProblems.length) * 100) : 0;

  return (
    <div className={`rounded-2xl border transition-all ${isUnlocked ? 'border-white/10 bg-space-800/30' : 'border-white/5 bg-space-900/50 opacity-60'}`}>
      <button 
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {phase.id}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">{phase.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{phase.subtitle}</span>
              {!isUnlocked && <Lock size={14} className="text-slate-500" />}
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">{phase.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-2xl font-bold text-white font-mono">{progressPercent}%</div>
            <div className="text-xs text-slate-500">{solvedCount}/{phaseProblems.length} solved</div>
          </div>
          <ChevronRight size={24} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {phase.topics.map(topic => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                problems={problems} 
                solvedProblems={solvedProblems}
                isLocked={!isUnlocked}
                onOpenTopic={() => onOpenTopic(topic)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Main Component
const PracticeDSA: React.FC = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await api.getProblems();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const totalSolved = user?.solvedProblems?.length || 0;
  const totalProblems = problems.length;
  const overallProgress = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const getPhaseUnlocked = (_phaseId: number) => true;

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BookOpen className="text-electric" /> Practice DSA
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Follow our structured 4-phase curriculum to master Data Structures and Algorithms from foundations to mastery.
            </p>
          </div>
          
          <div className="hidden md:block glass-panel rounded-xl p-4 border border-white/10">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-white font-mono">{overallProgress}%</div>
            <div className="text-xs text-slate-400 mt-1">{totalSolved} of {totalProblems} problems</div>
            <div className="w-32 bg-space-900 h-2 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-electric to-neon transition-all" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="space-y-4">
        {phases.map(phase => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            problems={problems}
            solvedProblems={user?.solvedProblems || []}
            isExpanded={expandedPhases.includes(phase.id)}
            onToggle={() => togglePhase(phase.id)}
            isUnlocked={getPhaseUnlocked(phase.id)}
            onOpenTopic={(topic) => setSelectedTopic(topic)}
          />
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-8 glass-panel rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="text-yellow-500" /> Pro Tips for Success
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <Target className="text-blue-400" size={16} />
            </div>
            <div>
              <div className="font-medium text-white">Daily Practice</div>
              <div className="text-slate-400">Solve at least one problem every day to build consistency.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Layers className="text-purple-400" size={16} />
            </div>
            <div>
              <div className="font-medium text-white">Follow Patterns</div>
              <div className="text-slate-400">Group problems by patterns like Sliding Window or Two Pointers.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
              <RotateCcw className="text-orange-400" size={16} />
            </div>
            <div>
              <div className="font-medium text-white">Review & Iterate</div>
              <div className="text-slate-400">Keep a mistake log and revisit difficult problems after a few weeks.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          problems={problems}
          solvedProblems={user?.solvedProblems || []}
          onClose={() => setSelectedTopic(null)}
          onViewAnswer={(problem) => {
            setSelectedProblem(problem);
          }}
        />
      )}

      {/* Answer Modal */}
      {selectedProblem && (
        <AnswerModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />
      )}
    </div>
  );
};

export default PracticeDSA;
