import React, { useState } from "react";

//packages
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

//components
import BtnCompo from "../components/BtnCompo";
import AuthLoader from "../components/AuthLoader";

// --- Icons for Password Toggle ---
import { EyeIcon, EyeOffIcon } from "../components/AllAuthICon";

//Custom Hook
import { useAuth } from "../hooks/useAuth.hook";

const Resgister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { Loading, handleRegister } = useAuth();

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const RegisterUser = async (data) => {
    const { username, email, password } = data;
    await handleRegister({ username, email, password });
    reset();
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] bg-fixed"></div>

      {/* Main Container - Added px-4 for mobile breathing room */}
      <div className="z-10 flex min-h-screen w-full items-center justify-center px-4">
        {Loading ? (
          <AuthLoader text={"Wait a Moment ..."} />
        ) : (
          <>
            <button
              onClick={() => navigate("/")}
              className="group fixed top-10 left-10 rounded-2xl border-[0.5px] border-white/12 bg-black px-7 py-2 text-sm text-neutral-50 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/60 hover:text-neutral-300"
            >
              Home
              <div className="absolute inset-x-0 -bottom-[1px] mx-auto h-[2px] w-[80%] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80 transition-all duration-500 ease-in-out group-hover:h-[3px] group-hover:opacity-100"></div>
            </button>
            {/* Card Container  */}
            <div className="mx-auto flex w-full max-w-md flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5 shadow-2xl backdrop-blur-sm">
              {/* Welcome Title */}
              <h1 className="w-full text-center text-xl text-text-primary sm:text-2xl">
                Welcome to ResumeForge
              </h1>

              {/* Main Form Container - Responsive side margins */}
              <div className="mx-4 mt-7 flex flex-col rounded-2xl border-[0.5px] border-white/10 bg-[#0a0812] pt-4 shadow-lg sm:mx-6">
                <h2 className="pl-5 text-center text-base text-text-primary sm:text-lg">
                  Create Account
                </h2>

                <form
                  onSubmit={handleSubmit(RegisterUser)}
                  className="flex flex-1 flex-col gap-y-5 pt-7"
                >
                  {/* Username Field */}
                  <div className="flex w-full flex-col gap-2 px-4 sm:px-5">
                    <label className="pl-1 text-xs font-bold tracking-wide text-text-primary sm:text-sm">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("username", {
                        required: " Username is required",
                      })}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-lg border-[0.5px] border-white/30 bg-transparent px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                    />
                    {errors && errors.username && (
                      <span className="pl-2 text-xs text-red-500 sm:text-sm">
                        {errors.username.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="flex w-full flex-col gap-2 px-4 sm:px-5">
                    <label className="pl-1 text-xs font-bold tracking-wide text-text-primary sm:text-sm">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: " Email is required",
                        validate: {
                          matchPattern: (value) =>
                            /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ||
                            "Please enter valid email",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border-[0.5px] border-white/30 bg-transparent px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                    />
                    {errors && errors.email && (
                      <span className="pl-2 text-xs text-red-500 sm:text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Password Field with Toggle */}
                  <div className="flex w-full flex-col gap-2 px-4 sm:px-5">
                    <label className="pl-1 text-xs font-bold tracking-wide text-text-primary sm:text-sm">
                      Password <span className="text-red-500">*</span>
                    </label>

                    {/* Relative wrapper for absolute icon positioning */}
                    <div className="relative w-full">
                      <input
                        {...register("password", {
                          required: " Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border-[0.5px] border-white/30 bg-transparent px-3 py-2 pr-10 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                      />

                      {/* Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none"
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>

                    {errors && errors.password && (
                      <span className="pl-2 text-xs text-red-500 sm:text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  {/* Submit btn (Original Design Restored) */}
                  <BtnCompo
                    isSubmitting={isSubmitting}
                    WillSumbitText="Creating a account..."
                    BtnType="submit"
                    Name="Signup"
                    className="w-full rounded-b-2xl border border-white/30 py-2 text-center font-bold text-text-primary hover:cursor-pointer hover:opacity-70"
                  />
                </form>
              </div>

              <p className="mt-4 text-center text-sm text-text-secondary sm:text-base">
                Already have a Account?{" "}
                <Link
                  className="text-text-primary transition-colors hover:text-red-500"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Resgister;
