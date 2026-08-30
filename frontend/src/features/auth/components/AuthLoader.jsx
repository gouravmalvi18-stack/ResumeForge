import React from "react";

const AuthLoader = ({ text }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-primary"></div>
      <p className="animate-pulse text-xl font-bold text-neutral-300">{text}</p>
    </div>
  );
};

export default AuthLoader;
