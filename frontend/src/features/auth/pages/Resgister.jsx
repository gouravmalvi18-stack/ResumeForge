import React from "react";

//components
import InputCompo from "../components/InputCompo";
import BtnCompo from "../components/BtnCompo";

const Resgister = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[linear-gradient(to_bottom,#05040c_0%,#05040c_51%,#09061a_77%,#0d0a1d_100%)]">
      <div className="bg-linear-grident mx-auto flex w-120 flex-col rounded-2xl border-[0.5px] border-white/10 bg-black/10 py-5">
        <h1 className="w-full text-center text-2xl text-neutral-300">
          Welcome to ResumeForge
        </h1>
        <div className="mx-6 mt-7 flex flex-col rounded-2xl border-[0.5px] border-white/10 pt-4">
          <h2 className="pl-5 text-center text-neutral-100">Create Account</h2>
          <form className="flex flex-1 flex-col gap-y-5 py-7">
            <InputCompo
              labelName="Username"
              InputType="text"
              Placeholder="Enter your name"
            />
            <InputCompo
              labelName="Email"
              InputType="email"
              Placeholder="Enter your email"
            />
            <InputCompo
              labelName="Password"
              InputType="text"
              Placeholder="Enter your password"
            />
          </form>
          <BtnCompo
            BtnType="submit"
            Name="Signup"
            className="w-full rounded-b-2xl border border-white/30 bg-black/30 py-2 text-center font-bold text-neutral-200 hover:cursor-pointer hover:opacity-70"
          />
        </div>
        <p className="mt-4 text-center text-neutral-600">
          Already have a Account? Login
        </p>
      </div>
    </div>
  );
};

export default Resgister;
