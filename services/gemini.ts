import { VisualizationFrame, TestCase, TestResult, ExecutionResult } from "../types";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'kwaipilot/kat-coder-pro:free';

const callOpenRouter = async (prompt: string, jsonMode = false): Promise<string> => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'CodeX Platform'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {})
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
};

export const getCodeAnalysis = async (code: string, problemDescription: string): Promise<string> => {
  try {
    const prompt = `You are an expert senior code reviewer for a competitive programming platform called CodeX.
Analyze the following code for the problem: "${problemDescription}".

Code:
\`\`\`
${code}
\`\`\`

Provide a concise analysis covering:
1. Time Complexity (Big O)
2. Space Complexity (Big O)
3. One code smell or improvement suggestion.

Keep the tone helpful and professional. Do not solve the problem if it is incomplete.`;

    return await callOpenRouter(prompt);
  } catch (error) {
    console.error("Analysis Error:", error);
    return "AI service is currently unavailable. Please try again later.";
  }
};

export const getProgressiveHint = async (code: string, problemDescription: string, previousHints: string[]): Promise<string> => {
  try {
    const prompt = `You are a mentor on CodeX. The user is stuck.
Problem: "${problemDescription}"
Current Code: "${code}"
Previous Hints Given: ${JSON.stringify(previousHints)}

Give a NEW progressive hint.
- If 0 hints given: Give a conceptual hint (Level 1).
- If 1 hint given: Give a logic/algorithm hint (Level 2).
- If 2+ hints given: Give a pseudocode hint (Level 3).

Do not give the full code solution. Keep it brief.`;

    return await callOpenRouter(prompt);
  } catch (error) {
    console.error("Hint Error:", error);
    return "Unable to retrieve a hint at this time.";
  }
};

export const getErrorExplanation = async (code: string, problemDescription: string, error: string): Promise<string> => {
  try {
    const prompt = `You are an expert coding tutor on CodeX. The user's code execution failed.

Problem Description: "${problemDescription}"

User's Code:
\`\`\`
${code}
\`\`\`

Error Message:
"${error}"

Please explain what this error means in the context of their code and specific problem. 
Suggest how to fix it without writing the entire solution. Be concise and encouraging.`;

    return await callOpenRouter(prompt);
  } catch (error) {
    console.error("Error Explanation Error:", error);
    return "Unable to explain the error at this time. Please try again later.";
  }
};

export const executeCode = async (code: string, language: string, input: string): Promise<ExecutionResult> => {
  try {
    const prompt = `You are a remote code execution engine (Runner) for a competitive programming platform.

Task: Simulate the execution of the following ${language} code.
Input provided to stdin: ${input}

Code:
\`\`\`${language}
${code}
\`\`\`

You must simulate:
1. Standard Output (stdout): What the code prints.
2. Standard Error (stderr): Any runtime errors or compilation errors.
3. Execution Time: Estimate realistically based on complexity (e.g., "45ms").
4. Memory Usage: Estimate realistically (e.g., "14.2 MB").
5. Exit Code: 0 for success, 1 for error.

Return ONLY a valid JSON object with no extra text:
{"stdout": "...", "stderr": "...", "exitCode": 0, "time": "...", "memory": "..."}`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as ExecutionResult;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Execution Error:", error);
    return {
      stdout: "",
      stderr: "Error connecting to execution engine. Please try again.",
      exitCode: 1,
      time: "0ms",
      memory: "0MB"
    };
  }
};

export const generateVisualizationTrace = async (code: string, problemTitle: string): Promise<VisualizationFrame[]> => {
  try {
    const prompt = `You are a code execution engine for a visualizer.
Problem: ${problemTitle}
User Code:
${code}

Execute this code conceptually with a simple representative input.

Return ONLY a valid JSON array (no extra text) of objects representing the execution steps.
Each object must have:
- "line": number (approximate line number being executed)
- "description": string (short description of what is happening)
- "data": array or object (current state of the main data structure)
- "highlights": array of numbers (indices of elements currently being accessed)
- "pointers": object (variable names and their indices, e.g. {"i": 0})
- "variables": object (local variables and their values)

Limit to max 15 steps. Return valid JSON array only.`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as VisualizationFrame[];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Trace Generation Error:", error);
    return [{
      line: 1,
      description: "Execution simulation failed. Showing static fallback.",
      data: [],
      highlights: [],
      pointers: {},
      variables: {}
    }];
  }
};

export const runCodeAgainstTestCases = async (code: string, problemDescription: string, testCases: TestCase[]): Promise<TestResult[]> => {
  try {
    const prompt = `You are a Code Execution Engine for a competitive programming platform.
Problem: "${problemDescription}"
User Code:
${code}

Run the user code against the following test cases.
For each test case, determine if the code passes or fails.

Test Cases:
${JSON.stringify(testCases)}

Return ONLY a valid JSON array (no extra text) of objects with:
- "input": string
- "expected": string
- "actual": string (what the code returns)
- "passed": boolean
- "error": string (optional, if runtime error)
- "executionStats": {"time": "2ms", "memory": "1.2MB"}`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as TestResult[];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Test Runner Error:", error);
    return testCases.map(tc => ({
      input: tc.input,
      expected: tc.expected,
      actual: "Execution Error",
      passed: false,
      error: "Failed to connect to execution engine.",
      executionStats: { time: "0ms", memory: "0MB" }
    }));
  }
};

export const generateSolution = async (problemTitle: string, problemDescription: string, starterCode: string, examples: { input: string; expected: string }[]): Promise<{ solution: string; explanation: string }> => {
  try {
    const prompt = `You are an expert programmer on CodeX platform. Generate a complete, working solution for this problem.

Problem Title: "${problemTitle}"
Problem Description: "${problemDescription}"

Starter Code Template:
\`\`\`javascript
${starterCode}
\`\`\`

Examples:
${examples.map((ex, i) => `Example ${i + 1}: Input: ${ex.input} → Expected Output: ${ex.expected}`).join('\n')}

Requirements:
1. Write a complete, working JavaScript solution that passes all examples
2. Use clean, readable code with proper variable names
3. Include brief inline comments explaining key logic
4. The solution should be efficient (optimal or near-optimal time complexity)

Return ONLY a valid JSON object with:
{
  "solution": "// Complete working code here...",
  "explanation": "Brief explanation of the approach and time/space complexity"
}`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        solution: result.solution || '// Solution generation failed',
        explanation: result.explanation || 'No explanation available'
      };
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Solution Generation Error:", error);
    return {
      solution: '// Unable to generate solution. Please try again later.',
      explanation: 'AI service is currently unavailable.'
    };
  }
};
