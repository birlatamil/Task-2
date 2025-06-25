
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LapTime from './LapTime';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (isRunning && time > 0) {
      setLapTimes(prev => [time, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">Stopwatch</h1>
              </div>
              <p className="text-slate-400 text-sm">Precision timing at your fingertips</p>
            </div>

            {/* Time Display */}
            <div className="text-center mb-8">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-600/30">
                <div className="font-mono text-4xl md:text-5xl font-bold text-white tracking-wider">
                  {formatTime(time)}
                </div>
                <div className="text-slate-400 text-sm mt-2">MM:SS.CS</div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleStartPause}
                className={`flex-1 h-14 text-lg font-semibold transition-all duration-200 ${
                  isRunning 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-14 px-6 border-slate-600 text-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Lap Button */}
            {isRunning && (
              <Button
                onClick={handleLap}
                variant="outline"
                className="w-full h-12 border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 mb-6"
              >
                Record Lap
              </Button>
            )}

            {/* Lap Times */}
            {lapTimes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Lap Times
                </h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                  {lapTimes.map((lapTime, index) => (
                    <LapTime
                      key={index}
                      lapNumber={lapTimes.length - index}
                      time={lapTime}
                      formatTime={formatTime}
                      isLatest={index === 0}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stopwatch;
