import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Download, Star, Trophy, Zap, Lock, CheckCircle, Filter, Award, Flame } from 'lucide-react';

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  ytId: string;
  description: string;
  difficulty: CourseDifficulty;
  xp: number;
  duration: string;
  topics: string[];
  badge: 'bronze' | 'silver' | 'gold' | 'platinum';
  locked?: boolean;
}

export const MOCK_COURSES: Course[] = [
  // BEGINNER (15 COURSES)
  { id: '1', title: 'Data Structures Crash Course', thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/mqdefault.jpg', ytId: 'RBSGKlAvoiM', description: 'A rapid overview of arrays, linked lists, trees, and graphs — perfect for beginners.', difficulty: 'Beginner', xp: 100, duration: '3h 20m', topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'], badge: 'bronze' },
  { id: '2', title: 'Big-O Notation Explained', thumbnail: 'https://img.youtube.com/vi/V6mKVRU1evU/mqdefault.jpg', ytId: 'V6mKVRU1evU', description: 'Understand time and space complexity from scratch with easy visual examples.', difficulty: 'Beginner', xp: 80, duration: '1h 45m', topics: ['Time Complexity', 'Space Complexity', 'Big-O'], badge: 'bronze' },
  { id: '3', title: 'Recursion Masterclass', thumbnail: 'https://img.youtube.com/vi/IJDJ0kBx2LM/mqdefault.jpg', ytId: 'IJDJ0kBx2LM', description: 'Conquer recursion from base cases to tree recursion and memoization.', difficulty: 'Beginner', xp: 120, duration: '2h 10m', topics: ['Base Cases', 'Call Stack', 'Recursion'], badge: 'bronze' },
  { id: '4', title: 'Arrays & Strings Deep Dive', thumbnail: 'https://img.youtube.com/vi/OatX68f1i8c/mqdefault.jpg', ytId: 'OatX68f1i8c', description: 'Master the most fundamental data structures in programming.', difficulty: 'Beginner', xp: 90, duration: '2h 30m', topics: ['Arrays', 'Strings', 'Sliding Window'], badge: 'bronze' },
  { id: '5', title: 'Linked Lists Simplified', thumbnail: 'https://img.youtube.com/vi/H5I1shifU0U/mqdefault.jpg', ytId: 'H5I1shifU0U', description: 'Understanding pointers and nodes through single and double linked lists.', difficulty: 'Beginner', xp: 110, duration: '1h 50m', topics: ['Nodes', 'Pointers', 'Singly Linked'], badge: 'bronze' },
  { id: '6', title: 'Stacks & Queues', thumbnail: 'https://img.youtube.com/vi/wjI1WNcIntg/mqdefault.jpg', ytId: 'wjI1WNcIntg', description: 'LIFO and FIFO principles explained with real-world examples.', difficulty: 'Beginner', xp: 100, duration: '1h 15m', topics: ['Stack', 'Queue', 'LIFO'], badge: 'bronze' },
  { id: '7', title: 'Hashing & Hash Tables', thumbnail: 'https://img.youtube.com/vi/knV86IfRBJk/mqdefault.jpg', ytId: 'knV86IfRBJk', description: 'How to achieve O(1) search time using hash functions.', difficulty: 'Beginner', xp: 130, duration: '2h 00m', topics: ['Hashing', 'Collision', 'Map'], badge: 'bronze' },
  { id: '8', title: 'Intro to Binary Trees', thumbnail: 'https://img.youtube.com/vi/-O7iqt_V_6A/mqdefault.jpg', ytId: '-O7iqt_V_6A', description: 'The foundation of hierarchical data structures.', difficulty: 'Beginner', xp: 140, duration: '2h 45m', topics: ['Binary Tree', 'Leaf Nodes', 'Height'], badge: 'bronze' },
  { id: '9', title: 'Selection Sort Visualized', thumbnail: 'https://img.youtube.com/vi/EwjnF6nS_94/mqdefault.jpg', ytId: 'EwjnF6nS_94', description: 'Simple but inefficient sorting for small data sets.', difficulty: 'Beginner', xp: 70, duration: '45m', topics: ['Sorting', 'In-place', 'Min Element'], badge: 'bronze' },
  { id: '10', title: 'Bubble Sort Explained', thumbnail: 'https://img.youtube.com/vi/xli_FiBnJNo/mqdefault.jpg', ytId: 'xli_FiBnJNo', description: 'The classic introductory sorting algorithm.', difficulty: 'Beginner', xp: 60, duration: '30m', topics: ['Bubble Sort', 'Swapping', 'Loops'], badge: 'bronze' },
  { id: '11', title: 'Insertion Sort for Dummies', thumbnail: 'https://img.youtube.com/vi/JU767SDMDvA/mqdefault.jpg', ytId: 'JU767SDMDvA', description: 'Like sorting a deck of cards in your hands.', difficulty: 'Beginner', xp: 75, duration: '1h 00m', topics: ['Insertion', 'Sorting', 'Arrays'], badge: 'bronze' },
  { id: '12', title: 'Linear vs Binary Search', thumbnail: 'https://img.youtube.com/vi/nfA8aCidr-8/mqdefault.jpg', ytId: 'nfA8aCidr-8', description: 'Comparison of the two most common searching techniques.', difficulty: 'Beginner', xp: 85, duration: '1h 20m', topics: ['Search', 'Binary', 'Linear'], badge: 'bronze' },
  { id: '13', title: 'Intro to Algorithms', thumbnail: 'https://img.youtube.com/vi/rL8X2MLNHPM/mqdefault.jpg', ytId: 'rL8X2MLNHPM', description: 'What is an algorithm and why do we need them?', difficulty: 'Beginner', xp: 50, duration: '50m', topics: ['Logic', 'Problem Solving', 'Basics'], badge: 'bronze' },
  { id: '14', title: 'C++ Pointers Masterclass', thumbnail: 'https://img.youtube.com/vi/rtmwqe_H6-c/mqdefault.jpg', ytId: 'rtmwqe_H6-c', description: 'The scary truth about memory management.', difficulty: 'Beginner', xp: 150, duration: '3h 30m', topics: ['Pointers', 'Memory', 'C++'], badge: 'bronze' },
  { id: '15', title: 'Python DS Basics', thumbnail: 'https://img.youtube.com/vi/D3S-E8S5vW0/mqdefault.jpg', ytId: 'D3S-E8S5vW0', description: 'Using Python lists and dictionaries effectively.', difficulty: 'Beginner', xp: 110, duration: '2h 15m', topics: ['Python', 'Lists', 'Dicts'], badge: 'bronze' },

  // INTERMEDIATE (15 COURSES)
  { id: '16', title: 'Algorithms Full Course', thumbnail: 'https://img.youtube.com/vi/0IAPZzGSbME/mqdefault.jpg', ytId: '0IAPZzGSbME', description: 'Deep dive into algorithmic complexity, sorting, and dynamic programming.', difficulty: 'Intermediate', xp: 250, duration: '5h 00m', topics: ['Sorting', 'Searching', 'DP'], badge: 'silver' },
  { id: '17', title: 'Sorting Algos Visualized', thumbnail: 'https://img.youtube.com/vi/g-PGLbMth_g/mqdefault.jpg', ytId: 'g-PGLbMth_g', description: 'Merge, Quick, and Heap sort side by side.', difficulty: 'Intermediate', xp: 200, duration: '2h 30m', topics: ['Merge', 'Quick', 'Heap'], badge: 'silver' },
  { id: '18', title: 'Graph Algos Bootcamp', thumbnail: 'https://img.youtube.com/vi/tWVWeAqZ0WU/mqdefault.jpg', ytId: 'tWVWeAqZ0WU', description: 'BFS, DFS, Dijkstra, and Bellman-Ford traversal.', difficulty: 'Intermediate', xp: 300, duration: '4h 15m', topics: ['BFS', 'DFS', 'Dijkstra'], badge: 'silver' },
  { id: '19', title: 'Interview Prep Bootcamp', thumbnail: 'https://img.youtube.com/vi/pkYVOmU3MgA/mqdefault.jpg', ytId: 'pkYVOmU3MgA', description: 'Cracking the coding interview with DS and Algos.', difficulty: 'Intermediate', xp: 280, duration: '3h 50m', topics: ['Interview', 'LeetCode', 'Problems'], badge: 'silver' },
  { id: '20', title: 'Binary Search Trees (BST)', thumbnail: 'https://img.youtube.com/vi/cySVml6e_AY/mqdefault.jpg', ytId: 'cySVml6e_AY', description: 'Efficient searching and insertion in hierarchical structures.', difficulty: 'Intermediate', xp: 180, duration: '2h 10m', topics: ['BST', 'Search', 'Binary Tree'], badge: 'silver' },
  { id: '21', title: 'Heaps & Priority Queues', thumbnail: 'https://img.youtube.com/vi/HqPJF2L5h9U/mqdefault.jpg', ytId: 'HqPJF2L5h9U', description: 'Managing elements with priorities efficiently.', difficulty: 'Intermediate', xp: 190, duration: '1h 45m', topics: ['Max Heap', 'Min Heap', 'PQ'], badge: 'silver' },
  { id: '22', title: 'AVL Trees & Self Balancing', thumbnail: 'https://img.youtube.com/vi/jDM6_TnYIqE/mqdefault.jpg', ytId: 'jDM6_TnYIqE', description: 'Maintaining balance in trees for guaranteed O(log N).', difficulty: 'Intermediate', xp: 220, duration: '2h 40m', topics: ['AVL', 'Rotation', 'Balance'], badge: 'silver' },
  { id: '23', title: 'Greedy Algorithms Guide', thumbnail: 'https://img.youtube.com/vi/HzeK7g8uy0U/mqdefault.jpg', ytId: 'HzeK7g8uy0U', description: 'Making the locally optimal choice at each step.', difficulty: 'Intermediate', xp: 210, duration: '2h 20m', topics: ['Greedy', 'Knapsack', 'Optimal'], badge: 'silver' },
  { id: '24', title: 'Prims Algorithm MST', thumbnail: 'https://img.youtube.com/vi/cplfcGZmX7I/mqdefault.jpg', ytId: 'cplfcGZmX7I', description: 'Minimum Spanning Trees using vertex expansion.', difficulty: 'Intermediate', xp: 230, duration: '1h 30m', topics: ['MST', 'Prim', 'Graph'], badge: 'silver' },
  { id: '25', title: 'Kruskal Algorithm MST', thumbnail: 'https://img.youtube.com/vi/fAuF0EuZVCk/mqdefault.jpg', ytId: 'fAuF0EuZVCk', description: 'MST using edge sorting and Union-Find.', difficulty: 'Intermediate', xp: 230, duration: '1h 30m', topics: ['Kruskal', 'MST', 'Disjoint Set'], badge: 'silver' },
  { id: '26', title: 'Disjoint Set Union (DSU)', thumbnail: 'https://img.youtube.com/vi/ayW5B2W9hfo/mqdefault.jpg', ytId: 'ayW5B2W9hfo', description: 'Managing disjoint sets with path compression.', difficulty: 'Intermediate', xp: 240, duration: '2h 00m', topics: ['DSU', 'Union-Find', 'Sets'], badge: 'silver' },
  { id: '27', title: 'Trie Data Structure', thumbnail: 'https://img.youtube.com/vi/giiaIofn31A/mqdefault.jpg', ytId: 'giiaIofn31A', description: 'Efficient prefix matching for strings.', difficulty: 'Intermediate', xp: 200, duration: '1h 40m', topics: ['Trie', 'Prefix', 'Auto-complete'], badge: 'silver' },
  { id: '28', title: 'Topological Sort', thumbnail: 'https://img.youtube.com/vi/eL-KzMXSXXI/mqdefault.jpg', ytId: 'eL-KzMXSXXI', description: 'Ordering tasks with dependencies.', difficulty: 'Intermediate', xp: 210, duration: '1h 10m', topics: ['DAG', 'Graph', 'Sorting'], badge: 'silver' },
  { id: '29', title: 'Strongly Connected Components', thumbnail: 'https://img.youtube.com/vi/RpgcYky7Ykw/mqdefault.jpg', ytId: 'RpgcYky7Ykw', description: 'Tarjan and Kosaraju algorithms.', difficulty: 'Intermediate', xp: 260, duration: '2h 50m', topics: ['SCC', 'Kosaraju', 'Tarjan'], badge: 'silver' },
  { id: '30', title: 'Backtracking 101', thumbnail: 'https://img.youtube.com/vi/Zq4upTEaQyM/mqdefault.jpg', ytId: 'Zq4upTEaQyM', description: 'The foundation of recursive exploration.', difficulty: 'Intermediate', xp: 190, duration: '1h 55m', topics: ['Backtracking', 'Recursion', 'DFS'], badge: 'silver' },

  // ADVANCED (13 COURSES)
  { id: '31', title: 'DP: Zero to Hero', thumbnail: 'https://img.youtube.com/vi/oBt53YbR9Kk/mqdefault.jpg', ytId: 'oBt53YbR9Kk', description: 'Tackle every DP problem archetype: knapsack, LCS, and more.', difficulty: 'Advanced', xp: 500, duration: '5h 45m', topics: ['Knapsack', 'LCS', 'DP'], badge: 'gold' },
  { id: '32', title: 'IBM: Advanced Algos', thumbnail: 'https://img.youtube.com/vi/8hly31xKli0/mqdefault.jpg', ytId: '8hly31xKli0', description: 'Professional certificate series for enterprise problem solving.', difficulty: 'Advanced', xp: 450, duration: '6h 00m', topics: ['B-Trees', 'Skip Lists', 'Filters'], badge: 'gold' },
  { id: '33', title: 'Branch-and-Bound TSP', thumbnail: 'https://img.youtube.com/vi/A80YzvNwqXA/mqdefault.jpg', ytId: 'A80YzvNwqXA', description: 'Solving NP-Hard problems with pruning.', difficulty: 'Advanced', xp: 420, duration: '4h 30m', topics: ['TSP', 'Bound', 'Optimization'], badge: 'gold' },
  { id: '34', title: 'Matrix Chain Multiplication', thumbnail: 'https://img.youtube.com/vi/prx1psByp7M/mqdefault.jpg', ytId: 'prx1psByp7M', description: 'Optimal matrix grouping for efficiency.', difficulty: 'Advanced', xp: 380, duration: '2h 45m', topics: ['DP', 'Matrices', 'Optimization'], badge: 'gold' },
  { id: '35', title: 'Segment Trees Deep Dive', thumbnail: 'https://img.youtube.com/vi/2bSS8rtFym4/mqdefault.jpg', ytId: '2bSS8rtFym4', description: 'Range queries and point updates in O(log N).', difficulty: 'Advanced', xp: 410, duration: '3h 15m', topics: ['Range Query', 'Tree', 'O(log N)'], badge: 'gold' },
  { id: '36', title: 'Fenwick Trees (BIT)', thumbnail: 'https://img.youtube.com/vi/uSFzHC_L5XI/mqdefault.jpg', ytId: 'uSFzHC_L5XI', description: 'Binary Indexed Trees for prefix sums.', difficulty: 'Advanced', xp: 390, duration: '2h 10m', topics: ['BIT', 'Prefix Sum', 'Tree'], badge: 'gold' },
  { id: '37', title: 'Longest Common Subsequence', thumbnail: 'https://img.youtube.com/vi/LAKWWDX396A/mqdefault.jpg', ytId: 'LAKWWDX396A', description: 'Finding the similarity between two sequences.', difficulty: 'Advanced', xp: 370, duration: '2h 00m', topics: ['LCS', 'DP', 'Strings'], badge: 'gold' },
  { id: '38', title: 'Bellman-Ford & Negative Cycles', thumbnail: 'https://img.youtube.com/vi/FtN3BYH2Zes/mqdefault.jpg', ytId: 'FtN3BYH2Zes', description: 'Shortest paths in graphs with negative weights.', difficulty: 'Advanced', xp: 400, duration: '2h 30m', topics: ['Graph', 'Bellman-Ford', 'Weight'], badge: 'gold' },
  { id: '39', title: 'Floyd-Warshall All-Pairs', thumbnail: 'https://img.youtube.com/vi/4OQeCuLYj-4/mqdefault.jpg', ytId: '4OQeCuLYj-4', description: 'Building the complete distance matrix.', difficulty: 'Advanced', xp: 430, duration: '3h 00m', topics: ['Floyd-Warshall', 'Matrix', 'Shortest Path'], badge: 'gold' },
  { id: '40', title: 'Network Flow: Ford-Fulkerson', thumbnail: 'https://img.youtube.com/vi/Tl90tzh4M4A/mqdefault.jpg', ytId: 'Tl90tzh4M4A', description: 'Maximizing flow through a capacity-constrained graph.', difficulty: 'Advanced', xp: 480, duration: '4h 10m', topics: ['Flow', 'Capacity', 'Residual'], badge: 'gold' },
  { id: '41', title: 'String Matching: KMP', thumbnail: 'https://img.youtube.com/vi/V5-7GzOfADQ/mqdefault.jpg', ytId: 'V5-7GzOfADQ', description: 'Knuth-Morris-Pratt for efficient searching.', difficulty: 'Advanced', xp: 360, duration: '2h 15m', topics: ['KMP', 'String', 'Pattern'], badge: 'gold' },
  { id: '42', title: 'Suffix Trees & Arrays', thumbnail: 'https://img.youtube.com/vi/m2lA6tH_S_w/mqdefault.jpg', ytId: 'm2lA6tH_S_w', description: 'Advanced string indexing and searching.', difficulty: 'Advanced', xp: 490, duration: '4h 45m', topics: ['Suffix', 'String', 'Indexing'], badge: 'gold' },
  { id: '43', title: 'Bitmask Dynamic Programming', thumbnail: 'https://img.youtube.com/vi/6_6zE997dnM/mqdefault.jpg', ytId: '6_6zE997dnM', description: 'Using binary masks for exponential state spaces.', difficulty: 'Advanced', xp: 460, duration: '3h 50m', topics: ['Bitmask', 'DP', 'Subset'], badge: 'gold' },

  // EXPERT (12 COURSES)
  { id: '44', title: 'NP-Completeness Theory', thumbnail: 'https://img.youtube.com/vi/YX40hbAHx3s/mqdefault.jpg', ytId: 'YX40hbAHx3s', description: 'P vs NP and the boundaries of computation.', difficulty: 'Expert', xp: 800, duration: '7h 20m', topics: ['NP', 'P vs NP', 'Cook'], badge: 'platinum', locked: true },
  { id: '45', title: 'Competitive Programming Master', thumbnail: 'https://img.youtube.com/vi/GjpufJoemgs/mqdefault.jpg', ytId: 'GjpufJoemgs', description: 'Advanced techniques for top-tier competitions.', difficulty: 'Expert', xp: 1000, duration: '8h 00m', topics: ['CP', 'Techniques', 'Speed'], badge: 'platinum', locked: true },
  { id: '46', title: 'Fast Fourier Transform (FFT)', thumbnail: 'https://img.youtube.com/vi/h7apO7q16V0/mqdefault.jpg', ytId: 'h7apO7q16V0', description: 'Multiplying polynomials in O(N log N).', difficulty: 'Expert', xp: 850, duration: '4h 30m', topics: ['FFT', 'Math', 'Poly'], badge: 'platinum', locked: true },
  { id: '47', title: 'Approximation Algorithms', thumbnail: 'https://img.youtube.com/vi/vS88m6B8Rpk/mqdefault.jpg', ytId: 'vS88m6B8Rpk', description: 'Near-optimal solutions for NP-Hard problems.', difficulty: 'Expert', xp: 750, duration: '5h 15m', topics: ['Approx', 'Heuristic', 'Optimal'], badge: 'platinum', locked: true },
  { id: '48', title: 'Randomized Algorithms', thumbnail: 'https://img.youtube.com/vi/q_VatvL-SNA/mqdefault.jpg', ytId: 'q_VatvL-SNA', description: 'Using probability to solve deterministic problems.', difficulty: 'Expert', xp: 780, duration: '4h 45m', topics: ['Probability', 'Monte Carlo', 'Las Vegas'], badge: 'platinum', locked: true },
  { id: '49', title: 'Computational Geometry', thumbnail: 'https://img.youtube.com/vi/4m7S6O2XkU0/mqdefault.jpg', ytId: '4m7S6O2XkU0', description: 'Convex hulls, line segments, and Voronoi diagrams.', difficulty: 'Expert', xp: 820, duration: '6h 30m', topics: ['Geometry', 'Convex Hull', 'Sweep Line'], badge: 'platinum', locked: true },
  { id: '50', title: 'Linear Programming & Simplex', thumbnail: 'https://img.youtube.com/vi/K3P6-GvAtV0/mqdefault.jpg', ytId: 'K3P6-GvAtV0', description: 'Optimizing linear objectives with constraints.', difficulty: 'Expert', xp: 880, duration: '7h 00m', topics: ['LP', 'Simplex', 'Optimization'], badge: 'platinum', locked: true },
  { id: '51', title: 'Advanced Graph Theory', thumbnail: 'https://img.youtube.com/vi/8M_XN_lB9mU/mqdefault.jpg', ytId: '8M_XN_lB9mU', description: 'Planar graphs, coloring, and matching theory.', difficulty: 'Expert', xp: 900, duration: '8h 30m', topics: ['Graph', 'Matching', 'Planar'], badge: 'platinum', locked: true },
  { id: '52', title: 'B-Trees & Database Indexing', thumbnail: 'https://img.youtube.com/vi/aZjYr87r1b8/mqdefault.jpg', ytId: 'aZjYr87r1b8', description: 'The engine behind modern databases.', difficulty: 'Expert', xp: 840, duration: '5h 50m', topics: ['B-Tree', 'Disk', 'DB'], badge: 'platinum', locked: true },
  { id: '53', title: 'Persistent Data Structures', thumbnail: 'https://img.youtube.com/vi/T0yzrZL1py0/mqdefault.jpg', ytId: 'T0yzrZL1py0', description: 'Data structures that never forget their past.', difficulty: 'Expert', xp: 860, duration: '4h 20m', topics: ['Persistent', 'Functional', 'History'], badge: 'platinum', locked: true },
  { id: '54', title: 'Parallel Algorithms', thumbnail: 'https://img.youtube.com/vi/lC_S-87p1pY/mqdefault.jpg', ytId: 'lC_S-87p1pY', description: 'Leveraging multi-core processors for speed.', difficulty: 'Expert', xp: 810, duration: '3h 40m', topics: ['Parallel', 'Threads', 'Speedup'], badge: 'platinum', locked: true },
  { id: '55', title: 'Machine Learning Algos Intro', thumbnail: 'https://img.youtube.com/vi/GwIo3gDZCVQ/mqdefault.jpg', ytId: 'GwIo3gDZCVQ', description: 'The math and logic behind gradient descent and SVM.', difficulty: 'Expert', xp: 950, duration: '9h 00m', topics: ['ML', 'Math', 'Descent'], badge: 'platinum', locked: true },
];

