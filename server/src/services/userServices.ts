import { Request, Response } from 'express';
import { userModel } from '../models/models';

//Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user._id);
    res.json(user);
  } catch(err) {
    res.json('Sth wend wrong');
  }
}

//Delete user