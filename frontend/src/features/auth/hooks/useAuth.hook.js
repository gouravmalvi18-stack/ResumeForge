import { useContext } from "react";

//package
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

//Context
import { AuthContext } from "../Auth.context";

//Auth API
import {
  RegisterApi,
  EmailVerificationApi,
  ResendOtpApi,
  LoginApi,
  fetchAllReportApi,
} from "../services/Auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { User, setUser, Loading, setLoading, TokenUpdater } = context;

  const navigate = useNavigate();

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const NewUser = await RegisterApi({ username, email, password });
      setUser(NewUser);
      if (NewUser) navigate("/verify-email");
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

      if (VerifiedUser.isVerified == true) navigate("/login");
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

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await LoginApi({ email, password });
      TokenUpdater(res.data?.accessToken);
      setUser(res.data?.AuthUser);
      if (res.status == 200) navigate("/createReport");
    } catch (error) {
      TokenUpdater(null);
      setUser(null);
      toast.error(error.message, { duration: 8000 });
      console.log("handleLogin ERR ::", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    User,
    Loading,
    handleRegister,
    handleEmailVerification,
    handleResendOtp,
    handleLogin,
  };
};
