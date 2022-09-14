import express from 'express';

const userRouter = express.Router();

userRouter.route('/users').get((req, res) => {
  res.send('Users');
});

export default userRouter;
