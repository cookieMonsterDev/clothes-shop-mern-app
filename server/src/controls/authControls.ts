import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { loginUserService, registerUserService } from './services/authServices';

export const registerUserControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);
    res.status(201).json(user);
  }
);

export const loginUserControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await loginUserService(req.body);
    res.status(201).json(user);
  }
);
