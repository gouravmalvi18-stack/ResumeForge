import React from "react";
import { useNavigate } from "react-router";

//custom hook
import { useAuth } from "../../auth/hooks/useAuth.hook";

// Icons
import {
  TechnicalCompoIcon,
  BehaviouralCompoIcon,
  PrepPlanCompoIcon,
  CreteNewReportIcon,
  CurrentDeviceLogoutIcon,
  AlldeviceLogoutIcon,
} from "./AllSvg";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { handleLogoutfromCurrentDevice, handleLogoutfromAllDevice } =
    useAuth();

  // Helper to determine active vs inactive styles exactly as in the HTML
  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "bg-[#6348ea]/15 text-[#6348ea]" // Active state
      : "text-[#8B909A] hover:text-white hover:bg-white/5"; // Inactive state
  };

  // Logout handlers
  const LogoutFromCurrentDevice = () => {
    handleLogoutfromCurrentDevice();
  };
  const LogoutFromAllDevice = () => {
    handleLogoutfromAllDevice();
  };

  return (
    <>
      <aside className="fixed bottom-0 left-0 z-40 flex h-16 w-full border-t border-white/10 bg-[#16181d]/85 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md md:relative md:h-full md:w-20 md:flex-col md:border-t-0 md:border-r md:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex h-full w-full flex-row items-center justify-between px-2 sm:px-6 md:flex-col md:px-4 md:py-6">
          {/* TOP SECTION: Main Navigation */}
          <div className="flex flex-row items-center gap-1 sm:gap-3 md:flex-col md:gap-6">
            {/* Technical Tab */}
            <button
              onClick={() => setActiveTab("technical")}
              className={`group relative flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all md:p-2.5 ${getTabClass("technical")}`}
            >
              <TechnicalCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Technical Questions
              </span>
            </button>

            {/* Behavioral Tab */}
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`group relative flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all md:p-2.5 ${getTabClass("behavioral")}`}
            >
              <BehaviouralCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Behavioral Questions
              </span>
            </button>

            {/* Prep Plan Tab */}
            <button
              onClick={() => setActiveTab("prepplan")}
              className={`group relative flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all md:p-2.5 ${getTabClass("prepplan")}`}
            >
              <PrepPlanCompoIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Prep Plan
              </span>
            </button>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-row items-center gap-1 sm:gap-3 md:flex-col md:gap-6">
            {/* Create New Report */}
            <button
              onClick={() => navigate("/createReport")}
              className="group relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#8B909A] transition-all hover:bg-white/5 hover:text-white md:p-2.5"
            >
              <CreteNewReportIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-[#6348ea]/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(99,72,234,0.4)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Create New Report
              </span>
            </button>

            {/* Logout from Current device btn */}
            <button
              onClick={LogoutFromCurrentDevice}
              className="group relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400 md:p-2.5"
            >
              <CurrentDeviceLogoutIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-red-500/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Logout from Current device
              </span>
            </button>

            {/* Logout from All device btn */}
            <button
              onClick={LogoutFromAllDevice}
              className="group relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400 md:p-2.5"
            >
              <AlldeviceLogoutIcon />
              <span className="pointer-events-none invisible absolute top-1/2 left-full z-50 ml-2 hidden translate-x-[10px] -translate-y-1/2 rounded-lg border border-red-500/30 bg-[#16181d] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-x-[16px] group-hover:opacity-100 md:block">
                Logout from All devices
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
