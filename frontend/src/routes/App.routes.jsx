import { createBrowserRouter } from "react-router";

//  Main components

import Login from "../features/auth/pages/Login";
import Resgister from "../features/auth/pages/Resgister";
import EmailVerfication from "../features/auth/pages/EmailVerfication";
import ProtechedRoute from "../features/auth/pages/ProtechedRoute";
import CreateReportPage from "../features/GemmiAi/pages/CreateReportPage";
import ReportPage from "../features/GemmiAi/pages/ReportPage";
import AllReportPage from "../features/GemmiAi/pages/AllReportPage";

// LandingPage
import ResumeForgeLandingPage from "../LandingPage/ResumeForgeLandingPage";
import HeroSection from "../LandingPage/components/HeroSection";
import CoreFunctionality from "../LandingPage/components/CoreFunctionality";
import HowItWorks from "../LandingPage/components/HowItWorks";
import ContactUs from "../LandingPage/components/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ResumeForgeLandingPage />,
    children: [
      {
        index: true,
        element: <HeroSection />,
      },
      {
        path: "features",
        element: <CoreFunctionality />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
    ],
  },
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
  {
    path: "/report/:id",
    element: (
      <ProtechedRoute>
        <ReportPage />
      </ProtechedRoute>
    ),
  },
  {
    path: "/allreport",
    element: (
      <ProtechedRoute>
        <AllReportPage />
      </ProtechedRoute>
    ),
  },
]);
