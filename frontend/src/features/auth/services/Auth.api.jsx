import axios from "axios";

export const RegisterApi = async ({ username, email, password }) => {
  const Server = import.meta.env.VITE_SERVER_URL;
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
