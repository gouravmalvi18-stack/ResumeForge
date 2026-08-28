import React from "react";

//component
import BtnCompo from "../components/BtnCompo";

//packages
import { useForm } from "react-hook-form";
import { Link } from "react-router";

//custom hook
import { useAuth } from "../hooks/useAuth.hook";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { handleLogin, Loading } = useAuth();

  const LoginUser = async (data) => {
    const { email, password } = data;

    await handleLogin({ email, password });
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black bg-[radial-gradient(circle_at_80%_100%,rgba(219,39,119,0.25),transparent_55%),radial-gradient(circle_at_20%_0%,rgba(30,27,75,0.4),transparent_50%)] bg-fixed"></div>
      <div className="flex min-h-screen w-full items-center justify-center">
        {Loading ? (
          <p className="text-4xl text-text-primary">Loading....</p>
        ) : (
          <div className="mx-auto flex w-100 flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5">
            {/* Welcome Title  */}
            <h1 className="w-full text-center text-2xl text-text-primary">
              Welcome to ResumeForge
            </h1>

            {/* main form compo  */}
            <div className="mx-6 mt-6 flex flex-col rounded-2xl border-[0.5px] border-white/10 bg-[#0a0a12] pt-2">
              <h2 className="pl-5 text-center text-lg tracking-wider text-text-primary">
                Login
              </h2>

              <form
                onSubmit={handleSubmit(LoginUser)}
                className="flex flex-1 flex-col gap-y-5 pt-7"
              >
                {/* Email Field  */}
                <div className="flex w-full flex-col gap-2 px-5">
                  <label className="pl-1 text-sm font-bold tracking-wide text-text-primary">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email", {
                      required: " Email is required",
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
                  WillSumbitText="Logging..."
                  BtnType="submit"
                  Name="Login"
                  className="w-full rounded-b-2xl border border-white/30 bg-black/30 py-2 text-center font-bold text-text-primary hover:cursor-pointer hover:opacity-70"
                />
              </form>
            </div>
            <p className="mt-4 text-center text-text-secondary">
              Account Not Create?{" "}
              <Link
                className="text-text-primary hover:text-red-900"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
