import express from 'express';
import { loginUserControl, registerUserControl } from '../controls/authControls';

const authRouter = express.Router();

authRouter.route('/auth/register').post(registerUserControl);
authRouter.route('/auth/login').post(loginUserControl);

export default authRouter;
