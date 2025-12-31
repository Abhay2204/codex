
import React, { useRef } from 'react';
import { VisualizationType, VisualizationFrame } from '../types';
import html2canvas from 'html2canvas';
import { Download, Video, Search } from 'lucide-react';

interface VisualizerProps {
  type: VisualizationType;
  frame: VisualizationFrame | null;
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ type, frame, isPlaying }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: 'png' | 'video') => {
      if (containerRef.current) {
          try {
              // Simple screenshot export for now
              const canvas = await html2canvas(containerRef.current, { backgroundColor: '#1A1F3A' });
              const link = document.createElement('a');
              link.download = `codex-viz-${Date.now()}.png`;
              link.href = canvas.toDataURL();
              link.click();
              // Note: Full video/GIF export would require frame recording logic which is complex
              // without ffmpeg.wasm or similar heavy libraries.
              if (format === 'video') {
                  alert("Video export simulation: Recording started... (Feature limited in this demo)");
              }
          } catch (e) {
              console.error("Export failed", e);
          }
      }
  };

  if (!frame) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500">
        <p>Run code to visualize execution</p>
      </div>
    );
  }

  // --- Renderers ---

  const renderArray = () => {
    let data: number[] = Array.isArray(frame.data) ? frame.data : [0,0,0,0];
    const maxVal = Math.max(...data, 10);
    
    return (
      <div className="flex items-end gap-2 h-40">
        {data.map((val, idx) => {
          const isHighlighted = frame.highlights?.includes(idx);
          const heightPerc = (typeof val === 'number' ? val / maxVal : 0.5) * 100;
          return (
            <div key={idx} className="flex flex-col items-center gap-2 group relative">
              <div 
                className={`w-10 rounded-t-md transition-all duration-300 ${isHighlighted ? 'bg-electric' : 'bg-slate-600'}`}
                style={{ height: `${Math.max(heightPerc, 10)}%` }}
              >
                <span className="block text-center text-xs mt-1 text-white font-mono opacity-0 group-hover:opacity-100">{val}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">{idx}</div>
              {/* Pointers Overlay */}
              {Object.entries(frame.pointers || {}).map(([name, pIdx]) => (
                  pIdx === idx && (
                      <div key={name} className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyber uppercase">
                          {name}
                      </div>
                  )
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStack = () => {
      let data: any[] = Array.isArray(frame.data) ? frame.data : [];
      return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse w-24 min-h-[250px] border-l-2 border-r-2 border-b-2 border-slate-500 rounded-b-lg p-2 gap-1 relative bg-space-900/50">
                {data.map((val, idx) => {
                    const isNew = idx === data.length - 1;
                    return (
                        <div key={idx} className={`h-10 w-full rounded flex items-center justify-center font-bold text-white shadow-sm border border-white/10 ${isNew ? 'bg-electric animate-in slide-in-from-top duration-300' : 'bg-slate-700'}`}>
                            {val}
                        </div>
                    );
                })}
                <div className="absolute -left-12 bottom-0 text-xs text-slate-500 -rotate-90 origin-right">Stack Frame</div>
            </div>
        </div>
      );
  };

  const renderQueue = () => {
      let data: any[] = Array.isArray(frame.data) ? frame.data : [];
      return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-2 border-t-2 border-b-2 border-slate-500 py-4 px-8 min-w-[300px] min-h-[80px] relative bg-space-900/50 overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-slate-500 -rotate-90">Front</div>
                {data.map((val, idx) => (
                    <div key={idx} className="w-12 h-12 flex-shrink-0 bg-cyber rounded flex items-center justify-center text-white font-bold border border-white/10 animate-in slide-in-from-right duration-300">
                        {val}
                    </div>
                ))}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-500 rotate-90">Rear</div>
            </div>
        </div>
      );
  };

  const renderHashMap = () => {
      const data = typeof frame.data === 'object' ? frame.data : {};
      return (
          <div className="grid grid-cols-1 gap-2 w-full max-w-md">
              {Object.entries(data).map(([key, value], idx) => {
                  const isHighlighted = frame.highlights?.includes(idx); // Simplified highlight logic
                  return (
                    <div key={key} className={`flex border rounded-lg overflow-hidden ${isHighlighted ? 'border-electric shadow-[0_0_10px_rgba(0,102,255,0.3)]' : 'border-white/10'}`}>
                        <div className="bg-slate-700 px-4 py-3 text-slate-300 font-mono w-1/3 border-r border-white/10 truncate" title={key}>
                            {key}
                        </div>
                        <div className="bg-space-800 px-4 py-3 text-electric font-mono flex-1 flex items-center">
                            {String(value)}
                        </div>
                    </div>
                  );
              })}
              {Object.keys(data).length === 0 && <div className="text-slate-500 italic text-center">Empty Map</div>}
          </div>
      );
  };

  const renderHeap = () => {
     // Reusing basic tree structure visualization for Heap, but enforcing complete binary tree layout
     return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
         <div className="text-xs text-slate-500 absolute top-2 left-2">Min/Max Heap Representation</div>
         {/* Mock visual for demo purposes since generic tree rendering is complex without d3/specialized lib */}
         <div className="relative w-64 h-48">
             {/* Root */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-electric border border-white flex items-center justify-center z-20 shadow-lg text-white font-bold">
                 {Array.isArray(frame.data) ? frame.data[0] : 'R'}
             </div>
             {/* Edges */}
             <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-16 border-l-2 border-r-2 border-t-2 border-slate-600 rounded-t-full -z-10 transform scale-x-110 origin-top"></div>
             {/* Children */}
             <div className="absolute top-16 left-[20%] w-10 h-10 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center z-10 text-slate-300">
                {Array.isArray(frame.data) && frame.data[1] !== undefined ? frame.data[1] : ''}
             </div>
             <div className="absolute top-16 right-[20%] w-10 h-10 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center z-10 text-slate-300">
                {Array.isArray(frame.data) && frame.data[2] !== undefined ? frame.data[2] : ''}
             </div>
         </div>
         <div className="mt-4 text-xs text-slate-400 bg-space-900 px-3 py-1 rounded-full border border-white/10">
             Array Rep: {JSON.stringify(frame.data)}
         </div>
      </div>
     );
  };

  const renderContent = () => {
      switch(type) {
          case VisualizationType.Array: return renderArray();
          case VisualizationType.Stack: return renderStack();
          case VisualizationType.Queue: return renderQueue();
          case VisualizationType.HashMap: return renderHashMap();
          case VisualizationType.Heap: return renderHeap();
          case VisualizationType.Tree: 
          default:
            return (
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-space-800 rounded-full mb-4 animate-pulse"><Search size={32} className="text-slate-500" /></div>
                    <p className="text-slate-400">Visualization for {type} is simulated.</p>
                </div>
            );
      }
  };

  return (
    <div className="w-full h-full flex bg-space-900" ref={containerRef}>
      {/* Main Visualization Area */}
      <div className="flex-1 flex flex-col relative border-r border-white/5">
         <div className="absolute top-3 right-3 flex gap-2 z-10">
             <button onClick={() => handleExport('png')} className="p-2 bg-space-800 hover:bg-space-700 rounded-lg text-slate-400 hover:text-white transition-colors border border-white/5" title="Export Image">
                 <Download size={16} />
             </button>
             <button onClick={() => handleExport('video')} className="p-2 bg-space-800 hover:bg-space-700 rounded-lg text-slate-400 hover:text-white transition-colors border border-white/5" title="Export Video">
                 <Video size={16} />
             </button>
         </div>
         
         <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            {renderContent()}
         </div>
         
         <div className="h-16 border-t border-white/5 bg-space-800/50 flex items-center px-6">
            <div className="flex-1">
                <span className="text-electric font-mono text-sm mr-2 font-bold">Step {frame.line}:</span>
                <span className="text-slate-300 text-sm">{frame.description}</span>
            </div>
            {isPlaying && (
                <div className="flex items-center gap-2 px-3 py-1 bg-neon/10 border border-neon/20 rounded-full animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-neon"></div>
                    <span className="text-xs text-neon font-mono uppercase tracking-wider">Live</span>
                </div>
            )}
         </div>
      </div>

      {/* Variable Inspector Panel */}
      <div className="w-64 bg-space-800 border-l border-white/5 flex flex-col">
          <div className="p-3 border-b border-white/5 bg-space-900/50 font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Variables
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
              {frame.variables && Object.keys(frame.variables).length > 0 ? (
                  Object.entries(frame.variables).map(([key, val]) => (
                      <div key={key} className="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-0">
                          <span className="text-cyber font-bold">{key}</span>
                          <span className="text-slate-300 break-all bg-space-900 p-2 rounded border border-white/5">
                              {JSON.stringify(val)}
                          </span>
                      </div>
                  ))
              ) : (
                  <div className="text-slate-500 italic text-center py-4">No variables tracked</div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Visualizer;
