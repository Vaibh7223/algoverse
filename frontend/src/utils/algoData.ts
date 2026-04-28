// SYLLABUS DATA
export const SYLLABUS = [
  { unit: 'UNIT I',  title: 'Divide & Conquer',    algoCount: 4, algos: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Heap Sort'] },
  { unit: 'UNIT II', title: 'Greedy Algorithms',   algoCount: 4, algos: ['Fractional Knapsack', 'Huffman Coding', 'Kruskal / Prim', 'Dijkstra'] },
  { unit: 'UNIT III',title: 'Dynamic Programming', algoCount: 4, algos: ['Matrix Chain Multiplication', '0/1 Knapsack', 'Floyd Warshall', 'Multistage Graph'] },
  { unit: 'UNIT IV', title: 'Backtracking',        algoCount: 4, algos: ['N-Queens', 'Graph Coloring', 'Hamiltonian Cycle', 'Branch & Bound'] },
  { unit: 'UNIT V',  title: 'Advanced & NP',       algoCount: 4, algos: ['Fibonacci Heap', 'Max Flow', 'Approximation', 'NP-Complete'] },
];

export const ALGO_DATABASE: Record<string, any> = {
    // UNIT I
    'Quick Sort': {
      explanation: 'Quick Sort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. The key process is partition(). Target of partitions is to put x (the pivot) at its correct position in sorted array.',
      complexity: { time: 'O(N log N) avg', space: 'O(log N)' },
      analogy: 'Imagine organizing books by picking one book as a standard. All books smaller than it go to the left, all books larger go to the right. Repeat for the small groups!',
      steps: [
        'Pick a pivot element from the array (usually the last element).',
        'Partitioning: Move all elements smaller than pivot to its left and larger to its right.',
        'Pivot is now in its final sorted position.',
        'Recursively apply the same steps to the left and right sub-arrays.'
      ]
    },
    'Heap Sort': {
      explanation: 'Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the minimum element and place the minimum element at the beginning.',
      complexity: { time: 'O(N log N)', space: 'O(1)' },
      analogy: 'Like organizing a sports tournament bracket (Max-Heap) where the absolute strongest team always floats to the top, and then extracting them one by one.',
      steps: [
        'Build a Max Heap from the input data.',
        'The largest item is now at the root of the heap.',
        'Swap the root with the last item and reduce heap size by one.',
        'Heapify the root to maintain Max Heap property and repeat.'
      ]
    },
    'Binary Search': {
      explanation: 'Binary Search is an efficient interval-searching algorithm working on sorted arrays. It repeatedly divides the search interval in half.',
      complexity: { time: 'O(log N)', space: 'O(1)' },
      analogy: 'Searching for a word in a dictionary: you open the book in the middle, determine if the word comes before or after, and then tear the book in half and repeat.',
      steps: [
        'Compare target with the middle element of the sorted array.',
        'If target matches, we found it!',
        'If target is smaller, repeat the search on the left half.',
        'If target is larger, repeat the search on the right half.'
      ]
    },
    'Merge Sort': {
      explanation: 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
      complexity: { time: 'O(N log N)', space: 'O(N)' },
      analogy: 'Imagine splitting a giant deck of cards repeatedly until you have single cards, and then smartly mixing them back together in order.',
      steps: [
        'Divide the unsorted list into n sublists, each containing one element.',
        'Repeatedly merge sublists to produce new sorted sublists.',
        'Compare the smallest elements of each sublist during merging.',
        'Continue until there is only one sublist remaining.'
      ]
    },
    
    // UNIT II - GREEDY
    'Fractional Knapsack': {
      explanation: 'A greedy algorithm where we calculate the ratio (value/weight) for each item and sort them in descending order to maximize total value while staying under the weight limit.',
      complexity: { time: 'O(N log N)', space: 'O(1)' },
      analogy: 'Like packing a backpack with gold dust and silver dust: you take as much gold dust as you can fit first, since it has the highest value per ounce.',
      steps: [
        'Calculate value/weight ratio for all items.',
        'Sort items in descending order of this ratio.',
        'Take as much of the top-ratio item as possible.',
        'Repeat for the next item until the knapsack is full.'
      ]
    },
    'Huffman Coding': {
      explanation: 'A lossless data compression algorithm. The idea is to assign variable-length codes to input characters, lengths of the assigned codes are based on the frequencies of corresponding characters.',
      complexity: { time: 'O(N log N)', space: 'O(N)' },
      analogy: 'Like writing shorthand: using the shortest possible symbols for the letters you type most often (like vowels) and longer symbols for rare letters (like Z or Q).',
      steps: [
        'Calculate the frequency of each character in the data.',
        'Create a leaf node for each character and add them to a priority queue.',
        'Extract two nodes with lowest frequency and create a new internal node.',
        'Repeat until only one node (the root) remains in the tree.'
      ]
    },
    'Kruskal / Prim': {
      explanation: 'Greedy algorithms that find a minimum spanning tree for a weighted undirected graph. They find a subset of the edges that forms a tree that includes every vertex computationally minimizing the total weight of all the edges.',
      complexity: { time: 'O(E log E) / O(V^2)', space: 'O(V)' },
      analogy: 'Connecting a network of separate islands with bridges using the absolute minimum amount of concrete required so every island can be reached.',
      steps: [
        'Kruskal: Sort all edges by weight and add the smallest if it doesn\'t form a cycle.',
        'Prim: Start from a node and always add the cheapest edge connecting to an unvisited node.',
        'Continue adding edges until all vertices are connected.',
        'The resulting set of edges forms the Minimum Spanning Tree.'
      ]
    },
    'Dijkstra': {
      explanation: 'Finds the shortest path from a starting node to all other nodes in a weighted graph. It maintains a set of unvisited nodes and purely calculates tentative distances.',
      complexity: { time: 'O(V^2)', space: 'O(V)' },
      analogy: 'A GPS incrementally expanding out from your car, testing every possible side road to absolutely guarantee the shortest route to your destination.',
      steps: [
        'Set distance to start node as 0 and all other nodes as infinity.',
        'Pick the unvisited node with the smallest tentative distance.',
        'Update distances of its neighbors through the current node.',
        'Mark current node as visited and repeat until all nodes are visited.'
      ]
    },

    // UNIT III - DP
    'Matrix Chain Multiplication': {
      explanation: 'A dynamic programming algorithm that figures out the most efficient way to multiply a given sequence of matrices. The problem is not actually to perform the multiplications, but merely to decide the sequence.',
      complexity: { time: 'O(N^3)', space: 'O(N^2)' },
      analogy: 'Trying to find the smartest sequence to snap Lego blocks together so you use the absolute minimum amount of force possible.',
      steps: [
        'Define a table to store the minimum costs of multiplying sub-chains.',
        'Fill the table diagonally for chains of length 2, 3, etc.',
        'For each chain length, try all possible split points.',
        'Store the optimal split point and total cost for each sub-chain.'
      ]
    },
    '0/1 Knapsack': {
      explanation: 'Unlike fractional, we cannot break items. We build a DP table row by row checking what happens to the maximum possible value if we decide to include or exclude each item for every possible weight capacity.',
      complexity: { time: 'O(N * W)', space: 'O(N * W)' },
      analogy: 'A thief packing a bag with solid items like TVs and laptops. You can’t break a TV in half, you either take the whole thing or leave it.',
      steps: [
        'Create a DP table with items as rows and weight capacities as columns.',
        'For each item, decide whether to include it or not for every capacity.',
        'If included, add item value to the best value for remaining capacity.',
        'The bottom-right cell of the table contains the maximum total value.'
      ]
    },
    'Floyd Warshall': {
      explanation: 'An algorithm for finding shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles) between ALL pairs of vertices using a matrix.',
      complexity: { time: 'O(V^3)', space: 'O(V^2)' },
      analogy: 'Building a master distance chart that shows the exact mileage between every single pair of cities in the country at once.',
      steps: [
        'Initialize a distance matrix with edge weights (infinity if no edge).',
        'Iterate through each vertex k as an intermediate point.',
        'Update the distance between nodes i and j if path through k is shorter.',
        'Repeat for all possible intermediate vertices.'
      ]
    },
    'Multistage Graph': {
      explanation: 'A directed graph in which the vertices are partitioned into k ≥ 2 disjoint sets. DP is used to find the minimum cost path from source node to sink node by evaluating stages backwards.',
      complexity: { time: 'O(V + E)', space: 'O(V)' },
      analogy: 'Planning a road trip with mandatory stops in different states (stages) and figuring out the absolute cheapest combination of hotels to reach the final state.',
      steps: [
        'Partition the graph into stages from source to sink.',
        'Calculate minimum cost to reach the sink from nodes in the last stage.',
        'Work backwards stage by stage using pre-calculated costs.',
        'The path with minimum cost from source is the optimal route.'
      ]
    },

    // UNIT IV - BACKTRACKING
    'N-Queens': {
      explanation: 'Classic backtracking problem. The goal is to place N chess queens on an N×N chessboard so that no two queens threaten each other.',
      complexity: { time: 'O(N!)', space: 'O(N)' },
      analogy: 'Trying to comfortably seat guests who all hate each other at a dinner table by constantly moving them if a fight breaks out until peace is achieved.',
      steps: [
        'Try placing a queen in the first available row of the current column.',
        'Check if the position is safe from other queens (horizontal/diagonal).',
        'If safe, move to the next column and repeat.',
        'If no safe position exists, backtrack to the previous column and try a new row.'
      ]
    },
    'Graph Coloring': {
      explanation: 'Assigning a color to each vertex of a graph such that no two adjacent vertices share the exact same color, backtracking through options utilizing at most m colors.',
      complexity: { time: 'O(m^V)', space: 'O(V)' },
      analogy: 'Drawing a map of the world and making sure no two countries that share a border are painted the same color.',
      steps: [
        'Try assigning the first available color to the current vertex.',
        'Check if the color is different from all adjacent vertices.',
        'If safe, move to the next vertex and repeat.',
        'If no color works, backtrack to the previous vertex and change its color.'
      ]
    },
    'Hamiltonian Cycle': {
      explanation: 'Determines whether there exists a closed loop on a given graph that visits every single vertex exactly once and returns to the starting vertex.',
      complexity: { time: 'O(N!)', space: 'O(V)' },
      analogy: 'A traveling salesman attempting to visit every city exactly one time and end up right back home.',
      steps: [
        'Start at a vertex and add it to the current path.',
        'Pick an adjacent vertex that hasn\'t been visited yet.',
        'If all vertices visited and last node connects to start, we found it.',
        'If stuck, backtrack to the previous node and try a different neighbor.'
      ]
    },
    'Branch & Bound': {
      explanation: 'An algorithm design paradigm for discrete and combinatorial optimization problems. It systematically enumerates candidate solutions by state space search and actively prunes branches that cannot yield better results.',
      complexity: { time: 'O(2^N)', space: 'O(2^N)' },
      analogy: 'Searching for the lowest price on a set of flights, and immediately closing any tabs where the price exceeds a lower price you already found elsewhere.',
      steps: [
        'Generate candidate solutions in a search tree structure.',
        'Calculate a "bound" (optimistic estimate) for each branch.',
        'If a branch\'s bound is worse than the best solution found, discard (prune) it.',
        'Explore the most promising branches first to find better bounds early.'
      ]
    },

    // UNIT V - ADVANCED
    'Fibonacci Heap': {
      explanation: 'A data structure for priority queue operations, consisting of a collection of heap-ordered trees heavily utilizing lazy evaluation algorithms to delay work as long as possible.',
      complexity: { time: 'O(1) amortized', space: 'O(N)' },
      analogy: 'A highly efficient hospital triage system where patients are vaguely grouped by emergency-level, and only strictly sorted exactly when doctors are ready.',
      steps: [
        'Insert new nodes as single-tree heaps in a root list.',
        'Keep track of the minimum node for O(1) access.',
        'During Extract-Min, consolidate trees of the same degree.',
        'Consolidation reduces the number of trees and maintains efficiency.'
      ]
    },
    'Max Flow': {
      explanation: 'The Ford-Fulkerson method calculates the maximum possible flow in a directed chart from the source to the sink without exceeding any edge capacity constraints.',
      complexity: { time: 'O(E * V^2)', space: 'O(V)' },
      analogy: 'Pumping the absolute maximum amount of water through a complex network of city pipes from a reservoir without bursting any small pipes.',
      steps: [
        'Initialize flow of all edges to 0.',
        'Find an augmenting path from source to sink in the residual graph.',
        'Determine the residual capacity (bottleneck) along this path.',
        'Increase flow along the path and update residual capacities until no path exists.'
      ]
    },
    'Approximation': {
      explanation: 'Used to strictly find near-optimal solutions to NP-hard optimization problems within a guaranteed mathematical bound (like 2-approximation for Vertex Cover).',
      complexity: { time: 'Polynomial', space: 'Polynomial' },
      analogy: 'Accepting an incredibly accurate "good enough" answer immediately rather than waiting 1,000 years for the absolute perfect mathematical answer.',
      steps: [
        'Identify an NP-Hard problem that cannot be solved quickly.',
        'Apply a heuristic or simplified strategy to find a solution.',
        'Prove that the found solution is within a fixed ratio (e.g., 2x) of the optimal.',
        'Execute the algorithm in polynomial time for practical usage.'
      ]
    },
    'NP-Complete': {
      explanation: 'A classification of decision problems where any given solution to the problem can be verified quickly, but there is no known efficient way to actively locate a solution in the first place.',
      complexity: { time: 'O(2^N)', space: 'O(N)' },
      analogy: 'Solving a 10,000 piece jigsaw puzzle: It’s incredibly difficult to put together, but anyone can instantly verify if it’s solved correctly by looking at it.',
      steps: [
        'Verify if a proposed solution is correct (easy/polynomial time).',
        'Recognize that finding the solution requires checking exponential possibilities.',
        'Reduce existing NP-Complete problems to this one to prove its difficulty.',
        'Understand that solving one efficiently would solve all NP-Complete problems.'
      ]
    }

};
