import { api } from "./Api.intances";

// Handle APi Err
const handleApiError = (error) => {
  throw {
    message: error.response?.data?.message || "Something went wrong at Server",
    status: error.response?.status || 500,
  };
};

export const RegisterApi = async ({ username, email, password }) => {
  try {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data?.NewUser;
  } catch (error) {
    handleApiError(error);
  }
};

export const EmailVerificationApi = async ({ otp, email }) => {
  try {
    const res = await api.patch("/auth/verify-email", { otp, email });
    return res.data?.VerifiedUser;
  } catch (error) {
    handleApiError(error);
  }
};

export const ResendOtpApi = async ({ email }) => {
  try {
    const res = await api.post("/auth/resendOtp", { email });
    return res;
  } catch (error) {
    handleApiError(error);
  }
};

export const LoginApi = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res;
  } catch (error) {
    handleApiError(error);
  }
};

