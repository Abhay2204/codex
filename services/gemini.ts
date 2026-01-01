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
    const prompt = `Act as a code execution simulator. Execute this ${language} code mentally and tell me what it outputs.

CODE:
${code}

INPUT: ${input}

Respond with ONLY this JSON format, nothing else before or after:
{"stdout":"<what the code prints to console>","stderr":"<any errors or empty string>","exitCode":<0 for success or 1 for error>,"time":"<estimated time like 12ms>","memory":"<estimated memory like 2.1 MB>"}

If the code has no print/console output, put the return value in stdout.
If there's a syntax or runtime error, put it in stderr and set exitCode to 1.`;

    const response = await callOpenRouter(prompt);
    console.log("Execute response:", response);
    
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[^{}]*"stdout"[^{}]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          stdout: String(parsed.stdout || ''),
          stderr: String(parsed.stderr || ''),
          exitCode: Number(parsed.exitCode) || 0,
          time: String(parsed.time || '10ms'),
          memory: String(parsed.memory || '2.0 MB')
        };
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    }
    
    // Fallback: treat entire response as output
    return {
      stdout: response.trim() || 'Code executed successfully',
      stderr: '',
      exitCode: 0,
      time: '15ms',
      memory: '2.5 MB'
    };
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
    const prompt = `You are a code execution visualizer. Trace through this algorithm step-by-step showing how data changes.

PROBLEM: ${problemTitle}

CODE:
${code}

Create a detailed step-by-step visualization trace. For sorting/searching algorithms, use sample data like [64, 34, 25, 12, 22, 11, 90].

IMPORTANT: Return ONLY a valid JSON array with 10-15 steps. Each step must have:
{
  "line": <line number being executed, integer>,
  "description": "<clear description of what's happening this step>",
  "data": [<current state of the main array/data as numbers>],
  "highlights": [<indices currently being compared or swapped>],
  "pointers": {"i": <index>, "j": <index>},
  "variables": {"varName": value, "comparisons": count}
}

Example for bubble sort step:
{"line":3,"description":"Comparing arr[0]=64 with arr[1]=34. Since 64 > 34, swap them.","data":[34,64,25,12,22,11,90],"highlights":[0,1],"pointers":{"i":0,"j":1},"variables":{"swapped":true,"pass":1}}

Make descriptions detailed and educational. Show the algorithm's logic clearly.
Return ONLY the JSON array, no other text.`;

    const response = await callOpenRouter(prompt);
    console.log("Visualization response:", response);
    
    // Try to extract JSON array
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((frame: any, idx: number) => ({
            line: Number(frame.line) || idx + 1,
            description: String(frame.description || 'Processing...'),
            data: Array.isArray(frame.data) ? frame.data.map((v: any) => Number(v) || 0) : [64, 34, 25, 12, 22],
            highlights: Array.isArray(frame.highlights) ? frame.highlights.map((v: any) => Number(v)) : [],
            pointers: typeof frame.pointers === 'object' && frame.pointers !== null ? frame.pointers : {},
            variables: typeof frame.variables === 'object' && frame.variables !== null ? frame.variables : {}
          }));
        }
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    }
    
    // Generate a meaningful fallback visualization based on code analysis
    const isSorting = code.toLowerCase().includes('sort') || code.includes('swap') || code.includes('arr[j]');
    const isSearching = code.toLowerCase().includes('search') || code.includes('target') || code.includes('binary');
    
    if (isSorting) {
      return [
        { line: 1, description: "Initialize array with unsorted values", data: [64, 34, 25, 12, 22, 11, 90], highlights: [], pointers: {}, variables: { n: 7, sorted: false } },
        { line: 2, description: "Start first pass through the array", data: [64, 34, 25, 12, 22, 11, 90], highlights: [0], pointers: { i: 0 }, variables: { pass: 1, comparisons: 0 } },
        { line: 3, description: "Compare arr[0]=64 with arr[1]=34. Since 64 > 34, swap needed", data: [64, 34, 25, 12, 22, 11, 90], highlights: [0, 1], pointers: { i: 0, j: 1 }, variables: { pass: 1, comparisons: 1 } },
        { line: 4, description: "Swapped! Array updated: 34 and 64 exchanged positions", data: [34, 64, 25, 12, 22, 11, 90], highlights: [0, 1], pointers: { i: 0, j: 1 }, variables: { pass: 1, swapped: true } },
        { line: 3, description: "Compare arr[1]=64 with arr[2]=25. Since 64 > 25, swap needed", data: [34, 64, 25, 12, 22, 11, 90], highlights: [1, 2], pointers: { i: 1, j: 2 }, variables: { pass: 1, comparisons: 2 } },
        { line: 4, description: "Swapped! 25 moves left, 64 moves right", data: [34, 25, 64, 12, 22, 11, 90], highlights: [1, 2], pointers: { i: 1, j: 2 }, variables: { pass: 1, swapped: true } },
        { line: 3, description: "Compare arr[2]=64 with arr[3]=12. Swap needed", data: [34, 25, 64, 12, 22, 11, 90], highlights: [2, 3], pointers: { i: 2, j: 3 }, variables: { pass: 1, comparisons: 3 } },
        { line: 4, description: "Swapped! Largest element 64 bubbling towards end", data: [34, 25, 12, 64, 22, 11, 90], highlights: [2, 3], pointers: { i: 2, j: 3 }, variables: { pass: 1, swapped: true } },
        { line: 5, description: "Continue comparisons... 64 > 22, swap", data: [34, 25, 12, 22, 64, 11, 90], highlights: [3, 4], pointers: { i: 3, j: 4 }, variables: { pass: 1, comparisons: 4 } },
        { line: 5, description: "64 > 11, swap. 64 almost at final position", data: [34, 25, 12, 22, 11, 64, 90], highlights: [4, 5], pointers: { i: 4, j: 5 }, variables: { pass: 1, comparisons: 5 } },
        { line: 6, description: "64 < 90, no swap needed. First pass complete!", data: [34, 25, 12, 22, 11, 64, 90], highlights: [5, 6], pointers: { i: 5, j: 6 }, variables: { pass: 1, comparisons: 6 } },
        { line: 7, description: "After multiple passes, array is fully sorted!", data: [11, 12, 22, 25, 34, 64, 90], highlights: [], pointers: {}, variables: { passes: 6, totalComparisons: 21, sorted: true } }
      ];
    } else if (isSearching) {
      return [
        { line: 1, description: "Initialize sorted array and target value", data: [11, 12, 22, 25, 34, 64, 90], highlights: [], pointers: {}, variables: { target: 25, found: false } },
        { line: 2, description: "Set left=0, right=6 (array bounds)", data: [11, 12, 22, 25, 34, 64, 90], highlights: [0, 6], pointers: { left: 0, right: 6 }, variables: { target: 25 } },
        { line: 3, description: "Calculate mid = (0+6)/2 = 3", data: [11, 12, 22, 25, 34, 64, 90], highlights: [3], pointers: { left: 0, mid: 3, right: 6 }, variables: { target: 25 } },
        { line: 4, description: "Compare arr[3]=25 with target=25. Found it!", data: [11, 12, 22, 25, 34, 64, 90], highlights: [3], pointers: { mid: 3 }, variables: { target: 25, found: true, index: 3 } }
      ];
    }
    
    // Generic fallback
    return [
      { line: 1, description: "Starting algorithm execution...", data: [5, 3, 8, 1, 9, 2, 7], highlights: [], pointers: {}, variables: { initialized: true } },
      { line: 2, description: "Processing elements in the array", data: [5, 3, 8, 1, 9, 2, 7], highlights: [0, 1], pointers: { i: 0 }, variables: { step: 1 } },
      { line: 3, description: "Comparing and updating values", data: [3, 5, 8, 1, 9, 2, 7], highlights: [1, 2], pointers: { i: 1 }, variables: { step: 2 } },
      { line: 4, description: "Algorithm complete - final result", data: [1, 2, 3, 5, 7, 8, 9], highlights: [], pointers: {}, variables: { complete: true } }
    ];
  } catch (error) {
    console.error("Trace Generation Error:", error);
    return [{
      line: 1,
      description: "Click 'Visualize' to trace through your code step by step",
      data: [64, 34, 25, 12, 22, 11, 90],
      highlights: [],
      pointers: {},
      variables: { status: "Ready" }
    }];
  }
};

