import { SupportedLanguage } from './types';

export const LANGUAGE_TEMPLATES: Record<SupportedLanguage, string> = {
  javascript: `function solve(input) {\n  // Write your code here\n  return input;\n}`,
  python: `def solve(input):\n    # Write your code here\n    return input`,
  java: `public class Solution {\n    public String solve(String input) {\n        // Write your code here\n        return input;\n    }\n}`,
  cpp: `class Solution {\npublic:\n    string solve(string input) {\n        // Write your code here\n        return input;\n    }\n};`,
  go: `func solve(input string) string {\n    // Write your code here\n    return input\n}`
};
