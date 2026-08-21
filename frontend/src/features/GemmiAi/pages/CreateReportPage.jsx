import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../auth/hooks/useAuth.hook";

//packages
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

//compo
import BackgroundGrid from "../components/BackgroundGrid";

//custom hooks
import useAi from "../hooks/useAi.hook";

const CreateReportPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const FileInputRef = useRef(null);
  const { Ailoading, handleCreateReport } = useAi();
  // const { handleFetchAllReport } = useAuth();
  // console.log(inputEl.current?);
  // useEffect(() => {
  //   handleFetchAllReport();
  // }, []);

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

  // show error if any field is invalid
  const onError = () => {
    if (errors && errors.jobDescription)
      toast.error(errors.jobDescription.message);
    if (errors && errors.resume) toast.error(errors.resume.message);
  };

  //Resume feild register
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
    <BackgroundGrid>
      {Ailoading ? (
        <div className="flex h-screen items-center justify-center">
          <p className="text-center text-4xl text-neutral-50">Loading....</p>
        </div>
      ) : (
        <div className="flex w-[65%] flex-col">
          <div className="mb-5 flex h-28 w-150 gap-5 pt-7">
            <div className="mt-1 h-10 w-1 rounded-full bg-gradient-to-b from-primary to-transparent" />
            <h1 className="text-5xl font-bold">
              Forge Your Interview Strategy
            </h1>
          </div>
          {/* main compo  */}
          <form
            onSubmit={handleSubmit(CreateReport, onError)}
            className="w-full p-2"
          >
            <div className="flex max-h-145 flex-col gap-5 rounded-2xl bg-neutral-900/60 px-5 pt-4">
              {/* Jod Description compo  */}
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="jobDescription"
                  className="flex items-center gap-1 text-sm font-bold text-neutral-400"
                >
                  <span className="h-2 w-2 rounded-full bg-tertiary"></span>
                  Job Description
                  <span>*</span>
                </label>

                <textarea
                  {...register("jobDescription", {
                    required: "Job description is required",
                  })}
                  id="jobDescription"
                  className="min-h-50 w-full resize-none [scrollbar-width:none] overflow-y-auto rounded-2xl bg-neutral-950/80 px-3 py-3 text-sm text-neutral-50 outline-none placeholder:text-neutral-600"
                  placeholder="Paste the target job description here. Include requirements, responsibilities, and company details..."
                />
              </div>

              {/* Separator */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
                <span className="font-label-md text-[11px] tracking-widest text-on-surface-variant/50 uppercase">
                  Provide Either One Or Both
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-outline-variant/30 to-transparent" />
              </div>

              {/* Resume and self desc compo  */}
              <div className="flex h-45 gap-3">
                {/* resume  */}
                <div className="relative w-[50%]">
                  <label
                    htmlFor="resume"
                    className="mb-2 flex items-center gap-1 text-sm font-bold text-neutral-400"
                  >
                    <span className="h-2 w-2 rounded-full bg-secondary/90"></span>
                    Upload Resume
                  </label>
                  <input
                    {...resumeField}
                    type="file"
                    id="resume"
                    ref={(e) => {
                      resumeField.ref(e);
                      FileInputRef.current = e;
                    }}
                    accept=".pdf"
                    className="hidden"
                  />
                  <div
                    onClick={() => FileInputRef.current?.click()}
                    className="absolute inset-x-0 inset-y-7 flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-800 bg-neutral-950/80 transition-all duration-500 ease-in-out group-hover:text-neutral-500 hover:border-neutral-500"
                  >
                    <h3 className="pb-1 text-lg font-extrabold text-neutral-300">
                      Click to Upload Resume
                    </h3>
                    <p className="text-[12px] font-extrabold text-neutral-800">
                      Supported Format : PDF
                    </p>
                    <p className="text-[12px] font-extrabold text-neutral-800">
                      Maximum Size : 5mb
                    </p>
                  </div>
                </div>
                {/* self description  */}
                <div className="w-[50%]">
                  {" "}
                  <label
                    htmlFor="selfDescription"
                    className="mb-2 flex items-center gap-1 text-sm font-bold text-neutral-400"
                  >
                    <span className="h-2 w-2 rounded-full bg-secondary/90"></span>
                    Self Description
                  </label>
                  <textarea
                    {...register("selfDescription")}
                    id="selfDescription"
                    className="h-full w-full resize-none [scrollbar-width:none] overflow-y-auto rounded-2xl bg-neutral-950/80 px-3 py-4 text-[12px] text-neutral-50 outline-none placeholder:text-neutral-700"
                    placeholder="Tell us about your current skills, years of experience, key achievements, and what makes you a unique fit for this role..."
                  />
                </div>
              </div>
              {/* Report Generation btn */}
              <div className="mt-10 mb-3 flex h-20 w-full gap-2 rounded-2xl bg-neutral-800/40">
                {/* Left Side: Pro Tip */}
                <div className="flex h-full w-1/2 flex-col justify-center pl-5">
                  <p className="font-body-md text-[11px] leading-relaxed text-neutral-500">
                    <span className="font-bold text-neutral-300">
                      Pro tip:{" "}
                    </span>
                    Provide Resume and Self-Description both for better report
                    generation.
                  </p>
                </div>

                {/* Right Side: Action Button */}
                <div className="flex h-full w-1/2 justify-center px-4 py-1.5">
                  <button
                    type="Submit"
                    className="group relative h-full w-full rounded-2xl bg-gradient-to-r from-primary to-secondary p-[1px] text-sm text-neutral-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />

                    <div className="relative flex h-full w-full items-center justify-center gap-2 rounded-2xl bg-surface transition-colors duration-300 group-hover:bg-transparent">
                      <span className="font-label-md text-[14px] font-bold tracking-wide text-on-surface transition-colors duration-300 group-hover:text-surface-container-lowest md:text-[16px]">
                        Generate Interview Report
                      </span>

                      {/* <span className="material-symbols-outlined text-primary transition-colors duration-300 group-hover:text-surface-container-lowest">
                      bolt
                    </span> */}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      <Toaster position="bottom-right" reverseOrder={false} />
    </BackgroundGrid>
  );
};

export default CreateReportPage;
