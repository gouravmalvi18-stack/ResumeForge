import axios from "axios";

const Server = import.meta.env.VITE_SERVER_URL;

export const RegisterApi = async ({ username, email, password }) => {
  try {
    const res = await axios.post(
      `${Server}/auth/register`,
      { username, email, password },
      { withCredentials: true },
    );
    return res.data.NewUser;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message || "Something went wrong at Server",
      status: error.response?.status || 500,
    };
  }
};
export const EmailVerificationApi = async ({ otp, email }) => {
  try {
    const res = await axios.post(
      `${Server}/auth/verify-email`,
      { otp, email },
      { withCredentials: true },
    );
    return res.data.VerifiedUser;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message || "Something went wrong at Server",
      status: error.response?.status || 500,
    };
  }
};
export const ResendOtpApi = async ({ email }) => {
  try {
    const res = await axios.post(
      `${Server}/auth/resendOtp`,
      { email },
      { withCredentials: true },
    );
    return res;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message || "Something went wrong at Server",
      status: error.response?.status || 500,
    };
  }
};
