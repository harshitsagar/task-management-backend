require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./ormconfig');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3002; // Use environment port or 3002

// CORS for production
app.use(cors({
  origin: '*', // Allow all origins for now
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize database and start server
connection.then(() => {
  console.log('✅ Database connected successfully');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('❌ Database connection failed:', error);
  process.exit(1);
});