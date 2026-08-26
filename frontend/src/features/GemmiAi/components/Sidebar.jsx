import React from "react";

// packages
import { useNavigate } from "react-router";

// All Icons
const Icons = {
  TechnicalCompoIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 8l-4 4l4 4" />
      <path d="M19 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  ),
  BehaviouralCompoIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 21v-1.25c0 -2.311 .778 -1.92 2.244 -3.749a8 8 0 1 0 -14.244 -5.001q 0 .25 -1.876 3.518a1 1 0 0 0 .876 1.482h2v3a2 2 0 0 0 2 2h3" />
      <path d="M11 11a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </svg>
  ),
  PrepPlanCompoIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M7 14h.013" />
      <path d="M10.01 14h.005" />
      <path d="M13.01 14h.005" />
      <path d="M16.015 14h.005" />
      <path d="M13.015 17h.005" />
      <path d="M16.015 17h.005" />
      <path d="M7.01 17h.005" />
      <path d="M10.01 17h.005" />
    </svg>
  ),
  LogoutIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
    </svg>
  ),
  CreteNewReportIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
      <path d="M15 12h-6" />
      <path d="M12 9v6" />
    </svg>
  ),
};

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  // Helper to determine active vs inactive styles exactly as in the HTML
  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "bg-[#6348ea]/15 text-[#6348ea]" // Active state
      : "text-[#8B909A] hover:text-white hover:bg-white/5"; // Inactive state
  };

  return (
    <>
      {/* Full Height Sidebar mapped from HTML */}
      <aside className="z-40 flex h-full border-r border-white/10 bg-[#16181d]/65 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {/* Drawer Container (Full height, space between top and bottom icons) */}
        <div className="flex h-full w-18 flex-col justify-between px-4 py-6">
          {/* TOP SECTION: Main Navigation */}
          <div className="flex flex-col items-center gap-6">
            {/* Technical Tab */}
            <button
              onClick={() => setActiveTab("technical")}
              className={`group relative flex items-center justify-center rounded-lg p-2.5 transition-all ${getTabClass("technical")}`}
            >
              <Icons.TechnicalCompoIcon />
              {/* Custom Tooltip */}
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Technical Questions
              </span>
            </button>

            {/* Behavioral Tab */}
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`group relative flex items-center justify-center rounded-lg p-2.5 transition-all ${getTabClass("behavioral")}`}
            >
              <Icons.BehaviouralCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Behavioral Questions
              </span>
            </button>

            {/* Prep Plan Tab */}
            <button
              onClick={() => setActiveTab("prepplan")}
              className={`group relative flex items-center justify-center rounded-lg p-2.5 transition-all ${getTabClass("prepplan")}`}
            >
              <Icons.PrepPlanCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Prep Plan
              </span>
            </button>
          </div>

          {/* BOTTOM SECTION: Actions (Create & Logout) */}
          <div className="flex flex-col items-center gap-6">
            {/* Create New Report */}
            <button
              onClick={() => navigate("/createReport")}
              className="group relative flex items-center justify-center rounded-lg p-2.5 text-[#8B909A] transition-all hover:bg-white/5 hover:text-white"
            >
              <Icons.CreteNewReportIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Create New Report
              </span>
            </button>

            {/* Logout */}
            <button className="group relative flex items-center justify-center rounded-lg p-2.5 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400">
              <Icons.LogoutIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-red-500/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
