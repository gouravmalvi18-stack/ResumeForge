import React, { useContext, useState } from "react";

//context
import { AuthContext } from "../../auth/Auth.context";

// Icons
import { BoltIcon, LogoutIcon } from "./AllIconInSvg";

const Navbar = () => {
  const { User } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between border-b bg-neutral-900/80 px-gutter py-1.5 backdrop-blur-xl">
      {/* Left Side: BrandName */}
      <div className="flex h-full items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
          <BoltIcon />
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
            <LogoutIcon />
          </span>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
