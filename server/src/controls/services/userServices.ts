import { Request, Response } from 'express';
import { userModel } from '../../models/models';
import HttpErrors from '../errorHandling/httpErrors';

//Update user
export const updateUserService = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.user._id);
    res.json(user);
  } catch (err) {
    res.json('Sth wend wrong');
  }
};

//Delete user
export const deleteUserService = async (userId: string): Promise<void> => {
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) throw new HttpErrors(`User not found`, 404);

    return;
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
};
