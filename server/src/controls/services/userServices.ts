import CryptoJS from 'crypto-js';
import { userModel } from '../../models/models';
import HttpErrors from '../errorHandling/httpErrors';
import { generateToken } from '../middleware/authMiddleware';
import { AuthUserTypes, ReturnUserTypes } from './types/types';
import verifyInputUser from './validation/validateDuplicates';

const key = process.env.SECRET_KEY_1 || 'Your secret key';

//Update user
export const updateUserService = async (
  id: string,
  body: AuthUserTypes
): Promise<ReturnUserTypes> => {
  const newBody = await verifyInputUser(body);

  const hashedPassword = CryptoJS.AES.encrypt(newBody.password, key).toString();

  const { password, ...other } = newBody;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: { hashedPassword, ...other } },
      { new: true }
    );

    if(!updatedUser) throw new HttpErrors(`User is found`, 404);

    const accessTocken = generateToken({
      _id: updatedUser!._id.toString(),
      username: updatedUser?.username,
      email: updatedUser?.email,
      isAdmin: updatedUser?.isAdmin,
    });

    return {
      _id: updatedUser._id.toString(),
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: accessTocken,
    };
  } catch (err) {
    throw new HttpErrors(`Failed to update user: ${err.message}`, 401);
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
