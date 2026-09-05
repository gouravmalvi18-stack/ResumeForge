import React, { useState } from "react";

//packages
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

//component
import BtnCompo from "../components/BtnCompo";
import AuthLoader from "../components/AuthLoader";

// --- Icons for Password Toggle ---
import { EyeIcon, EyeOffIcon } from "../components/AllAuthICon";

//custom hook
import { useAuth } from "../hooks/useAuth.hook";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { handleLogin, Loading } = useAuth();

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const LoginUser = async (data) => {
    await handleLogin(data);
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 z-0 bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] bg-fixed"></div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
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
            <div className="mx-auto flex w-full max-w-md flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5 shadow-2xl backdrop-blur-sm">
              {/* Welcome Title */}
              <h1 className="w-full text-center text-xl text-text-primary sm:text-2xl">
                Welcome to ResumeForge
              </h1>

              {/* main form compo */}
              <div className="mx-4 mt-6 flex flex-col rounded-2xl border-[0.5px] border-white/10 bg-[#0a0a12] pt-2 shadow-lg sm:mx-6">
                <h2 className="pl-5 text-center text-base tracking-wider text-text-primary sm:text-lg">
                  Login
                </h2>

                <form
                  onSubmit={handleSubmit(LoginUser)}
                  className="flex flex-1 flex-col gap-y-5 pt-7"
                >
                  {/* Email Field */}
                  <div className="flex w-full flex-col gap-2 px-4 sm:px-5">
                    <label className="pl-1 text-xs font-bold tracking-wide text-text-primary sm:text-sm">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: " Email is required",
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border-[0.5px] border-white/30 bg-transparent px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                    />
                    {errors && errors.email && (
                      <span className="pl-2 text-sm text-red-500">
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
                      <span className="pl-2 text-sm text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  {/* Submit btn (Original Design Restored) */}
                  <BtnCompo
                    isSubmitting={isSubmitting}
                    WillSumbitText="Logging..."
                    BtnType="submit"
                    Name="Login"
                    className="w-full rounded-b-2xl border border-white/30 bg-black/30 py-2 text-center font-bold text-text-primary hover:cursor-pointer hover:opacity-70"
                  />
                </form>
              </div>

              <p className="mt-4 text-center text-sm text-text-secondary sm:text-base">
                Account Not Create?{" "}
                <Link
                  className="text-text-primary transition-colors hover:text-red-500"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
