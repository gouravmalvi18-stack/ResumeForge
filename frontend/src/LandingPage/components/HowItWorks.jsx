const HowItWorks = () => {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div>
          <h2 className="mb-16 text-center text-2xl font-bold text-white md:text-3xl">
            How It Works
          </h2>
        </div>

        <div className="relative flex flex-col justify-between gap-12 md:flex-row md:gap-6">
          <div className="absolute top-8 right-[15%] left-[15%] z-0 hidden h-[1px] bg-gray-800 md:block"></div>

          {/* Step 1: Integrated AI Input Engine */}
          <div className="relative z-10 mx-auto flex max-w-[300px] flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]">
              1
            </div>
            <h4 className="mb-3 text-lg font-bold text-white">
              The AI Input Engine
            </h4>
            <p className="mb-6 text-sm text-gray-400">
              To generate your personalized AI-based report, our engine requires
              three core inputs from you to understand your profile entirely.
            </p>
            <div className="flex w-full flex-col gap-2">
              <span className="rounded border border-gray-700 bg-gray-800/50 px-3 py-2 text-xs text-gray-300">
                1. Target Job Description
              </span>
              <span className="rounded border border-gray-700 bg-gray-800/50 px-3 py-2 text-xs text-gray-300">
                2. Your Current Resume (PDF)
              </span>
              <span className="rounded border border-gray-700 bg-gray-800/50 px-3 py-2 text-xs text-gray-300">
                3. Brief Self-Description
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 mx-auto flex max-w-[280px] flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]">
              2
            </div>
            <h4 className="mb-3 text-lg font-bold text-white">AI Analysis</h4>
            <p className="text-sm text-gray-400">
              Our engine compares your profile against the exact role
              requirements to calculate matches, identify critical skill gaps,
              and formulate tailored questions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 mx-auto flex max-w-[280px] flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-700 bg-[#121214] text-xl font-bold text-[#6348ea]">
              3
            </div>
            <h4 className="mb-3 text-lg font-bold text-white">Get Roadmap</h4>
            <p className="text-sm text-gray-400">
              Receive your comprehensive report detailing your match score,
              specific skill gaps, interview questions, and your personalized
              day-wise preparation plan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
