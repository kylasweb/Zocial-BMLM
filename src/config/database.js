import mongoose from 'mongoose';
import { errorHandler } from '../utils/errorHandling';

const connectDB = async () => {
  try {
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
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      compressors: ['zlib'],
    };

    await mongoose.connect(dbUri, options);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', async (error) => {
      await errorHandler.handleError(error, {
        context: 'database_connection',
        severity: 'high'
      });
    });

    mongoose.connection.on('disconnected', async () => {
      await errorHandler.handleError(new Error('Database disconnected'), {
        context: 'database_connection',
        severity: 'high'
      });
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    await errorHandler.handleError(error, {
      context: 'database_connection_initial',
      severity: 'critical'
    });
    process.exit(1);
  }
};

export default connectDB;
