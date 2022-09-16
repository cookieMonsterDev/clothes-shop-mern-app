import CryptoJS from 'crypto-js';
import { userModel } from '../../models/models';
import HttpErrors from '../errorHandling/httpErrors';
import { generateToken } from '../middleware/tokenOperations';
import verifyInputUser from './validation/validateDuplicates';

export interface AuthUserTypes {
  username?: string;
  email: string;
  password: string;
}

export interface ReturnUserTypes {
  _id: string;
  username: string | undefined;
  email: string | undefined;
  isAdmin: boolean | undefined;
  token: string;
}

const key = process.env.SECRET_KEY_1 || 'Your secret key';

//Register user
export const registerUserService = async (
  body: AuthUserTypes
): Promise<ReturnUserTypes> => {
  const newBody = await verifyInputUser(body);

  const hashedPassword = CryptoJS.AES.encrypt(newBody.password, key).toString();

  const newUser = new userModel({
    username: newBody.username,
    email: newBody.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    const accessTocken = generateToken({
      _id: savedUser!._id.toString(),
      username: savedUser?.username,
      email: savedUser?.email,
      isAdmin: savedUser?.isAdmin,
    });

    return {
      _id: savedUser._id.toString(),
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token: accessTocken,
    };
  } catch (err) {
    throw new HttpErrors(`Failed to create user: ${err.message}`, 401);
  }
};

//Login as user
export const loginUserService = async (
  body: AuthUserTypes
): Promise<ReturnUserTypes> => {
  try {
    const user = await userModel.findOne({ email: body.email }).lean();
    if (!user) throw new HttpErrors(`User not found`, 404);

    const { password, ...other } = user!;

    const userPassword = CryptoJS.AES.decrypt(password || '', key).toString(
      CryptoJS.enc.Utf8
    );

    if (body.password !== userPassword)
      throw new HttpErrors(`Invalid password`, 401);

    const accessTocken = generateToken({
      _id: user!._id.toString(),
      username: user?.username,
      email: user?.email,
      isAdmin: user?.isAdmin,
    });

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: accessTocken,
    };
  } catch (err) {
    throw new HttpErrors(`Authorization failed: ${err.message}`, 401);
  }
};
