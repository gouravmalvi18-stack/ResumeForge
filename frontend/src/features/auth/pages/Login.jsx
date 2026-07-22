import React from "react";

//components
import InputCompo from "../components/InputCompo";
import BtnCompo from "../components/BtnCompo";

//packages
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const LoginUser = async (data) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });

    console.log(data);
    reset();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[linear-gradient(to_bottom,#05040c_0%,#05040c_51%,#09061a_77%,#0d0a1d_100%)]">
      <div className="bg-linear-grident mx-auto flex w-120 flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5">
        <h1 className="w-full text-center text-2xl text-neutral-300">
          Welcome to ResumeForge
        </h1>
        <div className="mx-6 mt-6 flex flex-col rounded-2xl border-[0.5px] border-white/10 pt-2">
          <h2 className="pl-5 text-center text-lg tracking-wider text-neutral-100">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(LoginUser)}
            className="flex flex-1 flex-col gap-y-5 pt-7"
          >
            {/* Email Field  */}
            <div className="flex w-full flex-col gap-2 px-5">
              <label className="pl-1 text-sm font-bold tracking-wide text-neutral-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", {
                  required: " Email is required",
                })}
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-neutral-200 placeholder-neutral-600 hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
              />
              {errors && errors.email && (
                <span className="pl-2 text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Password Field */}
            <div className="flex w-full flex-col gap-2 px-5">
              <label className="pl-1 text-sm font-bold tracking-wide text-neutral-300">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                {...register("password", {
                  required: " Password is required",
                })}
                type="text"
                placeholder="Enter your password"
                className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-neutral-200 placeholder-neutral-600 hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
              />
              {errors && errors.password && (
                <span className="pl-2 text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <BtnCompo
              isSubmitting={isSubmitting}
              WillSumbitText="Logging..."
              BtnType="submit"
              Name="Login"
              className="w-full rounded-b-2xl border border-white/30 bg-black/30 py-2 text-center font-bold text-neutral-200 hover:cursor-pointer hover:opacity-70"
            />
          </form>
        </div>
        <p className="mt-4 text-center text-neutral-600">
          Account Not Create?{" "}
          <Link className="text-neutral-300 hover:text-red-900" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
