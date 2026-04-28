import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock Database Arrays ---
const users = [];

// --- Routes ---

// 1. Auth Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Mock Authentication Logic
  if (email && password) {
    res.json({ token: 'mock_jwt_token_123', user: { email, role: 'user' } });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.json({ message: 'User registered successfully!' });
});

// 2. AI Explanation Endpoint (Mocking Claude API)
app.post('/api/ai/explain', (req, res) => {
  const { algorithm, dataSize } = req.body;
  const n = Number.isFinite(Number(dataSize)) ? Number(dataSize) : undefined;
  res.json({
    explanation: `This is an AI-generated explanation for ${algorithm}${n ? ` with input size ${n}` : ''}. It utilizes a standard strategy to optimize performance constraints.`,
    complexity: {
      time: 'O(N log N)',
      space: 'O(1)',
    },
    analogy: 'Think of it like sorting a massive deck of cards by continually splitting it in half.',
  });
});

// 3. Admin Usage Endpoint
app.get('/api/admin/usage', (req, res) => {
  res.json({
    totalUsers: users.length || 154,
    totalExecutions: 8529,
    activeAlgorithms: 24,
  });
});

export default app;