export const DIFFICULTY_META: Record<CourseDifficulty, { color: string; bg: string; glow: string; order: number }> = {
  Beginner: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', glow: 'shadow-emerald-500/20', order: 0 },
  Intermediate: { color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', glow: 'shadow-sky-500/20', order: 1 },
  Advanced: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', glow: 'shadow-amber-500/20', order: 2 },
  Expert: { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', glow: 'shadow-rose-500/20', order: 3 },
};

export const BADGE_META = {
  bronze: { label: 'Bronze', icon: '🥉', gradient: 'from-amber-700 to-yellow-600', glow: 'shadow-amber-600/40', ring: 'ring-amber-600/40' },
  silver: { label: 'Silver', icon: '🥈', gradient: 'from-slate-400 to-slate-300', glow: 'shadow-slate-400/40', ring: 'ring-slate-400/40' },
  gold: { label: 'Gold', icon: '🥇', gradient: 'from-yellow-500 to-amber-400', glow: 'shadow-yellow-500/40', ring: 'ring-yellow-500/40' },
  platinum: { label: 'Platinum', icon: '💎', gradient: 'from-cyan-400 to-indigo-400', glow: 'shadow-cyan-400/40', ring: 'ring-cyan-400/40' },
};

type FilterType = 'All' | CourseDifficulty;

function XPBar({ earned, total }: { earned: number; total: number }) {
  const pct = Math.min(100, Math.round((earned / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-indigo-300 font-bold">{earned} XP earned</span>
        <span className="text-slate-500">{total} XP total</span>
      </div>
      <div className="h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </motion.div>
      </div>
      <div className="text-right text-xs text-slate-500 mt-1">{pct}% of total XP</div>
    </div>
  );
}

function BadgeIcon({ badge, size = 'md' }: { badge: Course['badge']; size?: 'sm' | 'md' | 'lg' }) {
  const m = BADGE_META[badge];
  const sz = size === 'sm' ? 'w-7 h-7 text-sm' : size === 'lg' ? 'w-14 h-14 text-3xl' : 'w-10 h-10 text-xl';
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-lg ${m.glow} ring-1 ${m.ring}`}
      title={`${m.label} Badge`}
    >
      <span>{m.icon}</span>
    </div>
  );
}

function AchievementToast({ course, onClose }: { course: Course; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] max-w-sm w-full"
    >
      <div className="glass-panel p-5 border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.2)] bg-slate-900/90">
        <div className="flex items-start gap-4">
          <BadgeIcon badge={course.badge} size="lg" />
          <div className="flex-1">
            <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Trophy className="w-3 h-3" /> Achievement Unlocked!
            </p>
            <p className="text-white font-bold text-sm mb-0.5">{course.title}</p>
            <p className="text-slate-400 text-xs mb-2">Completed — earned {course.xp} XP</p>
            <div className="flex items-center gap-2">
              <BadgeIcon badge={course.badge} size="sm" />
              <span className={`text-xs font-bold bg-gradient-to-r ${BADGE_META[course.badge].gradient} bg-clip-text text-transparent`}>
                {BADGE_META[course.badge].label} Badge Earned!
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-lg leading-none mt-0.5">×</button>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-b-2xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 4.5, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

function StatsBar({ completedCourses, totalXP, earnedXP, streak }: { completedCourses: number; totalXP: number; earnedXP: number; streak: number }) {
  const stats = [
    { icon: <Trophy className="w-5 h-5 text-yellow-400" />, label: 'Completed', value: completedCourses, suffix: `/ ${MOCK_COURSES.length}` },
    { icon: <Zap className="w-5 h-5 text-indigo-400" />, label: 'Total XP', value: earnedXP, suffix: '' },
    { icon: <Flame className="w-5 h-5 text-orange-400" />, label: 'Day Streak', value: streak, suffix: '🔥' },
    {
      icon: <Award className="w-5 h-5 text-cyan-400" />, label: 'Badges', value: ['bronze', 'silver', 'gold', 'platinum'].filter(b =>
        MOCK_COURSES.some(c => c.badge === b && JSON.parse(localStorage.getItem('completed_courses') || '[]').includes(c.id))
      ).length, suffix: '/ 4'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-panel p-4 text-center border border-white/5 hover:border-indigo-500/20 transition-colors"
        >
          <div className="flex justify-center mb-2">{s.icon}</div>
          <div className="text-2xl font-black text-white">{s.value}<span className="text-sm text-slate-500 font-normal ml-1">{s.suffix}</span></div>
          <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Courses() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');
  const [achievement, setAchievement] = useState<Course | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('downloaded_courses');
    if (saved) setDownloadedIds(JSON.parse(saved));
    const comp = localStorage.getItem('completed_courses');
    if (comp) setCompletedIds(JSON.parse(comp));
  }, []);

  const totalXP = MOCK_COURSES.reduce((s, c) => s + c.xp, 0);
  const earnedXP = MOCK_COURSES.filter(c => completedIds.includes(c.id)).reduce((s, c) => s + c.xp, 0);
  const streak = 3; 

  const filters: FilterType[] = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const displayed = filter === 'All'
    ? MOCK_COURSES
    : MOCK_COURSES.filter(c => c.difficulty === filter);

  const grouped = (['Beginner', 'Intermediate', 'Advanced', 'Expert'] as CourseDifficulty[]).map(d => ({
    difficulty: d,
    courses: displayed.filter(c => c.difficulty === d),
  })).filter(g => g.courses.length > 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full overflow-y-auto pb-24 custom-scrollbar">
      <div className="mb-6">
        <h2 className="text-4xl font-black mb-2">Offline <span className="text-gradient">Courses</span></h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Level up your algorithm skills. Earn XP, unlock badges, and track your coding journey.
        </p>
      </div>

      <StatsBar
        completedCourses={completedIds.length}
        totalXP={totalXP}
        earnedXP={earnedXP}
        streak={streak}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-panel p-6 mb-8 border border-indigo-500/10 bg-gradient-to-r from-indigo-900/10 to-purple-900/5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Overall Progress</p>
              <p className="text-xs text-slate-400">{completedIds.length} of {MOCK_COURSES.length} courses completed</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(['bronze', 'silver', 'gold', 'platinum'] as const).map(b => {
              const unlocked = MOCK_COURSES.some(c => c.badge === b && completedIds.includes(c.id));
              return (
                <div key={b} className={`transition-all duration-300 ${unlocked ? 'opacity-100 scale-100' : 'opacity-20 grayscale scale-90'}`}>
                  <BadgeIcon badge={b} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
        <XPBar earned={earnedXP} total={totalXP} />
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex items-center gap-1 text-slate-500 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-semibold">Filter:</span>
        </div>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 ${filter === f
              ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/30'
              : 'bg-slate-900/50 text-slate-400 border-slate-700/50 hover:border-slate-500'
              }`}
          >
            {f}
            {f !== 'All' && (
              <span className="ml-1.5 opacity-60 text-xs">
                ({MOCK_COURSES.filter(c => c.difficulty === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {grouped.map(({ difficulty, courses }) => {
          const meta = DIFFICULTY_META[difficulty];
          return (
            <div key={difficulty}>
              <div className={`flex items-center gap-3 mb-5 px-4 py-2 rounded-xl border ${meta.bg} w-fit`}>
                <span className={`text-lg font-black ${meta.color}`}>{difficulty}</span>
                <span className="text-slate-500 text-sm">· {courses.length} courses</span>
                <BadgeIcon badge={courses[0].badge} size="sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {courses.map((course, idx) => {
                  const isCompleted = completedIds.includes(course.id);
                  const isDownloaded = downloadedIds.includes(course.id);
                  const bm = BADGE_META[course.badge];
                  const dm = DIFFICULTY_META[course.difficulty];
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      whileHover={course.locked ? {} : { y: -4, scale: 1.01 }}
                      className={`glass-panel group overflow-hidden flex flex-col relative ${isCompleted
                        ? `border border-yellow-500/30 shadow-lg ${bm.glow}`
                        : course.locked
                          ? 'border border-slate-700/30 opacity-60'
                          : 'border border-white/5 hover:border-indigo-500/30'
                        } transition-all duration-300`}
                    >
                      {(() => {
                        const idxInDifficulty = courses.findIndex(c => c.id === course.id);
                        const isUnlocked = idxInDifficulty === 0 || completedIds.includes(courses[idxInDifficulty - 1].id);
                        
                        if (!isUnlocked && !isCompleted) {
                          return (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm rounded-2xl">
                              <Lock className="w-10 h-10 text-slate-400 mb-2" />
                              <p className="text-slate-300 font-bold text-sm">Course Locked</p>
                              <p className="text-slate-500 text-xs">Finish previous course to unlock</p>
                            </div>
                          );
                        }
                        return null;
                      })()}

                      {isCompleted && (
                        <div className={`absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${bm.gradient} shadow-lg ${bm.glow}`}>
                          <CheckCircle className="w-3 h-3 text-white" />
                          <span className="text-white text-[10px] font-black">DONE</span>
                        </div>
                      )}

                      <div className="relative aspect-video overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        {!course.locked && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link to={`/courses/${course.id}`}>
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                                <PlayCircle className="w-10 h-10 text-white" />
                              </motion.div>
                            </Link>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 rounded-md text-xs text-slate-300 font-medium backdrop-blur-sm border border-white/5">⏱ {course.duration}</div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${dm.bg} ${dm.color}`}>{course.difficulty}</span>
                          <div className="flex items-center gap-1.5">
                            <BadgeIcon badge={course.badge} size="sm" />
                            <span className={`text-xs font-bold bg-gradient-to-r ${bm.gradient} bg-clip-text text-transparent`}>{bm.label}</span>
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors leading-snug">{course.title}</h3>
                        <p className="text-slate-400 text-xs mb-3 line-clamp-2 flex-1">{course.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.topics.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">{t}</span>
                          ))}
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>Course XP</span>
                            <span className="text-indigo-400 font-bold">+{course.xp} XP</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <motion.div className={`h-full rounded-full bg-gradient-to-r ${bm.gradient}`} initial={{ width: 0 }} animate={{ width: isCompleted ? '100%' : '0%' }} transition={{ duration: 0.8, delay: idx * 0.07 + 0.3 }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <Link
                            to={course.locked ? '#' : `/courses/${course.id}`}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold text-center transition-all duration-200 ${course.locked ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : isCompleted ? `bg-gradient-to-r ${bm.gradient} text-white shadow-lg ${bm.glow}` : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/20 hover:border-indigo-500/40'}`}
                            onClick={e => course.locked && e.preventDefault()}
                          >
                            {isCompleted ? '▶ Review' : 'Start Course'}
                          </Link>
                          <span className={`p-2 rounded-xl border ${isDownloaded ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700/50'}`}>
                            <Download className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {achievement && (
          <AchievementToast course={achievement} onClose={() => setAchievement(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
