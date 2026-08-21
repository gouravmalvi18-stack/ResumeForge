import React, { useEffect } from "react";

//custom hook
import useAi from "../hooks/useAi.hook";

// return exact time  when it was created based on this format 2026-08-13T07:43:32.294+00:00 which convert into min , hr , day
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

const HistoryIcon = () => (
  <span className="text-[18px]">
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-history"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8l0 4l2 2" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  </span>
);
const ArrowIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`relative z-10 text-on-surface-variant/30 transition-all group-hover:translate-x-1 ${theme.icon}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l14 0" />
    <path d="M13 18l6 -6" />
    <path d="M13 6l6 6" />
  </svg>
);

const AllReportGenbyUserCompo = () => {
  const { handleFetchAllReport, AllReport } = useAi();
  useEffect(() => {
    handleFetchAllReport();
  }, []);

  // Helper to dynamically set colors based on the matchScore score
  const getScoreTheme = (score) => {
    if (score >= 70) {
      // Green Theme
      return {
        text: "group-hover:text-[#4ade80]",
        shadow: "hover:shadow-[#4ade80]/10",
        bg: "from-[#4ade80]/0 via-[#4ade80]/10 to-[#4ade80]/0",
        icon: "group-hover:text-[#4ade80]",
        badge: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
      };
    } else if (score >= 40) {
      // Yellow Theme
      return {
        text: "group-hover:text-[#fbbf24]",
        shadow: "hover:shadow-[#fbbf24]/10",
        bg: "from-[#fbbf24]/0 via-[#fbbf24]/10 to-[#fbbf24]/0",
        icon: "group-hover:text-[#fbbf24]",
        badge: "text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30",
      };
    } else {
      // Red Theme
      return {
        text: "group-hover:text-[#f87171]",
        shadow: "hover:shadow-[#f87171]/10",
        bg: "from-[#f87171]/0 via-[#f87171]/10 to-[#f87171]/0",
        icon: "group-hover:text-[#f87171]",
        badge: "text-[#f87171] bg-[#f87171]/10 border-[#f87171]/30",
      };
    }
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-stack-md pb-5 lg:w-[35%] lg:pt-0">
      {/* Sidebar Header */}
      <div className="animate-fade-in-up flex items-center gap-3 delay-200">
        <div className="h-6 w-1.5 rounded-full bg-secondary"></div>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Your Most Recent Forges
        </h2>
      </div>

      {/* Sidebar List */}
      <div className="relative flex flex-col gap-3 pr-0 lg:pr-8">
        {AllReport.map((item, index) => {
          // Pass the matchScore to get the corresponding color theme
          const theme = getScoreTheme(item.matchScore);
          const delayClass = `delay-${(index + 3) * 100}`; // Staggers animation (300, 400, 500)
          if (index < 5) {
            return (
              <div
                key={index}
                className={`group relative rounded-xl bg-surface-container-low/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container hover:shadow-xl ${theme.shadow} animate-fade-in-up flex items-center justify-between overflow-hidden ring-1 ring-white/5 ${delayClass}`}
              >
                {/* Hover gradient effect dynamically colored */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${theme.bg} translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%]`}
                ></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex min-w-0 flex-col">
                    <h3
                      className={`font-headline-md truncate pr-4 text-[16px] text-on-surface capitalize transition-colors ${theme.text}`}
                    >
                      {item.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      {/* Badge dynamically colored */}
                      <span
                        className={`font-label-md rounded-full border px-2 py-0.5 text-[11px] font-bold ${theme.badge}`}
                      >
                        MarkSource: {item.matchScore}
                      </span>
                      <span className="font-body-md text-[12px] text-on-surface-variant/50">
                        {getRelativeTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Arrow SVG dynamically colored on hover */}
                <ArrowIcon theme={theme} />
              </div>
            );
          }
        })}

        {/* View All Button */}
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant/30 py-3 text-on-surface-variant transition-all duration-500 ease-in-out hover:border-outline-variant/60 hover:bg-surface-container hover:text-on-surface">
          View All Forges <HistoryIcon />
        </button>
      </div>
    </div>
  );
};

export default AllReportGenbyUserCompo;
