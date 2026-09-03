import React from "react";
import { motion } from "motion/react";

const HowItWorks = () => {
  const HowItWorksStepOneElement = [
    "1. Target Job Description",
    "2. Your Current Resume (PDF)",
    "3. Brief Self-Description",
  ];

  // Variants for staggered step animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each step animating in
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Line animation variant
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <section className="mx-auto max-w-6xl overflow-hidden px-6 py-20">
      {/* Title Animation - triggers immediately on load */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-16 text-center text-2xl font-bold text-white md:text-3xl">
          How It Works
        </h2>
      </motion.div>

      {/* Steps Container - triggers 'visible' state immediately */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col justify-between gap-12 md:flex-row md:gap-6"
      >
        {/* Horizontal Connecting Line */}
        <motion.div
          variants={lineVariants}
          className="absolute top-8 right-[15%] left-[15%] z-0 hidden h-[1px] origin-left bg-gray-800 md:block"
        />

        {/* Step 1: Integrated AI Input Engine */}
        <motion.div
          variants={stepVariants}
          className="relative z-10 mx-auto flex max-w-[300px] flex-col items-center text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]"
          >
            1
          </motion.div>
          <h4 className="mb-3 text-lg font-bold text-white">
            The AI Input Engine
          </h4>
          <p className="mb-6 text-sm text-gray-400">
            To generate your personalized AI-based report, our engine requires
            three core inputs from you to understand your profile entirely.
          </p>
          <div className="flex w-full flex-col gap-2">
            {HowItWorksStepOneElement.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }} // Hardcoded delay to sync with stagger
                className="rounded border border-gray-700 bg-gray-800/50 px-3 py-2 text-xs text-gray-300 transition-colors hover:bg-gray-700/50"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Step 2: AI Analysis */}
        <motion.div
          variants={stepVariants}
          className="relative z-10 mx-auto flex max-w-[280px] flex-col items-center text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]"
          >
            2
          </motion.div>
          <h4 className="mb-3 text-lg font-bold text-white">AI Analysis</h4>
          <p className="text-sm text-gray-400">
            Our engine compares your profile against the exact role requirements
            to calculate matches, identify critical skill gaps, and formulate
            tailored questions.
          </p>
        </motion.div>

        {/* Step 3: Get Roadmap */}
        <motion.div
          variants={stepVariants}
          className="relative z-10 mx-auto flex max-w-[280px] flex-col items-center text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]"
          >
            3
          </motion.div>
          <h4 className="mb-3 text-lg font-bold text-white">Get Roadmap</h4>
          <p className="text-sm text-gray-400">
            Receive your comprehensive report detailing your match score,
            specific skill gaps, interview questions, and your personalized
            day-wise preparation plan.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
