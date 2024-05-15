export interface AuthContextType {
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}