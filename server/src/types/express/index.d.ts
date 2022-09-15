declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      username: string | undefined;
      email: string | undefined;
      isAdmin: boolean | undefined;
    };
  }
}
