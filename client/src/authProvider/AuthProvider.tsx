import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { signin as login, signout as logout, getMe } from "../apis/auth";
import { AuthContext, User } from "../context";

interface Credentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const initialUser = useLoaderData() as User | null;
  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  async function signin(credentials: Credentials) {
    const response = await login(credentials);
    setUser(response.user);
    setToken(response.token);
  }

  async function signout() {
    await logout();
    setUser(null);
    setToken(null);
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
