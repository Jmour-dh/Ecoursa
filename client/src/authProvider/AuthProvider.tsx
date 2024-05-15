import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { signin as login, signout as logout } from "../apis/auth";
import { AuthContext, User } from "../context";

interface Credentials {
  firstname: string;
  lastname: string;
  email: string;
  imageProfile: string;
  is_admin: boolean;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const initialUser = useLoaderData() as User | null;
  const [user, setUser] = useState<User | null>(initialUser);

  async function signin(credentials: Credentials) {
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
