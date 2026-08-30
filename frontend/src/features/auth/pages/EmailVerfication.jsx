import React, { useEffect, useState } from "react";

//packages
import { useForm } from "react-hook-form";

//components
import BtnCompo from "../components/BtnCompo";
import AuthLoader from "../components/AuthLoader";

//icon
import { LockIcon } from "../components/AllAuthICon";

//Custom Auth hook
import { useAuth } from "../hooks/useAuth.hook";

const EmailVerfication = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [IsResending, setIsResending] = useState(false);
  const [ResendTimer, setResendTimer] = useState(59);

  const { User, handleEmailVerification, Loading, handleResendOtp } = useAuth();

  // Otp Handlers
  const UserOtp = async (data) => {
    const { otp } = data;
    const { email } = User;

    await handleEmailVerification({ otp, email });

    reset();
  };

  const ResendUserOtp = async () => {
    const { email } = User;
    setIsResending(true);
    await handleResendOtp({ email });
    setIsResending(false);
  };

  // Otp Resend Timer
  useEffect(() => {
    setIsResending(true);
    const IntervalId = setInterval(() => {
      setResendTimer((perv) => {
        if (perv <= 1) {
          clearInterval(IntervalId);
          setIsResending(false);
          return 0;
        }
        return perv - 1;
      });
    }, 1000);

    return () => clearInterval(IntervalId);
  }, []);

  return (
    <>
      {/* Background layer matching Login/Register */}
      <div className="fixed inset-0 -z-10 bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] bg-fixed"></div>

      {/* Main Container - Added px-4 for mobile spacing */}
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
        {Loading ? (
          <AuthLoader text={"Wait a Moment ..."} />
        ) : (
          /* Card Container - Swapped fixed w-100/h-120 for w-full max-w-md */
          <div className="mx-auto flex w-full max-w-md flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-6 shadow-2xl backdrop-blur-sm sm:py-8">
            {/* Title Compo */}
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:gap-5">
              <div className="rounded-full bg-[#c6407cba] p-3 shadow-lg shadow-[#c6407cba]/20 sm:p-4">
                <LockIcon />
              </div>
              <h1 className="px-4 text-center text-xl font-semibold text-text-primary sm:text-2xl">
                Email Verification
              </h1>
            </div>

            {/* main Compo  */}
            <form
              onSubmit={handleSubmit(UserOtp)}
              className="mt-6 w-full px-4 sm:px-6"
            >
              <div className="flex flex-col gap-5 rounded-2xl border-[0.5px] border-white/10 bg-[#0a0a12] p-5 shadow-lg sm:p-8">
                {/* Otp Field  */}
                <div className="flex w-full flex-col gap-2">
                  <label className="pl-1 text-xs font-bold tracking-wide text-text-primary sm:text-sm">
                    Enter the OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("otp", {
                      required: "otp is required",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Only numbers are allowed",
                      },
                      minLength: { value: 6, message: "minlength of otp is 6" },
                      maxLength: { value: 6, message: "maxlength of otp is 6" },
                    })}
                    type="text"
                    placeholder="XXXXXX"
                    className="w-full rounded-lg border-[0.5px] border-white/30 bg-transparent py-2.5 text-center text-sm font-bold tracking-[0.5em] text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300 sm:py-3 sm:text-base"
                  />

                  {/* Resend OTP Btn  */}
                  <div className="mt-1 flex w-full items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={ResendUserOtp}
                      disabled={IsResending}
                      className={`text-[12px] font-bold text-text-primary transition-colors hover:text-[#c6407cba] sm:text-sm ${IsResending ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"}`}
                    >
                      Resend Otp?
                    </button>
                    <span className="text-[12px] font-medium text-text-secondary sm:text-sm">
                      00 : {ResendTimer.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {errors && errors.otp && (
                    <span className="pl-2 text-xs text-red-500 sm:text-sm">
                      {errors.otp.message}
                    </span>
                  )}
                </div>

                {/* Submit btn (Original Design Maintained) */}
                <BtnCompo
                  isSubmitting={isSubmitting}
                  WillSumbitText="Submitting..."
                  BtnType="submit"
                  Name="Submit"
                  className="rounded-2xl bg-[#c6407cba] py-2 text-center font-extrabold text-neutral-950 transition-all duration-100 ease-in-out hover:cursor-pointer active:scale-90"
                />
              </div>
            </form>

            <div className="mt-6 flex w-full flex-col justify-center">
              <p className="px-4 text-center text-sm text-text-secondary sm:text-base">
                Check your Registered Email Id
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailVerfication;
