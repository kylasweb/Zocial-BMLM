import mongoose from 'mongoose';
import { errorHandler } from '../utils/errorHandling';

const connectDB = async () => {
  try {
    // Use Netlify environment variables
    const dbUri = process.env.MONGODB_URI;
    
    if (!dbUri) {
      throw new Error('MongoDB URI is not defined');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    // Connect to MongoDB
    await mongoose.connect(dbUri, options);

    console.log('MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', async (error) => {
      await errorHandler.handleError(error, {
        context: 'database_connection',
        critical: true
      });
    });

    mongoose.connection.on('disconnected', async () => {
      await errorHandler.handleError(new Error('Database disconnected'), {
        context: 'database_connection',
        critical: true
      });
    });

  } catch (error) {
    await errorHandler.handleError(error, {
      context: 'database_connection',
      critical: true
    });
    process.exit(1);
  }
};

export default connectDB;