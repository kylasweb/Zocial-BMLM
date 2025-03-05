import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import connectDB from './config/database';
import { requestLogger } from './middleware/requestLogger';
import { requestId } from './middleware/requestId';
import { bodyParser } from './middleware/bodyParser';
import { sanitizer } from './middleware/sanitizer';
import { errorMiddleware } from './middleware/errorHandler';
import investmentPlanRoutes from './routes/investmentPlanRoutes';

const app = express();

// Connect to database
connectDB();

// Request identification
app.use(requestId);

// Logging
app.use(requestLogger);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id']
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Body parsing
app.use(bodyParser);

// Sanitization
app.use(sanitizer);

// Compression
app.use(compression());

// Routes
app.use('/api/investment-plans', investmentPlanRoutes);

// Error handling
app.use(errorMiddleware);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    code: 'NOT_FOUND',
    requestId: req.id
  });
});

export default app;
