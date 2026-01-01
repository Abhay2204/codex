import { TestCase, TestResult, ExecutionResult } from "../types";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'kwaipilot/kat-coder-pro:free';

const callOpenRouter = async (prompt: string): Promise<string> => {
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
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
};

export const executeCode = async (code: string, language: string, input: string): Promise<ExecutionResult> => {
  try {
    const prompt = `Execute this ${language} code and return the output.

CODE:
${code}

INPUT: ${input}

Return ONLY JSON: {"stdout":"output","stderr":"errors","exitCode":0,"time":"10ms","memory":"2MB"}`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\{[^{}]*"stdout"[^{}]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        stdout: String(parsed.stdout || ''),
        stderr: String(parsed.stderr || ''),
        exitCode: Number(parsed.exitCode) || 0,
        time: String(parsed.time || '10ms'),
        memory: String(parsed.memory || '2MB')
      };
    }
    return { stdout: response.trim(), stderr: '', exitCode: 0, time: '15ms', memory: '2MB' };
  } catch (error) {
    return { stdout: '', stderr: 'Execution error', exitCode: 1, time: '0ms', memory: '0MB' };
  }
};

export const runCodeAgainstTestCases = async (code: string, problemDescription: string, testCases: TestCase[]): Promise<TestResult[]> => {
  try {
    const testStr = testCases.map((tc, i) => `Test${i+1}: Input="${tc.input}" Expected="${tc.expected}"`).join('\n');
    const prompt = `Judge this code against test cases.

PROBLEM: ${problemDescription}
CODE: ${code}
TESTS:
${testStr}

Return ONLY JSON array: [{"input":"...","expected":"...","actual":"...","passed":true/false,"executionStats":{"time":"5ms","memory":"1MB"}}]`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.map((r: any, i: number) => ({
        input: String(r.input || testCases[i]?.input || ''),
        expected: String(r.expected || testCases[i]?.expected || ''),
        actual: String(r.actual || ''),
        passed: Boolean(r.passed),
        executionStats: { time: r.executionStats?.time || '5ms', memory: r.executionStats?.memory || '1MB' }
      }));
    }
    return testCases.map(tc => ({ input: tc.input, expected: tc.expected, actual: 'Error', passed: false, executionStats: { time: '0ms', memory: '0MB' } }));
  } catch (error) {
    return testCases.map(tc => ({ input: tc.input, expected: tc.expected, actual: 'Error', passed: false, executionStats: { time: '0ms', memory: '0MB' } }));
  }
};

export const generateSolution = async (problemTitle: string, problemDescription: string, starterCode: string, examples: { input: string; expected: string }[]): Promise<{ solution: string; explanation: string }> => {
  try {
    const prompt = `Generate solution for: ${problemTitle}
Description: ${problemDescription}
Examples: ${examples.map(e => `${e.input} -> ${e.expected}`).join(', ')}

Return JSON: {"solution":"code here","explanation":"approach explanation"}`;

    const response = await callOpenRouter(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return { solution: String(result.solution || ''), explanation: String(result.explanation || '') };
    }
    return { solution: '// Error generating solution', explanation: 'Error' };
  } catch (error) {
    return { solution: '// Error generating solution', explanation: 'Error' };
  }
};


// Generate HTML visualization
export const generateVisualizationHTML = async (code: string, problemTitle: string): Promise<string> => {
  try {
    const prompt = `Create a standalone HTML visualization for this algorithm.

PROBLEM: ${problemTitle}
CODE:
${code}

Generate a COMPLETE HTML file with:
- Dark theme (#0f172a background)
- Animated step-by-step visualization
- Play/Pause, Next/Prev buttons
- Step counter and description
- Variables display
- Highlighted elements (yellow/orange for active)
- Appropriate visualization for the data structure (bars for arrays, boxes for linked lists, circles for trees, etc.)
- At least 8-12 animation steps
- Smooth CSS transitions

Return ONLY the HTML starting with <!DOCTYPE html> ending with </html>. No markdown.`;

    const response = await callOpenRouter(prompt);
    let html = response.trim().replace(/```html\n?/gi, '').replace(/```\n?/gi, '');
    
    const htmlMatch = html.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
    if (htmlMatch) return htmlMatch[0];
    if (html.toLowerCase().includes('<!doctype') || html.toLowerCase().includes('<html')) return html;
    
    return getDefaultVisualizationHTML(problemTitle, code);
  } catch (error) {
    console.error("Visualization error:", error);
    return getDefaultVisualizationHTML(problemTitle, code);
  }
};

