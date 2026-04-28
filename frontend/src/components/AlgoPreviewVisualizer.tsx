import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Info } from 'lucide-react';
import { ALGO_DATABASE } from '../utils/algoData';

interface AlgoPreviewVisualizerProps {
  algoName: string;
  showControls?: boolean;
  isLarge?: boolean;
  dataSize?: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const AlgoPreviewVisualizer: React.FC<AlgoPreviewVisualizerProps> = ({ algoName, showControls = false, isLarge = false, dataSize = 10 }) => {
  const name = algoName;
  const steps = ALGO_DATABASE[name]?.steps || ["Algorithm visualization is currently loading..."];
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 4000);
    }
    if (!timer) return;
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep(prev => (prev - 1 + steps.length) % steps.length);
  };

  const renderVisual = () => {
    const n = name.toLowerCase();
    const height = isLarge ? 'h-full' : 'h-64';
    const containerClass = `flex items-center justify-center ${height} w-full relative p-1 md:p-4`;

    // --- UNIT I: DIVIDE & CONQUER ---

    if (n === 'quick sort') {
      const bars = [30, 70, 50, 90, 20, 60, 40];
      const pivotIdx = 6;
      return (
        <div className={containerClass}>
          <div className="flex items-end justify-center gap-2 md:gap-4 h-full w-full pt-10">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: `${h}%`,
                  backgroundColor: i === pivotIdx ? '#f43f5e' : (currentStep >= 1 && i < currentStep ? '#818cf8' : '#334155'),
                  scale: i === currentStep ? 1.1 : 1,
                  y: i === currentStep ? -10 : 0
                }}
                className="flex-1 rounded-t-lg relative shadow-lg min-w-[10px] md:min-w-[14px]"
              >
                {i === pivotIdx && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-black text-rose-400 whitespace-nowrap">PIVOT</div>}
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    if (n === 'merge sort') {
      return (
        <div className={containerClass}>
          <div className="flex flex-col items-center justify-center gap-8 md:gap-16 w-full h-full">
            <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
              {[40, 20, 60, 10].map((h, i) => (
                <motion.div key={i} animate={{ y: currentStep >= 1 ? 40 : 0, x: currentStep >= 1 ? (i < 2 ? -20 : 20) : 0 }} className="w-10 h-10 md:w-16 md:h-16 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center text-sm md:text-xl font-bold shadow-xl">{h}</motion.div>
              ))}
            </div>
            <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 3 ? -20 : 0 }} className="flex gap-4 md:gap-12 flex-wrap justify-center">
              <div className="flex gap-2 p-2 md:p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-lg flex items-center justify-center font-bold text-xs md:text-base">20</div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-lg flex items-center justify-center font-bold text-xs md:text-base">40</div>
              </div>
              <div className="flex gap-2 p-2 md:p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-xs md:text-base">10</div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-xs md:text-base">60</div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    if (n === 'binary search') {
      const len = clamp(Math.floor(dataSize), 5, 21);
      const arr = Array.from({ length: len }, (_, i) => (i + 1) * 10);
      const mid = Math.floor(arr.length / 2);
      return (
        <div className={containerClass}>
           <div className="flex gap-1 md:gap-2 flex-wrap justify-center max-w-full">
              {arr.map((v, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: (currentStep === 0 && i === mid) || (currentStep === 1 && i === mid) ? 1.15 : 1,
                    backgroundColor: (currentStep >= 1 && i === mid) ? '#818cf8' : (currentStep >= 2 && i > mid) ? '#1e293b' : '#334155',
                    opacity: (currentStep >= 2 && i > mid) ? 0.3 : 1
                  }}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl border border-slate-700 flex items-center justify-center font-bold shadow-lg text-xs md:text-base"
                >
                  {v}
                </motion.div>
              ))}
           </div>
           <motion.div 
            animate={{ y: currentStep === 0 ? 0 : currentStep === 1 ? 0 : 0 }}
            className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 text-indigo-400 font-bold text-xs md:text-sm"
           >
             {currentStep === 0 ? `Target: ${arr[mid]}` : currentStep === 1 ? "Found!" : "Searching..."}
           </motion.div>
        </div>
      );
    }

    if (n === 'heap sort') {
      return (
        <div className={containerClass}>
           <div className="flex flex-col items-center justify-center gap-8 w-full h-full max-w-[720px] mx-auto">
              <div className="relative w-full aspect-[16/9] max-h-[55vh]">
                 <motion.div animate={{ scale: currentStep === 0 ? 1.2 : 1 }} className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center font-bold shadow-xl shadow-rose-500/20">90</motion.div>
                 <div className="absolute left-1/4 top-16 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">70</div>
                 <div className="absolute right-1/4 top-16 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">80</div>
                 <div className="absolute left-[10%] top-32 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">40</div>
              </div>
              <div className="flex gap-2">
                 <motion.div animate={{ x: currentStep >= 2 ? 100 : 0, opacity: currentStep >= 2 ? 0 : 1 }} className="w-10 h-10 bg-rose-500/20 border border-rose-500/50 rounded flex items-center justify-center font-bold">90</motion.div>
                 <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded flex items-center justify-center font-bold">80</div>
                 <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded flex items-center justify-center font-bold">70</div>
              </div>
           </div>
        </div>
      );
    }

    // --- UNIT II: GREEDY ---

    if (n === 'fractional knapsack') {
      return (
        <div className={containerClass}>
           <div className="flex items-center justify-center gap-10 w-full h-full max-w-[900px] mx-auto">
              <div className="flex flex-col gap-2">
                 {[ {v:60, w:10, r:6}, {v:100, w:20, r:5}, {v:120, w:30, r:4} ].map((item, i) => (
                   <motion.div 
                    key={i} 
                    animate={{ x: currentStep > i ? 20 : 0, opacity: currentStep > i ? 0.3 : 1, borderColor: currentStep === i ? '#818cf8' : '#334155' }}
                    className="p-3 border rounded-xl bg-slate-900/50 flex flex-col items-center"
                   >
                     <span className="text-xs font-bold">${item.v}</span>
                     <span className="text-[10px] text-slate-500">{item.w}kg</span>
                     <span className="text-[8px] text-indigo-400 font-black">Ratio: {item.r}</span>
                   </motion.div>
                 ))}
              </div>
              <div className="w-32 h-40 border-4 border-dashed border-slate-700 rounded-3xl relative flex flex-col-reverse p-2 overflow-hidden">
                 <motion.div animate={{ height: currentStep >= 1 ? '30%' : 0 }} className="w-full bg-indigo-500/40 rounded-xl mb-1 flex items-center justify-center text-[10px] font-bold">10kg</motion.div>
                 <motion.div animate={{ height: currentStep >= 2 ? '50%' : 0 }} className="w-full bg-indigo-500/60 rounded-xl mb-1 flex items-center justify-center text-[10px] font-bold">20kg</motion.div>
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 uppercase">Knapsack</div>
              </div>
           </div>
        </div>
      );
    }

    if (n === 'huffman coding') {
      return (
        <div className={containerClass}>
           <div className="flex flex-col items-center justify-center gap-6 w-full h-full max-w-[720px] mx-auto">
              <div className="flex gap-4">
                 <motion.div animate={{ opacity: currentStep >= 1 ? 0.2 : 1 }} className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center"><span className="font-bold">A</span><span className="text-xs text-slate-500">5</span></motion.div>
                 <motion.div animate={{ opacity: currentStep >= 1 ? 0.2 : 1 }} className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center"><span className="font-bold">B</span><span className="text-xs text-slate-500">2</span></motion.div>
                 <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center"><span className="font-bold">C</span><span className="text-xs text-slate-500">9</span></div>
              </div>
              <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0, scale: currentStep >= 2 ? 1 : 0.5 }} className="relative h-32 w-48 border border-indigo-500/20 rounded-3xl flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-indigo-500 border-4 border-indigo-900 flex items-center justify-center font-bold">7</div>
                 <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">A</div>
                 <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">B</div>
              </motion.div>
           </div>
        </div>
      );
    }

    if (n.includes('dijkstra') || n.includes('prim') || n.includes('kruskal')) {
      const isMST = n.includes('prim') || n.includes('kruskal');
      return (
        <div className={containerClass}>
           <svg className="w-full h-full max-w-[900px] max-h-[60vh]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <line x1="20" y1="50" x2="50" y2="20" stroke="#334155" strokeWidth="1" />
              <line x1="20" y1="50" x2="50" y2="80" stroke="#334155" strokeWidth="1" />
              <line x1="50" y1="20" x2="80" y2="50" stroke="#334155" strokeWidth="1" />
              <line x1="50" y1="80" x2="80" y2="50" stroke="#334155" strokeWidth="1" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="#334155" strokeWidth="1" />
              
              {currentStep >= 1 && <motion.line x1="20" y1="50" x2="50" y2="20" stroke={isMST ? "#10b981" : "#818cf8"} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
              {currentStep >= 2 && <motion.line x1="50" y1="20" x2="80" y2="50" stroke={isMST ? "#10b981" : "#818cf8"} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
              {currentStep >= 3 && isMST && <motion.line x1="20" y1="50" x2="50" y2="80" stroke="#10b981" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
              
              {[{x:20,y:50,l:'S'}, {x:50,y:20,l:'1'}, {x:50,y:80,l:'2'}, {x:80,y:50,l:'E'}].map((p, i) => (
                <g key={i}>
                  <motion.circle 
                    cx={p.x} cy={p.y} r="6" 
                    animate={{ 
                      fill: (i === 0 || (currentStep >= 1 && i === 1) || (currentStep >= 2 && i === 3) || (currentStep >= 3 && i === 2)) ? (isMST ? '#10b981' : '#818cf8') : '#1e293b',
                      stroke: (currentStep === i) ? '#fff' : '#334155'
                    }}
                    strokeWidth="0.5"
                  />
                  <text x={p.x} y={p.y} textAnchor="middle" dy=".3em" fill="white" fontSize="4" fontWeight="900">{p.l}</text>
                </g>
              ))}
           </svg>
        </div>
      );
    }

    // --- UNIT III: DYNAMIC PROGRAMMING ---

    if (n === '0/1 knapsack' || n.includes('matrix') || n.includes('floyd')) {
      const isFloyd = n.includes('floyd');
      return (
        <div className={containerClass}>
           <div className="grid grid-cols-6 grid-rows-5 gap-2 w-full h-full max-w-[920px] max-h-[60vh]">
              {Array.from({length: 30}).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const active = currentStep === 0 ? (row === 1) : (currentStep === 1 ? (row === 2) : (row <= 4));
                return (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      backgroundColor: active ? 'rgba(129, 140, 248, 0.2)' : 'transparent',
                      borderColor: active ? '#818cf8' : '#334155',
                      scale: (row === Math.min(currentStep + 1, 4)) ? 1.05 : 1
                    }}
                    className="border rounded-lg flex items-center justify-center text-xs md:text-sm font-bold text-slate-400"
                  >
                    {active ? (isFloyd ? (row === col ? 0 : Math.floor(Math.random() * 20)) : Math.floor(Math.random() * 50)) : ''}
                  </motion.div>
                );
              })}
           </div>
        </div>
      );
    }

    if (n === 'multistage graph') {
      return (
        <div className={containerClass}>
           <div className="flex gap-12 md:gap-20 items-center justify-center w-full h-full max-w-[900px] mx-auto">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">S</div>
              <div className="flex flex-col gap-8">
                 <motion.div animate={{ borderColor: currentStep >= 1 ? '#818cf8' : '#334155' }} className="w-12 h-12 rounded-full border-2 flex items-center justify-center">A</motion.div>
                 <motion.div animate={{ borderColor: currentStep >= 2 ? '#818cf8' : '#334155' }} className="w-12 h-12 rounded-full border-2 flex items-center justify-center">B</motion.div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center font-bold">E</div>
           </div>
           <svg className="absolute inset-0 pointer-events-none">
              <motion.line x1="30%" y1="50%" x2="45%" y2="35%" stroke="#818cf8" strokeWidth="3" animate={{ opacity: currentStep >= 1 ? 1 : 0.2 }} />
              <motion.line x1="30%" y1="50%" x2="45%" y2="65%" stroke="#818cf8" strokeWidth="3" animate={{ opacity: currentStep >= 2 ? 1 : 0.2 }} />
           </svg>
        </div>
      );
    }

    // --- UNIT IV: BACKTRACKING ---

    if (n === 'n-queens') {
      const boardN = clamp(Math.floor(dataSize), 4, 12);
      // Mock placements across steps just for visualization
      const placementsByStep: Array<Array<[number, number]>> = [
        [[0, 0]],
        [[0, 0], [1, 2]],
        [[0, 0], [1, 2], [2, 1]],
        [[0, 1], [1, 3], [2, 0], [3, 2]],
      ];
      const placements = placementsByStep[Math.min(currentStep, placementsByStep.length - 1)] ?? [];

      return (
        <div className={containerClass}>
           <div
             className="w-full max-w-[560px] aspect-square border-2 md:border-4 border-slate-700 bg-slate-900/50 shadow-2xl rounded-2xl overflow-hidden"
             style={{ maxHeight: '100%' }}
           >
             <div
               className="grid w-full h-full"
               style={{ gridTemplateColumns: `repeat(${boardN}, minmax(0, 1fr))` }}
             >
              {Array.from({ length: boardN * boardN }).map((_, i) => {
                const row = Math.floor(i / boardN);
                const col = i % boardN;
                const isQueen = placements.some(([r, c]) => r === row && c === col);
                return (
                  <div
                    key={i}
                    className={`border border-slate-800 flex items-center justify-center relative ${(row + col) % 2 === 0 ? 'bg-slate-800/20' : ''}`}
                  >
                    {isQueen && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }} 
                        animate={{ scale: 1, rotate: 0 }} 
                        className="w-3/5 h-3/5 bg-rose-500 rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center justify-center"
                      >
                        <div className="w-1/2 h-1/2 bg-white/20 rounded-full" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
           </div>
           </div>
        </div>
      );
    }

    if (n === 'graph coloring' || n === 'hamiltonian cycle' || n === 'branch & bound') {
      return (
        <div className={containerClass}>
           <div className="flex flex-col items-center justify-center gap-10 w-full h-full max-w-[820px] mx-auto">
              <div className="relative w-full max-w-[720px] aspect-[16/9] flex justify-center">
                 <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center">R</div>
                 <motion.div animate={{ opacity: currentStep >= 1 ? 1 : 0 }} className="absolute left-0 top-20 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold">C1</motion.div>
                 <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0 }} className="absolute right-0 top-20 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold">C2</motion.div>
                 <svg className="absolute inset-0 -z-10">
                    <line x1="50%" y1="30%" x2="10%" y2="80%" stroke="#334155" />
                    <line x1="50%" y1="30%" x2="90%" y2="80%" stroke="#334155" />
                 </svg>
              </div>
              <div className="glass-panel px-6 py-2 border border-slate-700 text-xs font-bold text-slate-400">
                {currentStep === 0 ? "Exploring State Space..." : currentStep === 1 ? "Pruning Branch (Bound Exceeded)" : "Optimal Solution Found"}
              </div>
           </div>
        </div>
      );
    }

    // --- UNIT V: ADVANCED ---

    if (n === 'fibonacci heap') {
      return (
        <div className={containerClass}>
           <div className="flex gap-10 items-start justify-center w-full h-full max-w-[720px] mx-auto">
              <div className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">10</div>
                 <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-xs">20</div>
              </div>
              <motion.div animate={{ scale: currentStep >= 1 ? 1.2 : 1 }} className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center font-bold shadow-lg shadow-rose-500/20">5</motion.div>
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">15</div>
           </div>
        </div>
      );
    }

    if (n === 'max flow') {
      return (
        <div className={containerClass}>
           <div className="flex gap-10 md:gap-20 items-center justify-center w-full h-full max-w-[900px] mx-auto">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-bold">S</div>
              <div className="relative w-40 h-10 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                 <motion.div 
                    animate={{ width: currentStep === 0 ? '30%' : (currentStep === 1 ? '70%' : '100%') }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                 />
                 <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{currentStep === 0 ? '10/50' : currentStep === 1 ? '35/50' : '50/50'}</div>
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-bold">T</div>
           </div>
        </div>
      );
    }

    if (n === 'approximation' || n === 'np-complete') {
      return (
        <div className={containerClass}>
           <div className="flex flex-col items-center gap-8">
              <div className="flex gap-20 items-end">
                 <div className="flex flex-col items-center gap-2">
                    <div className="h-40 w-12 bg-emerald-500/20 border border-emerald-500 rounded-t-lg relative">
                       <motion.div animate={{ height: '80%' }} className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg" />
                    </div>
                    <span className="text-[10px] font-bold">Optimal</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="h-40 w-12 bg-rose-500/20 border border-rose-500 rounded-t-lg relative">
                       <motion.div animate={{ height: currentStep >= 1 ? '95%' : '0%' }} className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg" />
                    </div>
                    <span className="text-[10px] font-bold">Approx</span>
                 </div>
              </div>
              <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0 }} className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                P = NP? Ratio ≤ 2.0
              </motion.div>
           </div>
        </div>
      );
    }

    // FINAL FALLBACK (Highly stylized if something is missed)
    return (
      <div className={containerClass}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-4 border-dashed border-indigo-500/20 rounded-full flex items-center justify-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-[4px] opacity-50" />
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
           <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
           <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-950/80 px-4 py-1 backdrop-blur-sm rounded-full border border-slate-800">Visualizing {name}...</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`glass-panel border border-slate-800 overflow-hidden bg-slate-900/30 flex flex-col ${isLarge ? 'p-6 md:p-10' : 'p-4 md:p-6'} h-full min-h-0`}>
      {/* Top Info */}
      <div className={`flex justify-between items-start ${isLarge ? 'mb-4 md:mb-6' : 'mb-4'}`}>
        <div className="max-w-2xl min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visual Logic Guide</span>
          </div>
          <div className={`${isLarge ? 'max-h-32 md:max-h-36' : 'max-h-20'} overflow-auto pr-2 custom-scrollbar`}>
            <h4 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-base'} font-black text-white leading-tight break-words`}>
              {steps[currentStep]}
            </h4>
          </div>
        </div>
        <div className="flex gap-1.5 pt-2">
           {steps.map((_: string, i: number) => (
             <motion.div 
              key={i} 
              animate={{ 
                width: i === currentStep ? 24 : 8,
                backgroundColor: i === currentStep ? '#818cf8' : '#334155'
              }}
              className="h-2 rounded-full transition-all" 
             />
           ))}
        </div>
      </div>

      {/* Main Visual Area */}
      <div className="flex-1 min-h-0 bg-slate-950/80 rounded-[2.5rem] border border-slate-800/50 p-3 md:p-6 flex items-stretch justify-stretch relative overflow-hidden shadow-inner">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
          >
            {renderVisual()}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Controls */}
      <div className={`${isLarge ? 'mt-5 md:mt-8' : 'mt-5'} flex items-center justify-between`}>
        <div className="flex gap-3">
           <button onClick={handlePrev} className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shadow-xl active:scale-95">
             <ChevronLeft className="w-6 h-6" />
           </button>
           <button onClick={handleNext} className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shadow-xl active:scale-95">
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-2xl active:scale-95 ${
              isPlaying ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {isPlaying ? <><Pause className="w-4 h-4" /> AUTO-PLAY ON</> : <><Play className="w-4 h-4" /> RESUME PLAY</>}
          </button>
          <button onClick={() => {setCurrentStep(0); setIsPlaying(false);}} className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition-all shadow-xl active:scale-95">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgoPreviewVisualizer;
