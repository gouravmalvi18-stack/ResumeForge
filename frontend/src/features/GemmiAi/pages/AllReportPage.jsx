import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // Added for Back button functionality

// --- Icons ---
import { BackIcon, DeleteIcon, UpArrIcon } from "../components/AllSvg";

// compo
import BackgroundGrid from "../components/BackgroundGrid";
import Navbar from "../components/Navbar";
import SearchBarCompo from "../components/SearchBarCompo";

// custom hook
import useAi from "../hooks/useAi.hook";

// --- Helpers ---
const getRelativeTime = (dateString) => {
  if (!dateString) return "Just now";
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
// Helper for dynamic badge colors
const getScoreTheme = (score) => {
  if (score >= 70) {
    return {
      text: "text-[#4ade80]",
      bg: "bg-[#4ade80]/10",
      border: "border-[#4ade80]/30 hover:border-[#4ade80]/60",
    };
  } else if (score >= 40) {
    return {
      text: "text-[#fbbf24]",
      bg: "bg-[#fbbf24]/10",
      border: "border-[#fbbf24]/30 hover:border-[#fbbf24]/60",
    };
  } else {
    return {
      text: "text-[#f87171]",
      bg: "bg-[#f87171]/10",
      border: "border-[#f87171]/30 hover:border-[#f87171]/60",
    };
  }
};

const AllReportPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [ShowAllReport, setShowAllReport] = useState(false);

  const { handleFetchAllReport, handleDeleteAReport, AllReport } = useAi();

  useEffect(() => {
    handleFetchAllReport();
  }, []);

  // Filter reports based on search input
  const filteredReports = AllReport.filter((report) =>
    report?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Decide How many report will be Visiable
  const VisiableReport = ShowAllReport
    ? filteredReports
    : filteredReports.slice(0, 6);

  // Delete a report card when click
  const DeleteReportCard = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteAReport(id);
  };

  return (
    <>
      <Navbar />
      <BackgroundGrid>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pt-10 pb-20 md:px-6">
          {/* ========================================= */}
          {/* PART 1: HEADER & SEARCH BAR               */}
          {/* ========================================= */}
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            {/* Left Side: Title, Text, and Count */}
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-neutral-50 md:text-5xl">
                  All Forges
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
                  Access and manage your complete history of AI-generated
                  candidate interview reports. Track match scores and refine
                  your hiring strategy.
                </p>
              </div>

              {/* Total Reports Widget */}
              <div className="flex w-max items-center gap-4 rounded-xl border border-white/5 bg-surface-container-low/50 p-4 shadow-md backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                    Total Reports
                  </span>
                  <span className="mt-1 text-2xl leading-none font-bold text-[#6348ea]">
                    {AllReport.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Back Button & Search Bar */}
            <div className="flex w-full flex-col gap-4 lg:w-96 lg:items-end">
              {/* Back Button */}
              <button
                onClick={() => navigate("/createReport")} // Navigates to the previous page
                className="group flex w-max cursor-pointer items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold tracking-wide text-neutral-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <span className="transition-transform group-hover:-translate-x-1">
                  <BackIcon />
                </span>
                CreateReport
              </button>

              {/* Search Bar */}
              <SearchBarCompo
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>

          {/* ========================================= */}
          {/* PART 2: REPORTS GRID                      */}
          {/* ========================================= */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center delay-200">
                  <p className="text-neutral-400">
                    {searchTerm
                      ? `No reports found matching "${searchTerm}".`
                      : "You haven't forged any reports yet."}
                  </p>
                </div>
              ) : (
                VisiableReport.map((report, index) => {
                  const theme = getScoreTheme(report.matchScore);
                  const id = report._id;
                  return (
                    <Link
                      key={id || index}
                      to={`/report/${id}`}
                      className={`group relative z-0 flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#1c1b1c]/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${theme.border} `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="line-clamp-2 flex-1 text-[17px] font-semibold text-neutral-200 capitalize transition-colors group-hover:text-white">
                          {report.title}
                        </h3>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => DeleteReportCard(e, id)}
                          className="z-40 shrink-0 p-1 text-neutral-500 transition-colors hover:text-red-400"
                        >
                          <DeleteIcon />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-xs font-medium text-neutral-500">
                          {getRelativeTime(report.createdAt)}
                        </span>

                        {/* Score Badge */}
                        <div
                          className={`flex items-center gap-2 rounded-full border px-3 py-1 ${theme.bg} ${theme.border}`}
                        >
                          <span
                            className={`text-[10px] font-bold tracking-tighter uppercase opacity-80 ${theme.text}`}
                          >
                            MatchScore:
                          </span>
                          <span
                            className={`text-[15px] font-bold ${theme.text}`}
                          >
                            {report.matchScore}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Load More Button */}
            {filteredReports.length > 6 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowAllReport((pre) => !pre)}
                  className="group flex items-center gap-2 rounded-full bg-transparent px-6 py-3 text-sm font-semibold text-[#6348ea] transition-colors hover:bg-[#6348ea]/10"
                >
                  Load More Reports
                  <span
                    className={`transition-transform duration-300 ${ShowAllReport ? "rotate-0" : "rotate-180"}`}
                  >
                    <UpArrIcon />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </BackgroundGrid>
    </>
  );
};

export default AllReportPage;
