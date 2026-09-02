import { useNavigate } from "react-router";
import HeroImg from "../imgs/HeroImage.png";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-15 pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6348ea]/30 bg-[#6348ea]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#6348ea] uppercase">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#6348ea]"></span>
              AI-Powered Interview Prep
            </div>

            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              Turn Any Job Description Into a{" "}
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Winning Strategy.
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-lg text-gray-400">
              Stop walking into interviews blind. ResumeForge instantly analyzes
              your resume against your target role to reveal exact skill gaps
              and generate a step-by-step prep plan to get you hired.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-[#6348ea] px-8 py-3.5 font-medium text-white shadow-[0_0_20px_rgba(99,72,234,0.3)] transition-all duration-300 hover:bg-[#5035cc] hover:shadow-[0_0_25px_rgba(99,72,234,0.5)]"
              >
                Start Your Free Analysis
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="mt-10 lg:col-span-6 lg:mt-0">
            <div className="group relative w-full overflow-hidden rounded-xl border border-gray-800 bg-[#121214] p-1 shadow-2xl">
              <div className="flex gap-2 border-b border-gray-800/50 bg-[#0e0e11] px-4 py-2.5">
                {/* Mac UI Dots */}
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="relative bg-[#0a0a0c]">
                <img
                  src={HeroImg}
                  alt="ResumeForge Dashboard View"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridging the Gap Section */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <div className="rounded-2xl border border-gray-800 bg-[#121214] p-10 text-center md:p-16">
            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Bridging the Gap Between Talent and Opportunity.
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              ResumeForge was built to take the guesswork out of interview
              preparation. We use advanced AI to help candidates understand
              exactly what employers are looking for and provide the actionable,
              concrete steps needed to get there. Secure, fast, and completely
              tailored to you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
