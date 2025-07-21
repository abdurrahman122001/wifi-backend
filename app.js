// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const planRoutes = require('./routes/planRoutes');
const authRoutes = require('./routes/authRoutes');
const logoRoutes = require('./routes/logoRoutes');
const silderRoutes = require('./routes/silderRoutes');
const content1Routes = require('./routes/content1Routes');
const content2Routes = require('./routes/content2Routes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4100',
  credentials: true,
}));
// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/plans', planRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logo', logoRoutes);
app.use('/api/silder', silderRoutes);
app.use('/api/content1', content1Routes);
app.use('/api/content2', content2Routes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware (basic)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
