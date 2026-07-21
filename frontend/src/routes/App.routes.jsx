import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Resgister from "../features/auth/pages/Resgister";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Resgister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
