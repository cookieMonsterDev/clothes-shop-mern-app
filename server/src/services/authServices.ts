import { Request, Response } from 'express';
import { userModel } from '../models/models';
import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

const key = process.env.SECRET_KEY_1 || 'Your secret key';
const jwtKey = process.env.JWT_SECRET_KEY || 'Your jwt key';

// Register user
export const createUser = async (req: Request, res: Response) => {
  const hashedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    key
  ).toString();

  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }).lean();
    !user && res.status(401).json('Wrong credentials!');

    const dihashedPassword = CryptoJS.AES.decrypt(user?.password || '', key);
    const passwordT = dihashedPassword.toString(CryptoJS.enc.Utf8);

    !passwordT && res.status(401).json('Wrong password!');

    const accessTocken = JWT.sign({
      id: user?._id,
      isAdmin: user?.isAdmin
    }, jwtKey, {expiresIn: '1h'})

    const {password, ...other} = user!;

    res.status(200).json({...other, accessTocken});
  } catch (err) {
    res.status(500).json(err);
  }
};
