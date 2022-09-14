import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dataBaseConnection = async (dbURL: string) => {
  try {
    await mongoose.connect(dbURL);
    console.log('DB connected');
  } catch (err) {
    throw new Error(`DB connection failed, ${err}`);
  }
};
