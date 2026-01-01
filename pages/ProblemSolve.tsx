import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, Loader2, Terminal, ChevronDown, X, Copy, Check, FlaskConical, Eye } from 'lucide-react';
import Visualizer from '../components/Visualizer';
import TestResults from '../components/TestResults';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LANGUAGE_TEMPLATES } from '../constants';
import { TestResult, SupportedLanguage, ExecutionResult } from '../types';
import { generateVisualizationHTML, runCodeAgainstTestCases, executeCode, generateSolution } from '../services/gemini';
import confetti from 'canvas-confetti';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
  starterCode: string;
  solution: string;
  visualizationType: string;
  examples: { input: string; expected: string; isHidden?: boolean }[];
}

const ProblemSolve: React.FC = () => {
  const { id } = useParams();
  const { user, updateStats } = useAuth();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState('');
  const [bottomTab, setBottomTab] = useState<'tests' | 'console'>('tests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  
  const [isLoadingViz, setIsLoadingViz] = useState(false);
  const [vizHTML, setVizHTML] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await api.getProblem(id!);
        setProblem(data);
        const savedCode = localStorage.getItem(`code_${id}_${language}`);
        setCode(savedCode || data.starterCode);
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProblem();
  }, [id]);

  useEffect(() => {
    if (problem) {
      const savedCode = localStorage.getItem(`code_${id}_${language}`);
      if (savedCode) {
        setCode(savedCode);
      } else if (language === 'javascript') {
        setCode(problem.starterCode);
      } else {
        setCode(LANGUAGE_TEMPLATES[language] || '');
      }
    }
  }, [language, problem]);

  useEffect(() => {
    if (code && id) {
      localStorage.setItem(`code_${id}_${language}`, code);
    }
  }, [code, id, language]);

  const handleRunVisualization = async () => {
    if (!problem) return;
    setIsVisualizerOpen(true);
    setIsLoadingViz(true);
    setVizHTML(null);
    
    try {
      const html = await generateVisualizationHTML(code, problem.title);
      setVizHTML(html);
    } catch (error) {
      console.error("Failed to generate visualization", error);
    } finally {
      setIsLoadingViz(false);
    }
  };

  const handleRunCode = async () => {
    if (!problem) return;
    setBottomTab('console');
    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const input = problem.examples[0]?.input || "No input";
      const result = await executeCode(code, language, input);
      setExecutionResult(result);
    } catch (error) {
      console.error("Execution failed", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRunTests = async () => {
    if (!problem) return;
    setBottomTab('tests');
    setIsRunningTests(true);
    setTestResults(null);
    try {
      const results = await runCodeAgainstTestCases(code, problem.description, problem.examples);
      setTestResults(results);
    } catch (error) {
      console.error("Tests failed", error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem || !id) return;
    setBottomTab('tests');
    setIsSubmitting(true);
    setIsRunningTests(true);
    
    try {
      const results = await runCodeAgainstTestCases(code, problem.description, problem.examples);
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      // Save submission to database
      await api.createSubmission({
        problemId: id,
        code,
        language,
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        runtime: results[0]?.executionStats?.time,
        memory: results[0]?.executionStats?.memory
      });
      
      if (allPassed && !user?.solvedProblems?.includes(id)) {
        const xpGain = problem.difficulty === 'Easy' ? 50 : problem.difficulty === 'Medium' ? 100 : 200;
        await updateStats({ xp: xpGain, solved: 1, problemId: id });
        triggerSuccess();
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
      setIsRunningTests(false);
    }
  };

  const triggerSuccess = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0066FF', '#8B5CF6', '#00FF88'],
      disableForReducedMotion: true
    });
  };

  if (loading || !problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-space-900">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  const lineCount = code.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-space-900 text-white relative">
      <header className="h-14 bg-space-800 border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-4">
           <Link to="/problems" className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
           </Link>
           <div className="flex flex-col">
               <h1 className="text-sm font-bold text-white flex items-center gap-2">
                   {problem.title} 
                   <span className="text-xs font-normal text-slate-500 px-2 py-0.5 border border-white/10 rounded-full">{problem.difficulty}</span>
               </h1>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative mr-2">
               <button 
                 onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                 className="flex items-center gap-2 px-3 py-1.5 bg-space-700 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-space-600 border border-white/5 transition-colors"
               >
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                   {language === 'javascript' ? 'JavaScript' : language === 'python' ? 'Python' : language === 'java' ? 'Java' : language === 'cpp' ? 'C++' : 'Go'}
                   <ChevronDown size={12} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
               {isLangDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                   <div className="absolute top-full right-0 mt-2 w-40 bg-space-800 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                       {(['javascript', 'python', 'java', 'cpp', 'go'] as SupportedLanguage[]).map(lang => (
                           <button 
                             key={lang} 
                             onClick={() => { setLanguage(lang); setIsLangDropdownOpen(false); }} 
                             className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${language === lang ? 'text-electric bg-electric/10' : 'text-slate-300'}`}
                           >
                               {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : lang === 'java' ? 'Java' : lang === 'cpp' ? 'C++' : 'Go'}
                           </button>
                       ))}
                   </div>
                 </>
               )}
           </div>
           
           <button onClick={handleRunCode} disabled={isExecuting || isSubmitting} className="px-4 py-1.5 rounded-lg bg-space-700 hover:bg-space-600 text-xs font-semibold tracking-wide transition-colors border border-white/5 flex items-center gap-2 disabled:opacity-50 uppercase">
             {isExecuting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Terminal className="w-3 h-3" />} Run
           </button>

           <button onClick={handleRunTests} disabled={isRunningTests || isSubmitting} className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 disabled:opacity-50 uppercase text-white">
             {isRunningTests ? <Loader2 className="w-3 h-3 animate-spin" /> : <FlaskConical className="w-3 h-3" />} Test
           </button>
           
           <button onClick={handleRunVisualization} disabled={isLoadingViz} className="hidden md:flex px-4 py-1.5 rounded-lg bg-electric hover:bg-blue-600 text-xs font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-white">
             {isLoadingViz ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />} 
             {isLoadingViz ? "Loading..." : "Visualize"}
           </button>

           <button onClick={handleSubmit} disabled={isSubmitting} className="px-5 py-1.5 rounded-lg bg-neon text-space-900 hover:bg-green-400 text-xs font-bold tracking-wide shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 disabled:opacity-50 uppercase">
             {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />} Submit
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className={`flex flex-col border-r border-white/5 bg-space-900/50 backdrop-blur-sm transition-all duration-300 relative ${isSidebarOpen ? 'w-[350px] lg:w-[450px]' : 'w-0'}`}>
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-space-800 border border-white/10 rounded-r-lg flex items-center justify-center hover:bg-space-700 transition-colors shadow-xl">
                {isSidebarOpen ? <ChevronLeft size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
           </button>

           <div className={`flex flex-col h-full overflow-hidden ${!isSidebarOpen && 'invisible'}`}>
               <div className="flex border-b border-white/5 shrink-0 bg-space-800/30">
                  <div className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 border-electric text-white bg-white/5 text-center">Description</div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                  <div className="prose prose-invert prose-sm max-w-none">
                      <h2 className="text-xl font-bold text-white mb-4">{problem.title}</h2>
                      <div className="text-slate-300 whitespace-pre-line mb-8 leading-relaxed">{problem.description}</div>
                      <h3 className="text-white font-bold mb-4">Examples</h3>
                      <div className="space-y-4 mb-8">
                         {problem.examples.map((ex, idx) => (
                            <div key={idx} className="bg-space-800 rounded-lg p-4 border border-white/5">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Example {idx + 1}</h4>
                                <div className="font-mono text-xs space-y-2">
                                    <div className="flex gap-2"><span className="text-slate-500 select-none w-12">Input:</span><span className="text-slate-200">{typeof ex.input === 'object' ? JSON.stringify(ex.input) : String(ex.input)}</span></div>
                                    <div className="flex gap-2"><span className="text-slate-500 select-none w-12">Output:</span><span className="text-white font-semibold">{typeof ex.expected === 'object' ? JSON.stringify(ex.expected) : String(ex.expected)}</span></div>
                                </div>
                            </div>
                         ))}
                      </div>
                      <h3 className="text-white font-bold mb-3">Constraints</h3>
                      <ul className="list-disc list-inside text-slate-400 space-y-1 marker:text-slate-600">
                          <li>Time Limit: 1000ms</li>
                          <li>Memory Limit: 256MB</li>
                      </ul>
                      
                      <button 
                        onClick={() => setShowAnswerModal(true)}
                        className="mt-6 w-full py-3 bg-neon/10 hover:bg-neon/20 border border-neon/30 text-neon rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} /> Show Answer
                      </button>
                  </div>
               </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
           <div className="h-[60%] flex flex-col bg-[#1e1e1e] relative group">
              <div className="h-9 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333]">
                 <div className="flex items-center gap-4">
                    <span className="text-xs text-blue-400 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span> solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'java' ? 'java' : language === 'cpp' ? 'cpp' : 'go'}
                    </span>
                 </div>
                 <span className="text-[10px] text-slate-500">Auto-saved</span>
              </div>
              
              <div className="flex-1 relative font-mono text-sm overflow-hidden flex">
                 <div className="w-12 bg-[#1e1e1e] text-[#6e7681] flex flex-col items-end pr-3 pt-4 select-none border-r border-[#333] z-10 shrink-0">
                    {lines.map((ln) => (
                        <div key={ln} className="leading-6 h-6 w-full text-right">
                            <span>{ln}</span>
                        </div>
                    ))}
                 </div>
                 
                 <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 resize-none focus:outline-none leading-6 whitespace-pre font-mono" spellCheck="false" autoCapitalize="off" autoComplete="off" autoCorrect="off" />
              </div>
           </div>

           <div className="h-[40%] flex border-t border-white/10 bg-space-900 relative">
               <div className="flex-1 flex flex-col relative min-w-0">
                  <div className="flex items-center border-b border-white/5 bg-space-800/50 shrink-0">
                      <button onClick={() => setBottomTab('tests')} className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wide border-b-2 transition-all ${bottomTab === 'tests' ? 'border-electric text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Test Results</button>
                      <button onClick={() => setBottomTab('console')} className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wide border-b-2 transition-all ${bottomTab === 'console' ? 'border-electric text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Console</button>
                  </div>

                  <div className="flex-1 overflow-hidden relative bg-space-900">
                    {bottomTab === 'tests' && <TestResults results={testResults} isLoading={isRunningTests} />}
                    {bottomTab === 'console' && (
                        <div className="w-full h-full p-4 font-mono text-sm overflow-auto">
                            {isExecuting ? (
                                <div className="flex items-center gap-2 text-slate-400"><Loader2 className="w-4 h-4 animate-spin" /> Executing code...</div>
                            ) : executionResult ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-white/5 pb-2">
                                        <span>Exit Code: <span className={executionResult.exitCode === 0 ? 'text-neon' : 'text-red-500'}>{executionResult.exitCode}</span></span>
                                        <span>Time: {executionResult.time}</span>
                                        <span>Memory: {executionResult.memory}</span>
                                    </div>
                                    {executionResult.stdout && <div><div className="text-xs text-slate-500 mb-1">Standard Output</div><div className="text-slate-300 whitespace-pre-wrap">{executionResult.stdout}</div></div>}
                                    {executionResult.stderr && <div><div className="text-xs text-red-500 mb-1">Standard Error</div><div className="text-red-400 bg-red-500/5 p-2 rounded whitespace-pre-wrap">{executionResult.stderr}</div></div>}
                                    {!executionResult.stdout && !executionResult.stderr && <div className="text-slate-500 italic">No output generated.</div>}
                                </div>
                            ) : (
                                <div className="text-slate-500 italic">Run code to see output.</div>
                            )}
                        </div>
                    )}
                  </div>
               </div>
           </div>
        </div>
      </div>
      
      {/* Visualization Popup */}
      {isVisualizerOpen && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
          <div className="h-14 bg-space-800 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 text-electric" />
              <h2 className="text-lg font-bold text-white">{problem.title} - Visualization</h2>
            </div>
            <button 
              onClick={() => setIsVisualizerOpen(false)} 
              className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            <Visualizer htmlContent={vizHTML} isLoading={isLoadingViz} />
          </div>
        </div>
      )}

      {/* Show Answer Modal */}
      {showAnswerModal && (
        <AnswerModal problem={problem} onClose={() => setShowAnswerModal(false)} />
      )}
    </div>
  );
};

// Answer Modal Component with AI-generated solutions via OpenRouter
const AnswerModal = ({ problem, onClose }: { problem: Problem; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [aiSolution, setAiSolution] = useState<{ solution: string; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch AI solution if no solution in DB
  useEffect(() => {
    if (!problem.solution && !aiSolution && !loading) {
      fetchAiSolution();
    }
  }, [problem]);

  const fetchAiSolution = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSolution(
        problem.title,
        problem.description || '',
        problem.starterCode || '',
        problem.examples || []
      );
      setAiSolution(result);
    } catch (err) {
      setError('Failed to generate solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const displaySolution = problem.solution || aiSolution?.solution || '';
  const displayExplanation = aiSolution?.explanation || null;

  const handleCopy = () => {
    navigator.clipboard.writeText(displaySolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-space-800 rounded-2xl border border-white/10 max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="text-neon" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white">{problem.title}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{problem.difficulty}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* AI Explanation */}
          {displayExplanation && (
            <div className="bg-neon/5 border border-neon/20 rounded-lg p-4">
              <h3 className="text-neon font-bold mb-2 text-sm flex items-center gap-2">💡 AI Explanation</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{displayExplanation}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-electric animate-spin mr-3" />
              <span className="text-slate-400">Generating AI solution...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
              <button 
                onClick={fetchAiSolution}
                className="mt-2 text-xs text-electric hover:underline"
              >
                Try again
              </button>
            </div>
          ) : displaySolution ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold flex items-center gap-2">
                  Solution Code
                  {!problem.solution && aiSolution ? (
                    <span className="text-xs px-2 py-0.5 bg-cyber/20 text-cyber rounded-full">AI Generated</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-neon/20 text-neon rounded-full">Complete Solution</span>
                  )}
                </h3>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                >
                  {copied ? <Check size={14} className="text-neon" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto text-sm text-[#d4d4d4] font-mono border border-white/5 max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                <code>{displaySolution}</code>
              </pre>
            </div>
          ) : null}

          <div>
            <h3 className="text-white font-bold mb-3">Key Insights</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Understand the problem constraints before coding
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Consider edge cases like empty input or single elements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon mt-1">•</span>
                Test your solution with the provided examples first
              </li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={onClose} className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;
