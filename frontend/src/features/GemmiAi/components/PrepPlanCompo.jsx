import React from "react";

//Icon
import { CheckMarkIcon } from "./AllIconInSvg";

export default function PrepPlanCompo({ plan = [] }) {
  // Fallback state if no plan data is generated yet
  if (!plan || plan.length === 0) {
    return (
      <div className="animate-fade-in-up rounded-lg border border-white/10 bg-[#16181d]/65 p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <p className="text-[#8B909A]">No preparation plan available.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up rounded-lg border border-white/10 bg-[#16181d]/65 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md md:p-8">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="mb-2 text-2xl font-bold text-[#F3F4F6] md:text-3xl">
          Preparation Plan
        </h2>
        <p className="text-sm text-[#8B909A]">
          Your day-by-day structured learning path to close skill gaps before
          the interview.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative flex flex-col gap-8 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#6348ea]/50 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
        {plan.map((dayPlan, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-start md:flex-row md:justify-between md:odd:flex-row-reverse"
          >
            {/* Timeline Marker (Circle) */}
            <div className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#16181d] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[#6348ea]/60 group-hover:shadow-[0_0_15px_rgba(99,72,234,0.3)] md:left-1/2 md:-translate-x-1/2">
              <span className="text-[13px] font-bold tracking-wider text-[#6348ea]">
                D{dayPlan.day}
              </span>
            </div>

            {/* Empty Spacer to force alternating layout on Desktop */}
            <div className="hidden md:block md:w-[calc(50%-2.5rem)]"></div>

            {/* Content Card */}
            <div className="w-full pl-14 md:w-[calc(50%-2.5rem)] md:pl-0">
              <div className="rounded-lg border border-white/5 bg-white/5 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-[#6348ea]/30 hover:bg-white/10 md:p-6">
                {/* Focus Area Title */}
                <h3 className="mb-4 text-[15px] font-semibold text-[#F3F4F6]">
                  {dayPlan.focusArea}
                </h3>

                {/* Tasks List */}
                <ul className="flex flex-col gap-3">
                  {dayPlan.tasks.map((task, tIndex) => (
                    <li
                      key={tIndex}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-[#D1D5DB]"
                    >
                      {/* Checkmark Icon */}
                      <span className="mt-[3px] shrink-0 text-[#6348ea]">
                        <CheckMarkIcon />
                      </span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
