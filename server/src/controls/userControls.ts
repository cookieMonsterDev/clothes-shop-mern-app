import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { deleteUserService } from './services/userServices';

export const updateUserControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // const user = await registerUserService(req.body);
    // res.status(201).json(user);
  }
);

export const deleteUserControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteUserService(req.params.id);
    res.status(200).json({
			message: `User ${req.params.id} is deleted`,
		});
  }
);
