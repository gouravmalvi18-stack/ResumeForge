import React, { useContext, useState } from "react";

//context
import { AuthContext } from "../../auth/Auth.context";

// SVG's
const BoltSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-surface"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
  </svg>
);
const LogoutSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M9 12h12l-3 -3" />
    <path d="M18 15l3 -3" />
  </svg>
);

const Navbar = () => {
  const { User } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between border-b bg-neutral-900/80 px-gutter py-1.5 backdrop-blur-xl">
      {/* Left Side: BrandName */}
      <div className="flex h-full items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
          <BoltSvg />
        </div>
        <h1 className="text-[18px] font-bold tracking-tight text-on-surface">
          ResumeForge
        </h1>
      </div>

      {/* Right Side: Actions */}
      <div className="flex h-full items-center gap-6">
        {/* User Name */}
        <div className="flex cursor-pointer items-center gap-2 rounded-full bg-surface-container-high px-4 py-1.5 ring-1 ring-white/5 transition-colors hover:bg-surface-container-highest">
          <span className="text-[14px] font-semibold tracking-wide text-on-surface capitalize">
            {User.username}
          </span>
        </div>

        {/* Logout Button */}
        <button className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-semibold tracking-wide text-error transition-all hover:bg-error-container/20">
          <span className="transition-transform group-hover:-translate-x-1">
            <LogoutSvg />
          </span>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
