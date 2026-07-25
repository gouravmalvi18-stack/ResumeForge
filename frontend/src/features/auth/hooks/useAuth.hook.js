import { useContext } from "react";

//package
import toast from "react-hot-toast";
//Context
import { AuthContext } from "../Auth.context";
//Auth API
import {
  RegisterApi,
  EmailVerificationApi,
  ResendOtpApi,
} from "../services/Auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { User, setUser, Loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const NewUser = await RegisterApi({ username, email, password });
      setUser({ username: NewUser.username, email: NewUser.email });

      return NewUser;
    } catch (error) {
      toast.error(error.message);
      console.log("handleRegister ERR ::", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailVerification = async ({ otp, email }) => {
    setLoading(true);
    try {
      const VerifiedUser = await EmailVerificationApi({ otp, email });
      // console.log(VerifiedUser);

      // return VerifiedUser;
    } catch (error) {
      toast.error(error.message);
      console.log("handleRegister ERR ::", error);
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async ({ email }) => {
    try {
      const res = await ResendOtpApi({ email });

      toast.success(res.data.message, { duration: 5000 });
    } catch (error) {
      toast.error(error.message);
      console.log("handleResendOtp ERR ::", error);
    }
  };

  return {
    User,
    Loading,
    handleRegister,
    handleEmailVerification,
    handleResendOtp,
  };
};
