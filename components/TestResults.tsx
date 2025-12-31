
import React from 'react';
import { TestResult } from '../types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface TestResultsProps {
    results: TestResult[] | null;
    isLoading: boolean;
}

const TestResults: React.FC<TestResultsProps> = ({ results, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4">
                <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">Running test cases...</p>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="w-full h-full flex items-center justify-center text-slate-500 p-8 text-center">
                <p>Run your code to check against example test cases.</p>
            </div>
        );
    }

    const passedCount = results.filter(r => r.passed).length;
    const allPassed = passedCount === results.length;

    return (
        <div className="w-full h-full flex flex-col bg-space-900/50">
            <div className={`p-4 border-b border-white/5 flex items-center gap-3 ${allPassed ? 'bg-neon/10' : 'bg-red-500/10'}`}>
                {allPassed ? <CheckCircle2 className="text-neon" /> : <XCircle className="text-red-500" />}
                <span className={`font-semibold ${allPassed ? 'text-neon' : 'text-red-500'}`}>
                    {allPassed ? 'Accepted' : 'Wrong Answer'}
                </span>
                <span className="text-slate-400 text-sm ml-auto">
                    {passedCount}/{results.length} Test Cases Passed
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {results.map((result, index) => (
                    <div key={index} className="bg-space-800 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${result.passed ? 'bg-neon/20 text-neon' : 'bg-red-500/20 text-red-500'}`}>
                                Case {index + 1}
                            </span>
                            {!result.passed && <span className="text-xs text-red-400">Failed</span>}
                        </div>

                        <div className="space-y-2 text-sm font-mono">
                            <div>
                                <div className="text-slate-500 text-xs mb-1">Input:</div>
                                <div className="bg-space-900 p-2 rounded text-slate-300">{result.input}</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-slate-500 text-xs mb-1">Output:</div>
                                    <div className={`${result.passed ? 'text-white' : 'text-red-400'} bg-space-900 p-2 rounded`}>
                                        {result.actual}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-500 text-xs mb-1">Expected:</div>
                                    <div className="text-neon bg-space-900 p-2 rounded">{result.expected}</div>
                                </div>
                            </div>

                            {result.error && (
                                <div className="mt-2 text-red-400 text-xs flex items-center gap-1">
                                    <AlertCircle size={12} /> {result.error}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestResults;
