import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

const jwtKey = process.env.JWT_SECRET_KEY || 'Your jwt key';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authTocken = req.headers.token;

  try {
    JWT.verify(authTocken as string, jwtKey);
    next();
  } catch (err) {
    res.status(401).json('Unauthorized');
  }
};
