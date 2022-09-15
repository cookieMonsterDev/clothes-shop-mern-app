import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './tokenServices';

export const protection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    throw new Error('Unauthorozed');
  }

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = verifyToken(token);
  req.user = decodedToken;
  next();
};