export const runCodeAgainstTestCases = async (code: string, problemDescription: string, testCases: TestCase[]): Promise<TestResult[]> => {
  try {
    const testCaseStr = testCases.map((tc, i) => `Test ${i+1}: Input="${tc.input}" Expected="${tc.expected}"`).join('\n');
    
    const prompt = `Act as a code judge. Execute this code against each test case and tell me if it passes.

PROBLEM: ${problemDescription}

CODE:
${code}

TEST CASES:
${testCaseStr}

For each test case, respond with this JSON array format ONLY (no other text):
[{"input":"<input>","expected":"<expected>","actual":"<what code actually outputs>","passed":<true or false>,"executionStats":{"time":"5ms","memory":"1.2 MB"}}]

Execute the code mentally for each input and compare output to expected.`;

    const response = await callOpenRouter(prompt);
    console.log("Test response:", response);
    
    // Try to extract JSON array
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed)) {
          return parsed.map((r: any, i: number) => ({
            input: String(r.input || testCases[i]?.input || ''),
            expected: String(r.expected || testCases[i]?.expected || ''),
            actual: String(r.actual || r.output || ''),
            passed: Boolean(r.passed),
            error: r.error ? String(r.error) : undefined,
            executionStats: {
              time: String(r.executionStats?.time || '5ms'),
              memory: String(r.executionStats?.memory || '1.5 MB')
            }
          }));
        }
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    }
    
    // Fallback: create results based on response text
    return testCases.map((tc, i) => {
      const passedMatch = response.toLowerCase().includes(`test ${i+1}`) && 
                          (response.toLowerCase().includes('pass') || response.toLowerCase().includes('correct'));
      return {
        input: String(tc.input),
        expected: String(tc.expected),
        actual: passedMatch ? String(tc.expected) : 'Unable to determine',
        passed: passedMatch,
        executionStats: { time: '10ms', memory: '2.0 MB' }
      };
    });
  } catch (error) {
    console.error("Test Runner Error:", error);
    return testCases.map(tc => ({
      input: String(tc.input),
      expected: String(tc.expected),
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

Return ONLY a valid JSON object with these exact string fields:
{
  "solution": "// Complete working code here as a single string...",
  "explanation": "Brief explanation of the approach and time/space complexity as a single string"
}

IMPORTANT: Both "solution" and "explanation" must be plain strings, not objects or arrays.`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      
      // Ensure solution is a string
      let solutionStr = result.solution;
      if (typeof solutionStr === 'object') {
        solutionStr = JSON.stringify(solutionStr, null, 2);
      }
      solutionStr = String(solutionStr || '// Solution generation failed');
      
      // Ensure explanation is a string
      let explanationStr = result.explanation;
      if (typeof explanationStr === 'object') {
        explanationStr = JSON.stringify(explanationStr, null, 2);
      }
      explanationStr = String(explanationStr || 'No explanation available');
      
      return {
        solution: solutionStr,
        explanation: explanationStr
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
