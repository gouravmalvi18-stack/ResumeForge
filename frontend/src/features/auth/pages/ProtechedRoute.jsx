import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { useNavigate } from "react-router";

const ProtechedRoute = ({ children }) => {
  const { User, AuthInitializing } = useContext(AuthContext);
  const navigate = useNavigate();

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

  if (User) {
    return <div className="bg-neutral-950">{children}</div>;
  } else {
    navigate("/login");
  }
};

export default ProtechedRoute;
