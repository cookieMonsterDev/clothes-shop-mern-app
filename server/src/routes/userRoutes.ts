import express from 'express';
import { protection } from '../services/middleware/authMiddleware';
import { updateUser } from '../services/userServices';

const userRouter = express.Router();

userRouter.route('/:id').delete(protection, updateUser);

export default userRouter;
