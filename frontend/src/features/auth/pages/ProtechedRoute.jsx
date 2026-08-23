import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { Link } from "react-router";

const ProtechedRoute = ({ children }) => {
  const { User, AuthInitializing } = useContext(AuthContext);

  if (AuthInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-primary"></div>
          <p className="animate-pulse text-xl font-bold text-neutral-300">
            Wait a Moment ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {User ? (
        <>{children}</>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <p className="text-center text-3xl text-text-primary">
            Please login to use the ResumeForge
          </p>
          <Link className="text-text-primary hover:text-red-900" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProtechedRoute;
