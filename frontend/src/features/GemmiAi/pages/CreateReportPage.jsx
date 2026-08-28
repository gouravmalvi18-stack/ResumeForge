import { useRef } from "react";

// packages
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

// compo
import BackgroundGrid from "../components/BackgroundGrid";
import MostRecentReportGenByUserCompo from "../components/MostRecentReportGenByUserCompo";
import { UploadFileIcon } from "../components/AllIconInSvg";

// custom hooks
import useAi from "../hooks/useAi.hook";
import Navbar from "../components/Navbar";

const CreateReportPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const FileInputRef = useRef(null);
  const { Ailoading, handleCreateReport } = useAi();

  // Main fun
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

  // Ui Err this handle incorrect user input
  const onError = () => {
    if (errors && errors.jobDescription)
      toast.error(errors.jobDescription.message);
    if (errors && errors.resume) toast.error(errors.resume.message);
  };

  //Resume Upload register and File validator
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

  return (
    <>
      <Navbar />
      <BackgroundGrid>
        {Ailoading ? (
          <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-primary"></div>
              <p className="animate-pulse text-xl font-bold text-neutral-300">
                Generating Report...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 px-4 pb-10 md:px-0 lg:flex-row">
            {/* Left Side: Form Container */}
            <div className="flex w-full flex-col gap-6 pt-7 lg:w-[65%]">
              {/* Header */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-primary to-transparent md:h-10" />

                <h1 className="text-3xl leading-tight font-bold text-neutral-100 md:text-4xl lg:text-5xl">
                  Forge Your Interview Strategy
                </h1>
              </div>

              {/* main compo */}
              <form onSubmit={handleSubmit(CreateReport, onError)}>
                <div className="flex flex-col gap-6 rounded-2xl border border-white/5 bg-neutral-900/60 p-4 shadow-xl backdrop-blur-md md:p-6">
                  {/* Job Description */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="jobDescription"
                      className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 uppercase"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-tertiary"></span>
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
                    <span className="text-center text-[9px] tracking-widest text-neutral-400 uppercase md:text-[10px]">
                      Provide Either One Or Both
                    </span>
                    <div className="h-[1px] flex-1 bg-neutral-700" />
                  </div>

                  {/* Upload & Self Description Grid (Side by side on md+) */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Resume Upload */}
                    <div className="flex h-full flex-col gap-2">
                      <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-secondary"></span>
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
                        <UploadFileIcon />
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
                        <span className="h-2 w-2 shrink-0 rounded-full bg-secondary"></span>
                        Self Description
                      </label>
                      <textarea
                        {...register("selfDescription")}
                        id="selfDescription"
                        rows={5}
                        className="min-h-[140px] w-full flex-1 resize-none [scrollbar-width:none] overflow-y-auto rounded-xl border border-white/5 bg-neutral-950/50 p-4 text-[13px] text-neutral-50 transition-all outline-none placeholder:text-neutral-600 focus:border-primary/50 focus:bg-neutral-950/80"
                        placeholder="Tell us about your current skills, years of experience, and key achievements..."
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-neutral-800/40 p-4 md:h-20 md:flex-row md:p-0">
                    {/* Left Side: Pro Tip */}
                    <div className="flex w-full flex-col justify-center text-center md:w-1/2 md:pl-5 md:text-left">
                      <p className="font-body-md text-xs leading-relaxed text-neutral-500 md:text-sm">
                        <span className="mb-1 block font-bold text-neutral-300 md:mb-0 md:inline">
                          Pro tip:{" "}
                        </span>
                        Provide Resume and Self-Description both for better
                        report generation.
                      </p>
                    </div>

                    {/* Right Side: Action Button */}
                    <div className="flex h-12 w-full shrink-0 justify-center md:h-full md:w-1/2 md:px-6 md:py-3 lg:px-10">
                      <button
                        type="Submit"
                        className="group relative h-full w-full rounded-xl bg-gradient-to-r from-primary to-secondary p-[1px] text-sm text-neutral-200 transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-95 md:rounded-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />

                        <div className="relative flex h-full w-full items-center justify-center gap-2 rounded-xl bg-surface transition-colors duration-500 ease-in-out group-hover:bg-transparent md:rounded-2xl">
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

            {/* Right Side: Sidebar which show most react report create by user*/}
            <MostRecentReportGenByUserCompo />
          </div>
        )}

        <Toaster position="bottom-right" reverseOrder={false} />
      </BackgroundGrid>
    </>
  );
};

export default CreateReportPage;
