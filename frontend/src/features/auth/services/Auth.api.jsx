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
    console.log("RegisterApi ERR ::", error.response);
  }
};
