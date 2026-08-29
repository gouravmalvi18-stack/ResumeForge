import React, { useContext } from "react";
// context
import { AuthContext } from "../../auth/Auth.context";

// custom hook
import { useAuth } from "../../auth/hooks/useAuth.hook";

// Icons
import {
  BoltIcon,
  CurrentDeviceLogoutIcon,
  AlldeviceLogoutIcon,
} from "./AllSvg";

const Navbar = () => {
  const { User } = useContext(AuthContext);
  const { handleLogoutfromCurrentDevice, handleLogoutfromAllDevice } =
    useAuth();

  // Logout handlers
  const LogoutFromCurrentDevice = () => {
    handleLogoutfromCurrentDevice();
  };
  const LogoutFromAllDevice = () => {
    handleLogoutfromAllDevice();
  };

  return (
    <header className="z-50 flex items-center justify-between border-b bg-neutral-900/80 px-gutter py-1.5 backdrop-blur-xl">
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
      <div className="flex h-full items-center gap-4">
        {/* User Name */}
        <div className="flex cursor-pointer items-center gap-2 rounded-full bg-surface-container-high px-4 py-1.5 ring-1 ring-white/5 transition-colors hover:bg-surface-container-highest">
          <span className="text-[14px] font-semibold tracking-wide text-on-surface capitalize">
            {User?.username || "Guest"}
          </span>
        </div>

        {/* Action Buttons Wrapper */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-2">
          {/* Logout Current Device Button */}
          <button
            onClick={LogoutFromCurrentDevice}
            className="group relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <CurrentDeviceLogoutIcon />
            <span className="pointer-events-none invisible absolute top-full right-5 z-50 mt-2 translate-x-1/2 translate-y-[10px] rounded-lg border border-red-500/30 bg-[#16181d] px-2 py-1.5 text-[10px] font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              Logout from Currnt device
            </span>
          </button>

          {/* Logout All Devices Button */}
          <button
            onClick={LogoutFromAllDevice}
            className="group relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#8B909A] transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <AlldeviceLogoutIcon />
            <span className="pointer-events-none invisible absolute top-full -right-5 z-50 mt-2 translate-y-[10px] rounded-lg border border-red-500/30 bg-[#16181d] px-2 py-1.5 text-[10px] font-medium whitespace-nowrap text-white opacity-0 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              Logout from all devices
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
