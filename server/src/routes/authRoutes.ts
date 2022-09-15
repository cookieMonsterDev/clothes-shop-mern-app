import express from 'express';
import { createUser, loginUser } from '../services/authServices';

const authRouter = express.Router();

authRouter.route('/register').post(createUser);
authRouter.route('/login').post(loginUser);

export default authRouter;
