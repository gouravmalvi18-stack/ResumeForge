import React, { useEffect, useState } from "react";

//packages
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";

//Custom Auth hook
import { useAuth } from "../hooks/useAuth.hook";

//components
import BtnCompo from "../components/BtnCompo";

//icon
const LockSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="currentcolor"
    className="icon icon-tabler icons-tabler-outline icon-tabler-lock h-8"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
  </svg>
);

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
      <div className="flex min-h-screen justify-center bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] pt-20">
        {Loading ? (
          <p className="pt-50 text-4xl text-text-primary">Loading....</p>
        ) : (
          <div className="h-120 w-100 rounded-2xl border-[0.5px] border-white/10 pt-6">
            {/* Title Compo */}
            <div className="flex w-full flex-col items-center justify-center gap-5">
              <div className="rounded-full bg-[#c6407cba] p-2">
                <LockSvg />
              </div>
              <h1 className="text-2xl text-text-primary">
                Email Verification{" "}
              </h1>
            </div>
            {/* main Compo  */}
            <form onSubmit={handleSubmit(UserOtp)} className="w-full p-5">
              <div className="flex flex-col gap-5 rounded-2xl border-[0.5px] border-white/10 p-6 py-8">
                {/* Otp Field  */}
                <div className="flex w-full flex-col gap-2">
                  <label className="pl-1 text-sm font-bold tracking-wide text-text-primary">
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
                    className="rounded-lg border-[0.5px] border-white/30 py-2 text-center text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                  />
                  {/* Resend OTP Btn  */}
                  <div className="flex w-full items-center gap-2">
                    <button
                      type="button"
                      onClick={ResendUserOtp}
                      disabled={IsResending}
                      className={`pl-3 text-[12px] font-bold text-text-primary hover:text-[#c6407cba] ${IsResending ? "cursor-not-allowed" : "hover:cursor-pointer"}`}
                    >
                      Resend Otp?
                    </button>
                    <span className="text-sm text-text-secondary">
                      00 : {ResendTimer}
                    </span>
                  </div>

                  {errors && errors.otp && (
                    <span className="pl-2 text-sm text-red-500">
                      {errors.otp.message}
                    </span>
                  )}
                </div>

                {/* Submit btn  */}
                <BtnCompo
                  isSubmitting={isSubmitting}
                  WillSumbitText="Submitting..."
                  BtnType="submit"
                  Name="Submit"
                  className="rounded-2xl bg-[#c6407cba] py-2 text-center font-extrabold text-neutral-950 transition-all duration-100 ease-in-out hover:cursor-pointer active:scale-90"
                />
              </div>
              <div className="pl-2"></div>
            </form>

            <div className="flex w-full flex-col justify-center pb-5">
              <p className="text-center text-lg text-text-secondary">
                Check your Register Email
              </p>
              <p className="text-center text-sm text-text-primary">
                {User?.email}
              </p>
            </div>
          </div>
        )}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default EmailVerfication;
