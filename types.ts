export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export enum VisualizationType {
  Array = 'Array',
  Tree = 'Tree',
  Graph = 'Graph',
  DP = 'DP',
  Stack = 'Stack',
  Queue = 'Queue',
  HashMap = 'HashMap',
  Heap = 'Heap'
}

export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'cpp' | 'go';

export interface TestCase {
  input: string;
  expected: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  time: string;
  memory: string;
  output?: string;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  error?: string;
  executionStats?: {
    time: string;
    memory: string;
  };
}

export interface Problem {
  _id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  acceptanceRate: number;
  description: string;
  starterCode: string;
  visualizationType: VisualizationType;
  examples: TestCase[];
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface VisualizationFrame {
  line: number;
  description: string;
  data: any; 
  highlights: number[];
  pointers: Record<string, number>;
  variables?: Record<string, any>;
  success?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  solved: number;
  streak: number;
  rank: number;
  solvedProblems: string[];
  country: string;
}
