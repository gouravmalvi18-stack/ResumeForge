import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { Link } from "react-router";
const ProtechedRoute = ({ children }) => {
  const { Token, Loading, AuthReady } = useContext(AuthContext);

  if (Loading || !AuthReady) {
    return (
      <div className="h-screen bg-neutral-950">
        <p className="pt-50 text-center text-4xl text-text-primary">
          Loading....
        </p>
      </div>
    );
  }
  return <>{children}</>;
  // return (
  //   <div className="h-screen bg-neutral-950">
  //     {/* {Token ? (
  //       <div>{children}</div>
  //     ) : (
  //       <div className="flex h-full flex-col items-center justify-center gap-5">
  //         <p className="text-center text-3xl text-text-primary">
  //           Please login first to use the ResumeForge
  //         </p>
  //         <Link className="text-text-primary hover:text-red-900" to="/login">
  //           Login
  //         </Link>
  //       </div>
  //     )} */}
  //     {Token && <div>{children}</div>}
  //   </div>
  // );
};

export default ProtechedRoute;
