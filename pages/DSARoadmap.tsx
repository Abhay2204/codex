import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronRight, CheckCircle2, Circle, Lock, 
  Code, BookOpen, Trophy, ArrowLeft, Target,
  Zap, Brain, GitBranch, Layers, Binary, Network, Hash,
  TreeDeciduous, BarChart3, Workflow, Boxes, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Topic {
  id: string;
  name: string;
  description: string;
  problems: number;
  estimatedTime: string;
  subtopics?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  topics: Topic[];
  estimatedWeeks: number;
}

const phases: Phase[] = [
  {
    id: 'phase-1',
    title: 'Foundation',
    description: 'Pick a language and master programming fundamentals',
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    estimatedWeeks: 2,
    topics: [
      {
        id: 'pick-language',
        name: 'Pick a Language',
        description: 'Choose one language and stick with it throughout your DSA journey',
        problems: 0,
        estimatedTime: '1 day',
        subtopics: ['C++', 'Java', 'Python', 'JavaScript', 'Go', 'Rust', 'Ruby'],
        difficulty: 'beginner'
      },
      {
        id: 'programming-fundamentals',
        name: 'Programming Fundamentals',
        description: 'Master the basics before diving into data structures',
        problems: 20,
        estimatedTime: '1 week',
        subtopics: ['Language Syntax', 'Control Structures', 'Pseudo Code', 'Functions', 'OOP Basics'],
        difficulty: 'beginner'
      },
      {
        id: 'basic-ds',
        name: 'Basic Data Structures',
        description: 'Understand fundamental data structures and their operations',
        problems: 30,
        estimatedTime: '1 week',
        subtopics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables'],
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Complexity Analysis',
    description: 'Learn to analyze and optimize your algorithms',
    icon: BarChart3,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    estimatedWeeks: 1,
    topics: [
      {
        id: 'complexity-basics',
        name: 'What is Complexity?',
        description: 'Understand time and space complexity fundamentals',
        problems: 10,
        estimatedTime: '2 days',
        subtopics: ['Time vs Space Complexity', 'How to Calculate Complexity', 'Best/Worst/Average Case'],
        difficulty: 'beginner'
      },
      {
        id: 'asymptotic-notation',
        name: 'Asymptotic Notation',
        description: 'Master Big-O, Big-Ω, and Big-Θ notations',
        problems: 15,
        estimatedTime: '3 days',
        subtopics: ['Big-O Notation', 'Big-Ω Notation', 'Big-Θ Notation', 'Common Runtimes'],
        difficulty: 'beginner'
      },
      {
        id: 'common-runtimes',
        name: 'Common Runtimes',
        description: 'Recognize and work with standard complexity classes',
        problems: 10,
        estimatedTime: '2 days',
        subtopics: ['Constant O(1)', 'Logarithmic O(log n)', 'Linear O(n)', 'Polynomial O(n²)', 'Exponential O(2ⁿ)', 'Factorial O(n!)'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Sorting & Searching',
    description: 'Master fundamental algorithms every developer must know',
    icon: Search,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    estimatedWeeks: 2,
    topics: [
      {
        id: 'sorting-algorithms',
        name: 'Sorting Algorithms',
        description: 'Learn and implement all major sorting algorithms',
        problems: 25,
        estimatedTime: '1 week',
        subtopics: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort', 'Radix Sort'],
        difficulty: 'intermediate'
      },
      {
        id: 'searching-algorithms',
        name: 'Searching Algorithms',
        description: 'Master linear and binary search techniques',
        problems: 30,
        estimatedTime: '1 week',
        subtopics: ['Linear Search', 'Binary Search', 'Binary Search Variations', 'Search in Rotated Array', 'Search in 2D Matrix'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Tree Data Structures',
    description: 'Understand hierarchical data structures and traversals',
    icon: TreeDeciduous,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    estimatedWeeks: 3,
    topics: [
      {
        id: 'binary-trees',
        name: 'Binary Trees',
        description: 'Foundation of tree-based data structures',
        problems: 35,
        estimatedTime: '1 week',
        subtopics: ['Binary Tree Basics', 'Binary Search Trees', 'AVL Trees', 'B-Trees', 'Heap'],
        difficulty: 'intermediate'
      },
      {
        id: 'tree-traversal',
        name: 'Tree Traversal',
        description: 'Master all tree traversal techniques',
        problems: 25,
        estimatedTime: '5 days',
        subtopics: ['In-Order Traversal', 'Pre-Order Traversal', 'Post-Order Traversal', 'Level-Order Traversal', 'Morris Traversal'],
        difficulty: 'intermediate'
      },
      {
        id: 'tree-search',
        name: 'Tree Search Algorithms',
        description: 'Search techniques specific to trees',
        problems: 20,
        estimatedTime: '4 days',
        subtopics: ['Breadth First Search', 'Depth First Search', 'Lowest Common Ancestor', 'Path Sum Problems'],
        difficulty: 'intermediate'
      },
      {
        id: 'advanced-trees',
        name: 'Advanced Tree Structures',
        description: 'Specialized tree data structures for specific use cases',
        problems: 25,
        estimatedTime: '1 week',
        subtopics: ['Trie', 'Segment Trees', 'Fenwick Trees', 'Disjoint Set (Union Find)', 'Suffix Trees and Arrays'],
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'phase-5',
    title: 'Graph Data Structures',
    description: 'Master graph representations and algorithms',
    icon: Network,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    estimatedWeeks: 3,
    topics: [
      {
        id: 'graph-basics',
        name: 'Graph Fundamentals',
        description: 'Understand graph representations and terminology',
        problems: 15,
        estimatedTime: '3 days',
        subtopics: ['Directed Graph', 'Undirected Graph', 'Weighted Graph', 'Adjacency Matrix', 'Adjacency List'],
        difficulty: 'intermediate'
      },
      {
        id: 'graph-search',
        name: 'Graph Search Algorithms',
        description: 'Traverse and search through graphs',
        problems: 30,
        estimatedTime: '1 week',
        subtopics: ['Breadth First Search', 'Depth First Search', 'Topological Sort', 'Cycle Detection'],
        difficulty: 'intermediate'
      },
      {
        id: 'shortest-path',
        name: 'Shortest Path Algorithms',
        description: 'Find optimal paths in weighted graphs',
        problems: 25,
        estimatedTime: '1 week',
        subtopics: ["Dijkstra's Algorithm", 'Bellman-Ford Algorithm', 'A* Algorithm', 'Floyd-Warshall'],
        difficulty: 'advanced'
      },
      {
        id: 'mst',
        name: 'Minimum Spanning Tree',
        description: 'Find minimum cost tree spanning all vertices',
        problems: 15,
        estimatedTime: '4 days',
        subtopics: ["Prim's Algorithm", "Kruskal's Algorithm"],
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'phase-6',
    title: 'Problem Solving Techniques',
    description: 'Master algorithmic paradigms and patterns',
    icon: Brain,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    estimatedWeeks: 4,
    topics: [
      {
        id: 'brute-force',
        name: 'Brute Force',
        description: 'Start with the simplest solution approach',
        problems: 20,
        estimatedTime: '3 days',
        subtopics: ['Exhaustive Search', 'Generate All Possibilities', 'Optimization'],
        difficulty: 'beginner'
      },
      {
        id: 'recursion',
        name: 'Recursion',
        description: 'Solve problems by breaking them into subproblems',
        problems: 35,
        estimatedTime: '1 week',
        subtopics: ['Base Case & Recursive Case', 'Call Stack', 'Tail Recursion', 'Memoization'],
        difficulty: 'intermediate'
      },
      {
        id: 'backtracking',
        name: 'Backtracking',
        description: 'Explore all possibilities with pruning',
        problems: 30,
        estimatedTime: '1 week',
        subtopics: ['N-Queens', 'Sudoku Solver', 'Permutations', 'Combinations', 'Subset Sum'],
        difficulty: 'intermediate'
      },
      {
        id: 'greedy',
        name: 'Greedy Algorithms',
        description: 'Make locally optimal choices for global optimum',
        problems: 25,
        estimatedTime: '5 days',
        subtopics: ['Activity Selection', 'Huffman Coding', 'Fractional Knapsack', 'Job Scheduling'],
        difficulty: 'intermediate'
      },
      {
        id: 'divide-conquer',
        name: 'Divide and Conquer',
        description: 'Break problems into smaller subproblems',
        problems: 20,
        estimatedTime: '4 days',
        subtopics: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Closest Pair of Points'],
        difficulty: 'intermediate'
      },
      {
        id: 'dynamic-programming',
        name: 'Dynamic Programming',
        description: 'Optimize recursive solutions with memoization',
        problems: 50,
        estimatedTime: '2 weeks',
        subtopics: ['1D DP', '2D DP', 'State Machine DP', 'Interval DP', 'Tree DP', 'Bitmask DP'],
        difficulty: 'advanced'
      },
      {
        id: 'two-pointers',
        name: 'Two Pointer Technique',
        description: 'Efficient array/string traversal patterns',
        problems: 25,
        estimatedTime: '4 days',
        subtopics: ['Same Direction', 'Opposite Direction', 'Fast & Slow Pointers'],
        difficulty: 'intermediate'
      },
      {
        id: 'sliding-window',
        name: 'Sliding Window Technique',
        description: 'Optimize subarray/substring problems',
        problems: 25,
        estimatedTime: '4 days',
        subtopics: ['Fixed Size Window', 'Variable Size Window', 'String Problems'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'phase-7',
    title: 'Advanced Data Structures',
    description: 'Specialized structures for complex problems',
    icon: Boxes,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    estimatedWeeks: 2,
    topics: [
      {
        id: 'advanced-ds',
        name: 'Complex Data Structures',
        description: 'Advanced structures for specialized use cases',
        problems: 30,
        estimatedTime: '1.5 weeks',
        subtopics: ['2-3 Trees', 'B/B+ Trees', 'Skip List', 'ISAM', 'LRU Cache'],
        difficulty: 'advanced'
      },
      {
        id: 'indexing',
        name: 'Indexing',
        description: 'Efficient data retrieval techniques',
        problems: 15,
        estimatedTime: '4 days',
        subtopics: ['Linear Indexing', 'Tree-Based Indexing', 'Hash Indexing'],
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'phase-8',
    title: 'Interview Patterns',
    description: 'Common patterns asked in technical interviews',
    icon: Target,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    estimatedWeeks: 2,
    topics: [
      {
        id: 'array-patterns',
        name: 'Array Patterns',
        description: 'Common array manipulation techniques',
        problems: 40,
        estimatedTime: '1 week',
        subtopics: ['Island Traversal', 'Multi-threaded', 'Two Heaps', 'Merge Intervals', 'Cyclic Sort', 'Fast and Slow Pointers'],
        difficulty: 'intermediate'
      },
      {
        id: 'bit-manipulation',
        name: 'Bit Manipulation',
        description: 'Solve problems using bitwise operations',
        problems: 25,
        estimatedTime: '5 days',
        subtopics: ['XOR Tricks', 'Bit Masking', 'Power of Two', 'Counting Bits', 'Single Number'],
        difficulty: 'intermediate'
      }
    ]
  }
];

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const PhaseCard: React.FC<{ phase: Phase; index: number; isExpanded: boolean; onToggle: () => void }> = ({ 
  phase, index, isExpanded, onToggle 
}) => {
  const Icon = phase.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection line */}
      {index < phases.length - 1 && (
        <div className="absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-zinc-700 to-transparent z-0" />
      )}
      
      <div className={`${phase.bgColor} border ${phase.borderColor} rounded-2xl overflow-hidden transition-all`}>
        {/* Phase Header */}
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
        >
          <div className={`w-16 h-16 ${phase.bgColor} border ${phase.borderColor} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${phase.color}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs text-zinc-500 font-mono">PHASE {index + 1}</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs text-zinc-500">{phase.estimatedWeeks} weeks</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
            <p className="text-sm text-zinc-400">{phase.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-bold text-white">{phase.topics.length}</div>
              <div className="text-xs text-zinc-500">Topics</div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-6 h-6 text-zinc-400" />
            </motion.div>
          </div>
        </button>
        
        {/* Topics List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-3">
                {phase.topics.map((topic, topicIndex) => (
                  <TopicCard key={topic.id} topic={topic} phaseColor={phase.color} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TopicCard: React.FC<{ topic: Topic; phaseColor: string }> = ({ topic, phaseColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
      >
        <Circle className={`w-5 h-5 ${phaseColor} flex-shrink-0`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-white">{topic.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
          </div>
          <p className="text-sm text-zinc-500 truncate">{topic.description}</p>
        </div>
        
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-white">{topic.problems} problems</div>
            <div className="text-xs text-zinc-500">{topic.estimatedTime}</div>
          </div>
          <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && topic.subtopics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800"
          >
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {topic.subtopics.map((subtopic, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-zinc-800/50 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {subtopic}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DSARoadmap: React.FC = () => {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-1']);
  
  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const totalProblems = phases.reduce((acc, phase) => 
    acc + phase.topics.reduce((topicAcc, topic) => topicAcc + topic.problems, 0), 0
  );
  
  const totalWeeks = phases.reduce((acc, phase) => acc + phase.estimatedWeeks, 0);
  const totalTopics = phases.reduce((acc, phase) => acc + phase.topics.length, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              CodeX
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/problems" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Problems
            </Link>
            <Link to="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-sm font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-300">Complete Learning Path</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">DSA </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              A structured path from programming basics to advanced algorithms. 
              Follow this roadmap to master Data Structures & Algorithms and ace technical interviews.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {phases.length}
                </div>
                <div className="text-sm text-zinc-500">Phases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {totalTopics}
                </div>
                <div className="text-sm text-zinc-500">Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {totalProblems}+
                </div>
                <div className="text-sm text-zinc-500">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ~{totalWeeks}
                </div>
                <div className="text-sm text-zinc-500">Weeks</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    setExpandedPhases([phase.id]);
                    document.getElementById(phase.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 ${phase.bgColor} border ${phase.borderColor} rounded-full hover:bg-white/10 transition-colors`}
                >
                  <Icon className={`w-4 h-4 ${phase.color}`} />
                  <span className="text-sm text-zinc-300">{phase.title}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {phases.map((phase, index) => (
            <div key={phase.id} id={phase.id}>
              <PhaseCard
                phase={phase}
                index={index}
                isExpanded={expandedPhases.includes(phase.id)}
                onToggle={() => togglePhase(phase.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-zinc-400 mb-6">
              Begin with Phase 1 and work your way through. Track your progress and earn XP as you complete problems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/problems"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Start Practicing
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 mb-4">Continue learning with related roadmaps</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors">
              Computer Science
            </button>
            <button className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-colors">
              System Design
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto text-center text-zinc-600 text-sm">
          © 2024 CodeX Platform. Built for developers, by developers.
        </div>
      </footer>
    </div>
  );
};

export default DSARoadmap;
