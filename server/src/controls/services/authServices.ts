import { Request, Response } from 'express';
import { userModel } from '../../models/models';
import CryptoJS from 'crypto-js';
import { generateToken } from '../middleware/tokenServices';

interface AuthUserTypes {
  username?: string;
  email: string;
  password: string;
}

const key = process.env.SECRET_KEY_1 || 'Your secret key';

//Register user
export const registerUserService = async (
  body: AuthUserTypes
): Promise<any> => {
  const hashedPassword = CryptoJS.AES.encrypt(body.password, key).toString();

  const newUser = new userModel({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw new Error(`Failed to login: ${err}`);
  }
};

//Login as user
export const loginUserService = async (body: AuthUserTypes): Promise<any> => {
  try {
    const user = await userModel.findOne({ email: body.email }).lean();
    if (!user) throw new Error(`User not found 404`);

    const { password, ...other } = user!;

    const userPassword = CryptoJS.AES.decrypt(password || '', key).toString(
      CryptoJS.enc.Utf8
    );

    if (body.password !== userPassword) throw new Error(`Invalid password 401`);

    const accessTocken = generateToken({
      _id: user!._id.toString(),
      username: user?.username,
      email: user?.email,
      isAdmin: user?.isAdmin,
    });

    return { ...other, accessTocken };
  } catch (err) {
    throw new Error(`Failed to login: ${err}`);
  }
};
