import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const ProfileUser = lazy(() => import("./pages//ProfileUser/ProfileUser"));
const ProfileAdmin = lazy(() => import("./pages/ProfileAdmin/ProfileAdmin"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/tarifs',
        element: <Tarifs/>
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/register',
        element: <Register/>
      },
      {
        path:'/profileUser',
        element: <ProfileUser/>
      },
      {
        path:'/profileAdmin',
        element: <ProfileAdmin/>
      }
    ],
  },
]);