import { createContext, useContext } from 'react';

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  signin: (credentials: { email: string; password: string }) => Promise<void>;
  signout?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur du AuthContextProvider');
  }
  return context;
};
