import { config } from './config/config';
import mongoose from 'mongoose';

const dbUrl = config.DATABASE.DB_NAME as string;
const connectToDataBase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the db');
  } catch (error) {
    console.error('Failed to connect to the db', error);
  }
};
export default connectToDataBase;
