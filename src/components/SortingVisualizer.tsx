import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, StepForward, StepBack, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { getMergeSortSteps } from '../algorithms/MergeSort';
import type { SortStep } from '../algorithms/MergeSort';

const generateRandomArray = (length: number = 20) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);
};

export default function SortingVisualizer({ algoName = 'Merge Sort', dataSize = 20, generationTrigger = 0 }: { algoName?: string, dataSize?: number, generationTrigger?: number }) {
  const [array, setArray] = useState<number[]>(generateRandomArray(dataSize));
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(300);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [inputError, setInputError] = useState('');

  const parseManualArray = () => {
    if (!manualInput.trim()) {
      setInputError('Please enter some values');
      return;
    }
    
    // Support both space and comma-separated values
    const newArr = manualInput
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(s => s)
      .map(s => {
        const num = parseInt(s);
        return isNaN(num) ? null : num;
      })
      .filter((n): n is number => n !== null);
    
    if (newArr.length === 0) {
      setInputError('No valid numbers found. Please enter numbers only.');
      setTimeout(() => setInputError(''), 3000);
      return;
    }

    if (newArr.length > 50) {
      setInputError('Too many values! Maximum 50 values allowed.');
      setTimeout(() => setInputError(''), 3000);
      return;
    }

    if (newArr.some(n => n < 1 || n > 100)) {
      setInputError('All values must be between 1 and 100.');
      setTimeout(() => setInputError(''), 3000);
      return;
    }

    setArray(newArr);
    setManualInput('');
    setInputError('');
  };


  // When array resets, regenerate steps mapped to 0
  useEffect(() => {
    const newSteps = getMergeSortSteps(array);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array]);

  // Handle Video Generation Trigger
  useEffect(() => {
    if (generationTrigger > 0) {
      setArray(generateRandomArray(dataSize));
      setTimeout(() => setIsPlaying(true), 200); // Auto-play when video generation completes
    }
  }, [generationTrigger, dataSize]);

  // Handle Play/Pause
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, speedMs);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const currentStep = steps[currentStepIndex] || { 
    array, comparing: [], swapping: [], activeRange: null, message: "Ready to sort" 
  };

  useEffect(() => {
    if (audioEnabled && isPlaying) {
      import('../utils/sonification').then(({ initAudioContext, playNote }) => {
        initAudioContext();
        if (currentStep.comparing.length > 0) {
          currentStep.comparing.forEach(idx => {
             playNote(currentStep.array[idx], 10, 100, idx, currentStep.array.length, speedMs);
          });
        } else if (currentStep.swapping.length > 0) {
          currentStep.swapping.forEach(idx => {
             playNote(currentStep.array[idx], 10, 100, idx, currentStep.array.length, speedMs);
          });
        }
      });
    }
  }, [currentStepIndex, audioEnabled, isPlaying, currentStep, speedMs]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setArray(generateRandomArray(dataSize));
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
             <h3 className="text-xl font-bold text-white mb-1">{algoName} Visualization</h3>
             <p className="text-slate-400 text-sm">{currentStep.message || "Press play to start"}</p>
          </div>
        </div>

        {/* Custom Values Input Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-4 mb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-300">📊 Enter Custom Values</span>
              <span className="text-xs text-slate-400">({array.length} {array.length === 1 ? 'value' : 'values'})</span>
            </div>
            <div className="flex gap-2 items-stretch">
              <input 
                type="text" 
                value={manualInput} 
                onChange={e => setManualInput(e.target.value)} 
                placeholder="e.g. 32 40 50 60 or 32, 40, 50, 60"
                className={`flex-1 bg-slate-900/50 border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder-slate-500 ${
                  inputError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                onKeyDown={e => e.key === 'Enter' && parseManualArray()}
              />
              <button 
                onClick={parseManualArray} 
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm rounded-lg transition-all active:scale-95"
              >
                Set Array
              </button>
            </div>
            {inputError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                ⚠️ {inputError}
              </p>
            )}
            {!inputError && (
              <p className="text-xs text-slate-400">💡 Tip: Separate values with spaces or commas. Values should be 1-100. Max 50 values.</p>
            )}
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button onClick={handleReset} className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors underline decoration-dashed underline-offset-2">Random Data</button>
          </div>

          <label className="text-slate-300 text-sm flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg">
            Speed: 
            <input 
               type="range" min="10" max="1000" step="10" 
               value={1010 - speedMs} 
               onChange={(e) => setSpeedMs(1010 - parseInt(e.target.value))}
               className="accent-indigo-500 w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="flex-1 glass-panel flex flex-col justify-end p-8 relative overflow-hidden min-h-[400px]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Value Display Above Bars */}
        <div className="relative z-20 mb-2 flex items-end justify-center w-full h-12 gap-1 md:gap-2 px-2">
          <AnimatePresence>
            {currentStep.array.map((val, idx) => {
              return (
                <motion.div
                  key={`label-${idx}`}
                  initial={false}
                  className="flex-1 flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-300 h-full"
                >
                  <span>{val}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex items-end justify-center w-full flex-1 gap-1 md:gap-2">
          <AnimatePresence>
            {currentStep.array.map((val, idx) => {
              const heightPercentage = `${val}%`;
              let barColor = "bg-indigo-400";
              let shadow = "shadow-indigo-500/20";

              if (currentStep.comparing.includes(idx)) {
                barColor = "bg-amber-400";
                shadow = "shadow-amber-400/40";
              } else if (currentStep.swapping.includes(idx)) {
                barColor = "bg-pink-500";
                shadow = "shadow-pink-500/50";
              } else if (currentStep.activeRange && idx >= currentStep.activeRange[0] && idx <= currentStep.activeRange[1]) {
                barColor = "bg-indigo-300";
              }

              // Finished state highlight
              if (currentStepIndex === steps.length - 1) {
                  barColor = "bg-emerald-400";
                  shadow = "shadow-emerald-500/30";
              }

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{ height: heightPercentage }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`w-4 md:w-12 rounded-t-sm shadow-lg ${barColor} ${shadow} flex items-end justify-center pb-2 transition-colors duration-200 min-h-[20px]`}
                  title={`Value: ${val}`}
                >
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center justify-center gap-6">
        <button 
           onClick={handleReset}
           className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button 
           onClick={handlePrev}
           disabled={currentStepIndex === 0}
           className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <StepBack className="w-5 h-5" />
        </button>

        <button 
           onClick={() => setIsPlaying(!isPlaying)}
           className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>

        <button 
           onClick={handleNext}
           disabled={currentStepIndex >= steps.length - 1}
           className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <StepForward className="w-5 h-5" />
        </button>

        <button 
           onClick={() => setAudioEnabled(!audioEnabled)}
           className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${audioEnabled ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
           title={audioEnabled ? "Disable Audio Sonification" : "Enable Audio Sonification"}
        >
          {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
