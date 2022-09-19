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
  token?: string;
}
