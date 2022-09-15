import express from 'express';

const userRouter = express.Router();

userRouter.route('/register').get((req, res) => {
  res.send('Register');
});

export default userRouter;
