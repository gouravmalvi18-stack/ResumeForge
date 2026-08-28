import React from "react";

//packages
import { useForm } from "react-hook-form";
import { Link } from "react-router";

//components
import BtnCompo from "../components/BtnCompo";

//Custom Hook
import { useAuth } from "../hooks/useAuth.hook";

const Resgister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { Loading, handleRegister } = useAuth();

  const RegisterUser = async (data) => {
    const { username, email, password } = data;
    await handleRegister({ username, email, password });
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] bg-fixed"></div>
      <div className="z-10 flex min-h-screen w-full items-center justify-center">
        {Loading ? (
          <p className="text-4xl text-text-primary">Loading....</p>
        ) : (
          <div className="mx-auto flex w-100 flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5">
            {/* Welcome Title  */}
            <h1 className="w-full text-center text-2xl text-text-primary">
              Welcome to ResumeForge
            </h1>
            {/* main form compo  */}
            <div className="mx-6 mt-7 flex flex-col rounded-2xl border-[0.5px] border-white/10 bg-[#0a0812] pt-4">
              <h2 className="pl-5 text-center text-text-primary">
                Create Account
              </h2>
              <form
                onSubmit={handleSubmit(RegisterUser)}
                className="flex flex-1 flex-col gap-y-5 pt-7"
              >
                {/* Username Field   */}
                <div className="flex w-full flex-col gap-2 px-5">
                  <label className="pl-1 text-sm font-bold tracking-wide text-text-primary">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("username", {
                      required: " Username is required",
                    })}
                    type="text"
                    placeholder="Enter your name"
                    className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                  />
                  {errors && errors.username && (
                    <span className="pl-2 text-sm text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {/* Email Field  */}
                <div className="flex w-full flex-col gap-2 px-5">
                  <label className="pl-1 text-sm font-bold tracking-wide text-text-primary">
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
                    className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                  />
                  {errors && errors.email && (
                    <span className="pl-2 text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex w-full flex-col gap-2 px-5">
                  <label className="pl-1 text-sm font-bold tracking-wide text-text-primary">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("password", {
                      required: " Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    type="text"
                    placeholder="Enter your password"
                    className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-text-primary placeholder-text-secondary hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
                  />
                  {errors && errors.password && (
                    <span className="pl-2 text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Submit btn  */}
                <BtnCompo
                  isSubmitting={isSubmitting}
                  WillSumbitText="Creating a account..."
                  BtnType="submit"
                  Name="Signup"
                  className="w-full rounded-b-2xl border border-white/30 py-2 text-center font-bold text-text-primary hover:cursor-pointer hover:opacity-70"
                />
              </form>
            </div>
            <p className="mt-4 text-center text-text-secondary">
              Already have a Account?{" "}
              <Link
                className="text-text-primary hover:text-red-900"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Resgister;
