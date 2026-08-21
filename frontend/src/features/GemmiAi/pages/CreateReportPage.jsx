import { useRef } from "react";

// packages
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

// compo
import BackgroundGrid from "../components/BackgroundGrid";
import AllReportGenbyUserCompo from "../components/AllReportGenbyUserCompo";

// custom hooks
import useAi from "../hooks/useAi.hook";

const CreateReportPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const FileInputRef = useRef(null);
  const { Ailoading, handleCreateReport } = useAi();

  const CreateReport = async (data) => {
    const formdata = new FormData();
    formdata.append("jobDescription", data.jobDescription);
    formdata.append("selfDescription", data?.selfDescription || "");
    if (data.resume?.[0]) {
      formdata.append("resume", data.resume[0]);
    }

    await handleCreateReport(formdata);
    reset();
  };

  const onError = () => {
    if (errors && errors.jobDescription)
      toast.error(errors.jobDescription.message);
    if (errors && errors.resume) toast.error(errors.resume.message);
  };

  const resumeField = register("resume", {
    validate: {
      lessThan5MB: (files) => {
        if (!files?.[0]) return true;
        return (
          files[0].size <= 5 * 1024 * 1024 ||
          "Resume file size must be less than 5MB"
        );
      },
    },
  });

  const UploadFileSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-500 transition-colors group-hover:text-primary"
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
      <path d="M12 11v6"></path>
      <path d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path>
    </svg>
  );

  return (
    <BackgroundGrid>
      {Ailoading ? (
        <div className="animate-fade-in-up flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-primary"></div>
            <p className="animate-pulse text-xl font-bold text-neutral-300">
              Generating Report ...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-6">
          {/* Left Side: Form Container */}
          <div className="flex w-full flex-col gap-6 pt-7 lg:w-[65%]">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-1 rounded-full bg-gradient-to-b from-primary to-transparent" />
              <h1 className="text-4xl font-bold text-neutral-100 lg:text-5xl">
                Forge Your Interview Strategy
              </h1>
            </div>

            {/* main compo */}
            <form
              onSubmit={handleSubmit(CreateReport, onError)}
              className="animate-fade-in-up delay-100"
            >
              <div className="flex flex-col gap-6 rounded-2xl border border-white/5 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md">
                {/* Job Description */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="jobDescription"
                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 uppercase"
                  >
                    <span className="h-2 w-2 rounded-full bg-tertiary"></span>
                    Job Description <span className="text-error">*</span>
                  </label>
                  <textarea
                    {...register("jobDescription", {
                      required: "Job description is required",
                    })}
                    id="jobDescription"
                    rows={6}
                    className="w-full resize-none [scrollbar-width:none] overflow-y-auto rounded-xl border border-white/5 bg-neutral-950/50 p-4 text-sm text-neutral-50 transition-all outline-none placeholder:text-neutral-600 focus:border-primary/50 focus:bg-neutral-950/80"
                    placeholder="Paste the target job description here. Include requirements, responsibilities, and company details..."
                  />
                </div>

                {/* Separator */}
                <div className="flex items-center gap-4 opacity-70">
                  <div className="h-[1px] flex-1 bg-neutral-700" />
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
                    Provide Either One Or Both
                  </span>
                  <div className="h-[1px] flex-1 bg-neutral-700" />
                </div>

                {/* Upload & Self Description Grid (Side by side) */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Resume Upload */}
                  <div className="flex h-full flex-col gap-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                      Upload Resume
                    </label>
                    <input
                      {...resumeField}
                      type="file"
                      ref={(e) => {
                        resumeField.ref(e);
                        FileInputRef.current = e;
                      }}
                      accept=".pdf"
                      className="hidden"
                    />
                    <div
                      onClick={() => FileInputRef.current?.click()}
                      className="group flex min-h-[140px] flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-950/40 p-4 text-center transition-all hover:border-primary hover:bg-neutral-950/70"
                    >
                      <UploadFileSvg />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-300 transition-colors group-hover:text-primary">
                          Click to Upload
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          PDF • Max 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Self Description */}
                  <div className="flex h-full flex-col gap-2">
                    <label
                      htmlFor="selfDescription"
                      className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 uppercase"
                    >
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                      Self Description
                    </label>
                    <textarea
                      {...register("selfDescription")}
                      id="selfDescription"
                      rows={5}
                      className="w-full flex-1 resize-none [scrollbar-width:none] overflow-y-auto rounded-xl border border-white/5 bg-neutral-950/50 p-4 text-[13px] text-neutral-50 transition-all outline-none placeholder:text-neutral-600 focus:border-primary/50 focus:bg-neutral-950/80"
                      placeholder="Tell us about your current skills, years of experience, and key achievements..."
                    />
                  </div>
                </div>

                <div className="mt-2 flex h-20 w-full flex-row items-center gap-2 rounded-xl border border-white/5 bg-neutral-800/40">
                  {/* Left Side: Pro Tip */}
                  <div className="flex h-full w-1/2 flex-col justify-center pl-5">
                    <p className="pr-2 font-body-md text-sm leading-relaxed text-neutral-500">
                      <span className="font-bold text-neutral-300">
                        Pro tip:{" "}
                      </span>
                      Provide Resume and Self-Description both for better report
                      generation.
                    </p>
                  </div>

                  {/* Right Side: Action Button  */}
                  <div className="flex h-full w-1/2 justify-center px-13 py-3">
                    <button
                      type="Submit"
                      className="group relative h-full w-full rounded-2xl bg-gradient-to-r from-primary to-secondary p-[1px] text-sm text-neutral-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />

                      <div className="relative flex h-full w-full items-center justify-center gap-2 rounded-2xl bg-surface transition-colors duration-500 ease-in-out group-hover:bg-transparent">
                        <span className="font-label-md text-[14px] font-bold tracking-wide text-on-surface transition-colors duration-500 ease-in-out group-hover:text-surface-container-lowest md:text-[16px]">
                          Generate Interview Report
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side: Sidebar which show most react report*/}
          <AllReportGenbyUserCompo />
        </div>
      )}

      <Toaster position="bottom-right" reverseOrder={false} />
    </BackgroundGrid>
  );
};

export default CreateReportPage;
