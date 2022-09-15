import express from 'express';
import dotenv from 'dotenv';
import { dataBaseConnection } from './dataBase/dataBase';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import orderRouter from './routes/orderRoutes';
import cardRouter from './routes/cardRoutes';
import authRouter from './routes/authRoutes';

dotenv.config();

const server = express();

dataBaseConnection(process.env.MONGO_URL || 'Your DB URL');

server.listen(3000, () => console.log('Server is started'));

server.use(express.json());

server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/product', productRouter);
server.use('/api/order', orderRouter);
server.use('/api/card', cardRouter);
