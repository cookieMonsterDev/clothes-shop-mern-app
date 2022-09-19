import express from 'express';
import dotenv from 'dotenv';
import { dataBaseConnection } from './dataBase/dataBase';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import orderRouter from './routes/orderRoutes';
import authRouter from './routes/authRoutes';
import errorHandler from './controls/middleware/errorsMiddleware';
import cartRouter from './routes/cartRoutes';
import stripeRouter from './routes/stripe';

dotenv.config();

const server = express();

dataBaseConnection(process.env.MONGO_URL || 'Your DB URL');

server.listen(3000, () => console.log('Server is started'));

server.use(express.json());

server.use(
  '/api',
  userRouter,
  authRouter,
  productRouter,
  cartRouter,
  orderRouter,
  stripeRouter
);

server.use(errorHandler);
