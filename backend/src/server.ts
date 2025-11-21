import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import roleRoutes from './routes/roleRoutes';
import { requireAuth } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-app.vercel.app'], // Add your Vercel URL later
  credentials: true
}));

app.use(express.json());

// Public routes (no auth required)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Protected routes (auth required)
app.use('/api/employees', requireAuth, employeeRoutes);
app.use('/api/roles', requireAuth, roleRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ API available at http://localhost:${PORT}/api`);
});