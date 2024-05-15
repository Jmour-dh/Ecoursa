import  { createContext } from 'react';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  imageProfile: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  signin: (credentials: any) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);