import React from "react";
import { motion } from "motion/react";

const CoreFunctionality = () => {
  // Variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Header section animates in as a single block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
          Core Functionality
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-center text-[15px] leading-relaxed text-gray-400">
          ResumeForge is an AI-powered Interview Preparation platform designed
          to help you conquer specific job roles by precisely analyzing your
          current skills against actual job requirements.
        </p>
      </motion.div>

      {/* Grid container handles the staggered reveal of the cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Box 1: Match Score */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="flex flex-col rounded-2xl border border-gray-800 bg-[#121214] p-8 transition-colors hover:border-gray-600"
        >
          <h3 className="mb-3 text-lg font-bold text-white">1. Match Score</h3>
          <p className="text-sm text-gray-400">
            A precise 0 to 100 metric that evaluates exactly how much your
            current skillset matches the specific requirements of the job
            description.
          </p>
        </motion.div>

        {/* Box 2: Skill Gap Analysis */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="flex flex-col rounded-2xl border border-gray-800 bg-[#121214] p-8 transition-colors hover:border-gray-600"
        >
          <h3 className="mb-3 text-lg font-bold text-white">
            2. Skill Gap Analysis
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            Instantly identifies the exact technologies, frameworks, and core
            skills that you currently lack for the target position.
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <span className="rounded border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-xs text-yellow-400">
              Missing: System Design
            </span>
            <span className="rounded border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-400">
              Missing: Docker
            </span>
          </div>
        </motion.div>

        {/* Box 3: Interview Questions */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="flex flex-col rounded-2xl border border-gray-800 bg-[#121214] p-8 transition-colors hover:border-gray-600"
        >
          <h3 className="mb-3 text-lg font-bold text-white">
            3. Technical & Behavioral Questions
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            Practice with targeted technical challenges and behavioral scenarios
            that are typically asked in real interviews for your target job.
          </p>
          <div className="mt-auto rounded border border-l-2 border-white/5 border-l-[#6348ea] bg-black/30 p-4">
            <p className="mb-2 text-xs text-gray-300 italic">
              "Can you explain the detailed flow of JWT-based authentication
              using access tokens and HTTP-only cookies?"
            </p>
            <span className="text-[10px] font-bold tracking-wider text-[#6348ea] uppercase">
              AI Model Answer Strategy Included
            </span>
          </div>
        </motion.div>

        {/* Box 4: Day-Wise Plan */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="flex flex-col rounded-2xl border border-gray-800 bg-[#121214] p-8 transition-colors hover:border-gray-600"
        >
          <h3 className="mb-3 text-lg font-bold text-white">
            4. Day-Wise Preparation Plan
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            A structured, step-by-step daily roadmap designed to help you
            efficiently learn and master the lacking skills before your
            interview day.
          </p>
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded border border-gray-700 bg-gray-800/30 p-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#6348ea]/20 text-xs font-bold text-[#6348ea]">
                D1
              </span>
              <span className="text-xs text-gray-300">
                Understand Docker fundamentals & Containerization
              </span>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-700 bg-gray-800/30 p-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gray-700 text-xs font-bold text-gray-400">
                D2
              </span>
              <span className="text-xs text-gray-400">
                Build a basic REST API and write tests in Jest
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoreFunctionality;
