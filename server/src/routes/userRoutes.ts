import express from 'express';
import { protection } from '../controls/middleware/authMiddleware';
import { deleteUser, updateUser } from '../controls/services/userServices';

const userRouter = express.Router();

userRouter.route('/:id').put(protection, updateUser)
userRouter.route('/:id').delete(protection, deleteUser);

export default userRouter;
