import React from 'react';

interface VisualizerProps {
  htmlContent: string | null;
  isLoading: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ htmlContent, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-space-900">
        <div className="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-lg">Generating visualization...</p>
        <p className="text-slate-500 text-sm mt-2">This may take a few seconds</p>
      </div>
    );
  }

  if (!htmlContent) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-space-900">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-lg">Click "Visualize" to see your algorithm in action</p>
        <p className="text-sm text-slate-500 mt-2">Watch your code execute step by step</p>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={htmlContent}
      className="w-full h-full border-0"
      title="Algorithm Visualization"
      sandbox="allow-scripts"
    />
  );
};

export default Visualizer;
