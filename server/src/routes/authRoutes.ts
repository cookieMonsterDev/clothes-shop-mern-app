import express from 'express';
import { createUser } from '../services/authServices';

const authRouter = express.Router();

authRouter.route('/register').post(createUser);

export default authRouter;
