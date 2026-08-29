import React, { useState } from "react";

// Icon
import { UpArrIcon } from "./AllSvg";

// Reusable Internal Accordion Component
const AccordionItem = ({ question, objective, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 ${
        isOpen ? "border-white/10 bg-white/10 shadow-md" : "hover:bg-white/10"
      }`}
    >
      {/* Accordion Header / Button */}
      <button
        className="flex w-full cursor-pointer items-center justify-between p-5 text-left focus:outline-none md:p-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-3 pr-4">
          <h3 className="text-[15px] leading-snug font-semibold text-[#F3F4F6] md:text-base">
            {question}
          </h3>
        </div>

        {/* Arrow Icon */}
        <span
          className={`text-[#8B909A] transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        >
          <UpArrIcon />
        </span>
      </button>

      {/* Accordion Content Area */}
      <div
        className={`overflow-hidden px-5 transition-all duration-300 ease-in-out md:px-6 ${
          isOpen
            ? "max-h-375 pb-5 opacity-100 md:pb-6"
            : "max-h-0 pb-0 opacity-0"
        }`}
      >
        {/* Objective / Intention Box */}
        <div className="mb-6 rounded-lg border border-[#6348ea]/20 bg-[#6348ea]/10 p-4">
          <div className="mb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#6348ea] uppercase">
              Intention / Objective
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#D1D5DB]">
            {objective}
          </p>
        </div>

        {/* Model Answer Strategy */}
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-widest text-[#6348ea] uppercase">
            Model Answer Strategy
          </span>
        </div>
        <div className="border-l-2 border-[#6348ea] pl-4">
          <div className="rounded-lg bg-white/5 p-4 text-[13.5px] leading-relaxed text-[#D1D5DB]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function QuestionsCompo({ title, description, questions = [] }) {
  // Fallback if no questions are found
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#16181d]/65 p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <p className="text-[#8B909A]">No questions generated</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#16181d]/65 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-[#F3F4F6] md:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-[#8B909A]">{description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, index) => (
          <AccordionItem
            key={index}
            question={`${index + 1}. ${q.question}`}
            objective={q.objective}
            answer={q.answer}
          />
        ))}
      </div>
    </div>
  );
}
