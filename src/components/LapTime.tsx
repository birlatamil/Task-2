
import React from 'react';

interface LapTimeProps {
  lapNumber: number;
  time: number;
  formatTime: (time: number) => string;
  isLatest: boolean;
}

const LapTime: React.FC<LapTimeProps> = ({ lapNumber, time, formatTime, isLatest }) => {
  return (
    <div className={`flex justify-between items-center p-3 rounded-lg transition-all duration-200 ${
      isLatest 
        ? 'bg-blue-600/20 border border-blue-500/30 animate-fade-in' 
        : 'bg-slate-700/30 border border-slate-600/20'
    }`}>
      <div className="flex items-center gap-3">
        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
          isLatest 
            ? 'bg-blue-500 text-white' 
            : 'bg-slate-600 text-slate-300'
        }`}>
          #{lapNumber}
        </span>
        {isLatest && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
            Latest
          </span>
        )}
      </div>
      <span className="font-mono text-lg font-semibold text-white">
        {formatTime(time)}
      </span>
    </div>
  );
};

export default LapTime;
