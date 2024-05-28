import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./protectedRoutes/ProtectedProfile";
import { rootLoader } from "./loaders/RootLoader";
import { ProtectedRegister } from "./protectedRoutes/ProtectedRegister";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const ProfileUser = lazy(() => import("./pages/ProfileUser/ProfileUser"));

// Admin routes
const ProfileAdmin = lazy(() => import("./pages/ProfileAdmin/ProfileAdmin"));
const HomeAdmin = lazy(() => import("./pages/ProfileAdmin/Home"));
const Users = lazy(() => import("./pages/ProfileAdmin/Users/Users"));
const ListOfUsers = lazy(
  () => import("./pages/ProfileAdmin/Users/ListOfUsers")
);
const Formations = lazy(
  () => import("./pages/ProfileAdmin/Formations/Formations")
);
const ListOfFormations = lazy(
  () => import("./pages/ProfileAdmin/Formations/ListOfFormations")
);
const AddUser = lazy(() => import("./pages/ProfileAdmin/Users/AddUser"));

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

        children: [
          {
            path: "/profileAdmin/home",
            index: true,
            element: <HomeAdmin />,
          },
          {
            path: "users",
            element: <Users />,
            children: [
              { path: "list", element: <ListOfUsers /> },
              {
                path: "new",
                element: <AddUser />,
              },
              {
                index: true,
                loader: async () => redirect("/profileAdmin/users/list"),
              },
            ],
          },
          {
            path: "formations",
            element: <Formations />,
            children: [
              { path: "list", element: <ListOfFormations /> },
              {
                index: true,
                loader: async () => redirect("/profileAdmin/formations/list"),
              },
            ],
          },
        ],
      },
    ],
  },
]);
