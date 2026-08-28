import React from "react";

// packages
import { useNavigate } from "react-router";

//custom hook
import { useAuth } from "../../auth/hooks/useAuth.hook";

// Icons
import {
  TechnicalCompoIcon,
  BehaviouralCompoIcon,
  PrepPlanCompoIcon,
  LogoutIcon,
  CreteNewReportIcon,
} from "./AllSvg";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { handleLogOut } = useAuth();

  // Helper to determine active vs inactive styles exactly as in the HTML
  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "bg-[#6348ea]/15 text-[#6348ea]" // Active state
      : "text-[#8B909A] hover:text-white hover:bg-white/5"; // Inactive state
  };

  const LogOutUser = () => {
    handleLogOut();
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
              <TechnicalCompoIcon />
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
              <BehaviouralCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Behavioral Questions
              </span>
            </button>

            {/* Prep Plan Tab */}
            <button
              onClick={() => setActiveTab("prepplan")}
              className={`group relative flex items-center justify-center rounded-lg p-2.5 transition-all ${getTabClass("prepplan")}`}
            >
              <PrepPlanCompoIcon />
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
              <CreteNewReportIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100">
                Create New Report
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={LogOutUser}
              className="group relative flex items-center justify-center rounded-lg p-2.5 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <LogoutIcon />
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
