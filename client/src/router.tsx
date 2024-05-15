import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./protectedRoutes/ProtectedProfile";
import { rootLoader } from "./loaders/RootLoader";
import { ProtectedRegister } from "./protectedRoutes/ProtectedRegister";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const ProfileUser = lazy(() => import("./pages/ProfileUser/ProfileUser"));
const ProfileAdmin = lazy(() => import("./pages/ProfileAdmin/ProfileAdmin"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tarifs",
        element: <Tarifs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: (
          <ProtectedRegister>
            <Register />
          </ProtectedRegister>
        
      ),
      },
      {
        path: "/profileUser",
        element: (
          <ProtectedRoute userOnly>
            <ProfileUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profileAdmin",
        element: (
          <ProtectedRoute adminOnly>
            <ProfileAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
