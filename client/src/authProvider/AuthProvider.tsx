import { useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import { signin as login, signout as logout } from "../apis/auth";
import { AuthContext, User } from "../context";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const initialUser = useLoaderData() as User;
  const [user, setUser] = useState<User | null>(initialUser);

  async function signin(credentials: { email: string; password: string }) {
    const newUser = await login(credentials);
    setUser(newUser);
  }

  async function signout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
