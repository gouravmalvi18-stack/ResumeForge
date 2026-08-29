import React, { useEffect } from "react";

// package
import { useNavigate } from "react-router";

//custom hook
import useAi from "../hooks/useAi.hook";

// Icons
import { HistoryIcon, ArrowIcon } from "./AllSvg";

// Helper: Returns exact time relative to now
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
};

const MostRecentReportGenByUserCompo = () => {
  const { handleFetchAllReport, AllReport = [] } = useAi();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchAllReport();
  }, []);

  // Helper to dynamically set colors based on the matchScore score
  const getScoreTheme = (score) => {
    if (score >= 70) {
      return {
        // Green
        text: "group-hover:text-[#4ade80]",
        shadow: "hover:shadow-[#4ade80]/10",
        bg: "from-[#4ade80]/0 via-[#4ade80]/10 to-[#4ade80]/0",
        icon: "group-hover:text-[#4ade80]",
        badge: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
      };
    } else if (score >= 40) {
      return {
        // Yellow
        text: "group-hover:text-[#fbbf24]",
        shadow: "hover:shadow-[#fbbf24]/10",
        bg: "from-[#fbbf24]/0 via-[#fbbf24]/10 to-[#fbbf24]/0",
        icon: "group-hover:text-[#fbbf24]",
        badge: "text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30",
      };
    } else {
      return {
        // Red
        text: "group-hover:text-[#f87171]",
        shadow: "hover:shadow-[#f87171]/10",
        bg: "from-[#f87171]/0 via-[#f87171]/10 to-[#f87171]/0",
        icon: "group-hover:text-[#f87171]",
        badge: "text-[#f87171] bg-[#f87171]/10 border-[#f87171]/30",
      };
    }
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-6 px-4 lg:w-[35%] lg:px-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 delay-200">
        <div className="h-6 w-1.5 shrink-0 rounded-full bg-secondary"></div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-100 md:text-2xl">
          Your Most Recent Forges
        </h2>
      </div>

      {/* Sidebar List */}
      <div className="relative flex flex-col gap-3 pr-0 lg:pr-8">
        {AllReport.length === 0 ? (
          <p className="py-4 text-center text-sm text-neutral-500 italic">
            No forges created yet.
          </p>
        ) : (
          /* Map through Reports if they exist */
          AllReport.map((item, index) => {
            const theme = getScoreTheme(item.matchScore);

            if (index < 5) {
              return (
                <button
                  key={index}
                  onClick={() => navigate(`/report/${item._id}`)}
                  className={`group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-xl border border-white/5 bg-neutral-900/40 p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-900/80 hover:shadow-xl md:p-5 ${theme.shadow} delay-300`}
                >
                  {/* Hover gradient effect dynamically colored */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${theme.bg} -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full`}
                  ></div>

                  <div className="relative z-10 flex w-full items-center gap-4 overflow-hidden">
                    <div className="flex w-full min-w-0 flex-col items-start pr-2">
                      <h3
                        className={`truncate text-[15px] font-semibold text-neutral-200 capitalize transition-colors ${theme.text}`}
                      >
                        {item.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {/* Badge dynamically colored */}
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${theme.badge}`}
                        >
                          Match: {item.matchScore}%
                        </span>
                        <span className="text-[11px] font-medium text-neutral-500">
                          {getRelativeTime(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow SVG dynamically colored on hover */}
                  <ArrowIcon theme={theme} />
                </button>
              );
            }
            return null;
          })
        )}

        {/* View All Button */}
        {AllReport.length > 0 && (
          <button className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900/30 py-3.5 text-sm font-semibold text-neutral-400 transition-all delay-500 duration-300 hover:border-white/20 hover:bg-neutral-900/60 hover:text-neutral-200">
            View All Forges <HistoryIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default MostRecentReportGenByUserCompo;
