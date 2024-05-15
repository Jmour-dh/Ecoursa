import {ReactNode} from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRegister = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
}