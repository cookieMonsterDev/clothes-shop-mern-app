import express from 'express';
import { verifyTokenAndAuthorization } from '../controls/middleware/authMiddleware';
import { deleteUserControl, updateUserControl } from '../controls/userControls';

const userRouter = express.Router();

userRouter.route('/:id').put(verifyTokenAndAuthorization, updateUserControl)
userRouter.route('/:id').delete(verifyTokenAndAuthorization, deleteUserControl);

export default userRouter;
