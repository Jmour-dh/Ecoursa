export interface User {
  name: string;
  email: string;
  is_admin: boolean;
}

export interface AuthContextType {
  user: User | null ;
  signin: (credentials: { email: string; password: string }) => Promise<void>;
  signout?: () => Promise<void>;
}