import express from 'express';
import { loginUserControl, registerUserControl } from '../controls/authControls';

const authRouter = express.Router();

authRouter.route('/register').post(registerUserControl);
authRouter.route('/login').post(loginUserControl);

export default authRouter;
