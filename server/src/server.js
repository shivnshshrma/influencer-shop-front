const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const wishlistRoutes = require('./routes/wishlist');
const influencersRoutes = require('./routes/influencers');
const recommendationsRoutes = require('./routes/recommendations');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/influencers', influencersRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (should be last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for: ${process.env.FRONTEND_URL || 'https://localhost:8080'}`);
});

module.exports = app;