import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

function ProtectedRoute({ children, adminOnly, userOnly }: ProtectedRouteProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to="/login" />;
  }

  const { user, token } = authContext;

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.is_admin) {
    return <Navigate to="/profileUser" />;
  }

  if (userOnly && user.is_admin) {
    return <Navigate to="/profileAdmin" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
