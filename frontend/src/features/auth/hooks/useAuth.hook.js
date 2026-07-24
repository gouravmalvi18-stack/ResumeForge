import { useContext } from "react";



//Context
import { AuthContext } from "../Auth.context";
//Auth API
import { RegisterApi } from "../services/Auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { User, setUser, Loading, setLoading } = context;


  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const NewUser = await RegisterApi({ username, email, password });
      setUser(NewUser);
      return NewUser;
    } catch (error) {
      console.log("handleRegister ERR ::", error.response);
    } finally {
      setLoading(false);
    }
  };

  return { User, Loading, handleRegister };
};
