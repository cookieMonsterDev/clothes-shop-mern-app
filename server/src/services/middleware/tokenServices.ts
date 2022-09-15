import JWT, { JwtPayload } from 'jsonwebtoken';

const jwtKey = process.env.JWT_SECRET_KEY || 'Your jwt key';

export interface UserPayload extends JwtPayload {
  _id: string;
  username: string | undefined;
  email: string  | undefined;
  isAdmin: boolean | undefined;
}

export const generateToken = (user: UserPayload): string => {
  return JWT.sign(user, jwtKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): UserPayload => {
  try {
    return JWT.verify(token, jwtKey) as UserPayload;
  } catch (err) {
    throw new Error('Invalid token');
  }
};
