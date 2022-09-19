import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import HttpErrors from '../errorHandling/httpErrors';
import JWT, { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  _id: string;
  username: string | undefined;
  email: string | undefined;
  isAdmin: boolean | undefined;
}

const jwtKey = process.env.JWT_SECRET_KEY || 'Your jwt key';

export const generateToken = (user: UserPayload): string => {
  return JWT.sign(user, jwtKey, { expiresIn: '1h' });
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      throw new Error(`Invalid token`);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = (await JWT.verify(token, jwtKey)) as UserPayload;
    req.user = decodedToken;
  } catch (err) {
    throw new HttpErrors(`Invalid token`, 403);
  }
};

export const verifyTokenG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      throw new Error(`Invalid token`);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = (await JWT.verify(token, jwtKey)) as UserPayload;
    req.user = decodedToken;
    next();
  } catch (err) {
    throw new HttpErrors(`Invalid token`, 403);
  }
};

export const verifyTokenAndAuthorization = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verifyToken(req, res);

      if (!(req.user._id === req.params.id || req.user.isAdmin))
        throw new HttpErrors(`Forbidden`, 403);

      next();
    } catch (err) {
      throw new HttpErrors(`Access denied: ${err.message}`, 403);
    }
  }
);

export const verifyTokenAndAdmin = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verifyToken(req, res);

      if (!req.user.isAdmin) throw new HttpErrors(`Forbidden`, 403);

      next();
    } catch (err) {
      throw new HttpErrors(`Access denied: ${err.message}`, 403);
    }
  }
);
