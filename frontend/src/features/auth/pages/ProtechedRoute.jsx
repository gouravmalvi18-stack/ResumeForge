import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { useNavigate } from "react-router";
import AuthLoader from "../components/AuthLoader";

const ProtechedRoute = ({ children }) => {
  const { User, AuthInitializing } = useContext(AuthContext);
  const navigate = useNavigate();

  if (AuthInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <AuthLoader text={"Wait a Moment ..."} />
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
