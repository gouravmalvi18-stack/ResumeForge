import { createBrowserRouter } from "react-router";

// components
import Login from "../features/auth/pages/Login";
import Resgister from "../features/auth/pages/Resgister";
import EmailVerfication from "../features/auth/pages/EmailVerfication";
import ProtechedRoute from "../features/auth/pages/ProtechedRoute";
import CreateReportPage from "../features/GemmiAi/pages/CreateReportPage";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Resgister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <EmailVerfication />,
  },
  {
    path: "/createReport",
    element: (
      <ProtechedRoute>
        <CreateReportPage />
      </ProtechedRoute>
    ),
  },
]);