const getDefaultVisualizationHTML = (title: string, code: string): string => {
  const lc = code.toLowerCase();
  const isStack = lc.includes('stack') || lc.includes('push') || lc.includes('pop');
  const isQueue = lc.includes('queue') || lc.includes('enqueue') || lc.includes('dequeue');
  const isLinked = lc.includes('linked') || lc.includes('node') || lc.includes('next');
  const isTree = lc.includes('tree') || lc.includes('root') || lc.includes('bst');
  
  let vizType = 'array';
  if (isStack) vizType = 'stack';
  else if (isQueue) vizType = 'queue';
  else if (isLinked) vizType = 'linkedlist';
  else if (isTree) vizType = 'tree';

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:#0f172a;color:#fff;min-height:100vh;display:flex;flex-direction:column}
.header{padding:20px;text-align:center;border-bottom:1px solid #334155}
h1{font-size:22px;color:#60a5fa;margin-bottom:5px}
.subtitle{color:#94a3b8;font-size:13px}
.viz{flex:1;display:flex;align-items:center;justify-content:center;padding:30px;gap:12px}
.bar-wrap{display:flex;flex-direction:column;align-items:center;gap:6px}
.bar{width:55px;border-radius:6px 6px 0 0;transition:all .4s;display:flex;align-items:flex-start;justify-content:center;padding-top:8px}
.bar.normal{background:linear-gradient(to top,#3b82f6,#06b6d4)}
.bar.highlight{background:linear-gradient(to top,#f59e0b,#fbbf24);box-shadow:0 0 20px rgba(245,158,11,.5)}
.bar span{color:#fff;font-weight:700;font-size:15px}
.idx{color:#64748b;font-size:11px;font-family:monospace}
.ptr{color:#10b981;font-size:10px;font-weight:700;background:rgba(16,185,129,.2);padding:2px 6px;border-radius:4px;margin-top:2px}
.controls{display:flex;justify-content:center;gap:10px;padding:15px;background:rgba(0,0,0,.3);border-radius:10px;margin:15px auto;width:fit-content}
.btn{padding:10px 18px;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;transition:all .2s}
.btn-p{background:#3b82f6;color:#fff}.btn-p:hover{background:#2563eb}
.btn-s{background:#374151;color:#fff}.btn-s:hover{background:#4b5563}
.btn:disabled{opacity:.4;cursor:not-allowed}
.info{text-align:center;padding:20px;background:rgba(0,0,0,.2);border-radius:10px;margin:0 20px 20px}
.step-num{color:#60a5fa;font-size:13px;margin-bottom:6px}
.step-desc{color:#e2e8f0;font-size:15px;line-height:1.5}
.vars{display:flex;justify-content:center;gap:12px;margin-top:12px;flex-wrap:wrap}
.var{background:#1e293b;padding:6px 10px;border-radius:5px;font-family:monospace;font-size:12px}
.var b{color:#06b6d4}.var span{color:#fbbf24}
</style></head>
<body>
<div class="header"><h1>${title}</h1><p class="subtitle">Algorithm Visualization</p></div>
<div class="viz" id="viz"></div>
<div class="controls">
<button class="btn btn-s" id="prev" onclick="prev()">◀ Prev</button>
<button class="btn btn-p" id="play" onclick="toggle()">▶ Play</button>
<button class="btn btn-s" id="next" onclick="next()">Next ▶</button>
<button class="btn btn-s" onclick="reset()">↺ Reset</button>
</div>
<div class="info">
<div class="step-num">Step <span id="sn">1</span> / <span id="ts">8</span></div>
<div class="step-desc" id="desc">Initialize array</div>
<div class="vars" id="vars"></div>
</div>
<script>
const steps=[
{d:[64,34,25,12,22,11,90],h:[],p:{},desc:"Initialize array with values",v:{n:7}},
{d:[64,34,25,12,22,11,90],h:[0,1],p:{i:0,j:1},desc:"Compare arr[0]=64 with arr[1]=34",v:{comparing:true}},
{d:[34,64,25,12,22,11,90],h:[0,1],p:{i:0,j:1},desc:"64 > 34: Swap elements!",v:{swapped:true}},
{d:[34,64,25,12,22,11,90],h:[1,2],p:{i:1,j:2},desc:"Compare arr[1]=64 with arr[2]=25",v:{}},
{d:[34,25,64,12,22,11,90],h:[1,2],p:{i:1,j:2},desc:"64 > 25: Swap elements!",v:{swapped:true}},
{d:[34,25,12,64,22,11,90],h:[2,3],p:{i:2,j:3},desc:"Continue: 64 > 12, swap",v:{pass:1}},
{d:[25,12,22,11,34,64,90],h:[],p:{pass:2},desc:"After pass 2, larger elements bubble up",v:{progress:"50%"}},
{d:[11,12,22,25,34,64,90],h:[],p:{},desc:"✓ Array sorted!",v:{sorted:true,comparisons:21}}
];
let cur=0,playing=false,timer=null;
function render(){
const s=steps[cur],mx=Math.max(...s.d),viz=document.getElementById('viz');
viz.innerHTML=s.d.map((v,i)=>{
const ht=Math.max((v/mx)*220,35),hl=s.h.includes(i),ptrs=Object.entries(s.p).filter(([_,x])=>x===i).map(([n])=>n);
return '<div class="bar-wrap"><div class="bar '+(hl?'highlight':'normal')+'" style="height:'+ht+'px"><span>'+v+'</span></div><div class="idx">'+i+'</div>'+ptrs.map(p=>'<div class="ptr">'+p+'</div>').join('')+'</div>';
}).join('');
document.getElementById('sn').textContent=cur+1;
document.getElementById('ts').textContent=steps.length;
document.getElementById('desc').textContent=s.desc;
document.getElementById('vars').innerHTML=Object.entries(s.v||{}).map(([k,v])=>'<div class="var"><b>'+k+'</b> = <span>'+JSON.stringify(v)+'</span></div>').join('');
document.getElementById('prev').disabled=cur===0;
document.getElementById('next').disabled=cur===steps.length-1;
}
function next(){if(cur<steps.length-1){cur++;render()}else if(playing)toggle()}
function prev(){if(cur>0){cur--;render()}}
function toggle(){
playing=!playing;
document.getElementById('play').textContent=playing?'⏸ Pause':'▶ Play';
if(playing)timer=setInterval(()=>{if(cur<steps.length-1)next();else toggle()},1200);
else clearInterval(timer);
}
function reset(){if(playing)toggle();cur=0;render()}
render();
</script></body></html>`;
};
