import React from "react";

export default function RightSidePanel({ matchScore, title, skillGaps }) {
  // For MatchScore Circle
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89
  const strokeDashoffset = circumference - (circumference * matchScore) / 100;

  // Helper function to color-code the Match score dynamically
  const getScoreTheme = (score) => {
    if (score > 70) {
      return {
        stroke: "text-[#4ade80]",
        shadow: "drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]",
      }; // Green
    } else if (score > 40) {
      return {
        stroke: "text-[#fbbf24]",
        shadow: "drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]",
      }; // Yellow
    } else {
      return {
        stroke: "text-[#f87171]",
        shadow: "drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]",
      }; // Red
    }
  };

  const scoreTheme = getScoreTheme(matchScore);

  // Helper function to color-code Skill gaps based on priority
  const getPriorityColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-[#FF8B7E]/10 text-[#FF8B7E] border-[#FF8B7E]/20";
      case "medium":
        return "bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/20";
      case "low":
        return "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20";
      default:
        return "bg-white/5 text-white border-white/10";
    }
  };

  return (
    <aside className="flex flex-col gap-4 lg:col-span-3">
      {/* Match Score Panel  */}
      <div className="rounded-lg border border-white/10 bg-[#16181d]/65 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <h3 className="mb-4 text-base font-semibold text-[#F3F4F6]">
          Match Score
        </h3>

        <div className="flex flex-col gap-4">
          <div className="relative flex items-center justify-center py-2">
            {/*  Circular Progress Bar  */}
            <svg
              className={`h-24 w-24 -rotate-90 transform ${scoreTheme.shadow}`}
            >
              {/* Background Track */}
              <circle
                className="text-white/5"
                cx="48"
                cy="48"
                fill="transparent"
                r={radius}
                strokeWidth="6"
                stroke="currentColor"
              />
              {/* Animated Progress Ring - Dynamic Color */}
              <circle
                className={`${scoreTheme.stroke} transition-all duration-1000 ease-out`}
                cx="48"
                cy="48"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {matchScore}%
              </span>
              <span className="text-[9px] tracking-widest text-[#8B909A] uppercase">
                Overall
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-[#8B909A]">
            This score shows how closely your resume and <br /> self-description
            match the job description.
          </p>
        </div>
      </div>
      {/* Focus Areas (Skill Gaps) Panel  */}
      <div className="rounded-lg border border-white/10 bg-[#16181d]/65 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <h3 className="mb-4 text-base font-semibold text-[#F3F4F6]">
          Skill Gaps
        </h3>

        <div className="flex flex-wrap gap-2">
          {skillGaps.map((gap, index) => (
            <span
              key={index}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors hover:brightness-110 ${getPriorityColor(gap.prioritylevel)}`}
            >
              {gap.skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
