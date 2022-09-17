import express from 'express';
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../controls/middleware/authMiddleware';
import {
  deleteUserControl,
  findAllUsersControl,
  findUserControl,
  updateUserControl,
} from '../controls/userControls';

const userRouter = express.Router();

userRouter
  .route('/users/:id')
  .put(verifyTokenAndAuthorization, updateUserControl);
userRouter
  .route('/users/:id')
  .delete(verifyTokenAndAuthorization, deleteUserControl);

userRouter.route('/users/:id').get(verifyTokenAndAdmin, findUserControl);
userRouter.route('/users').get(verifyTokenAndAdmin, findAllUsersControl);

export default userRouter;
