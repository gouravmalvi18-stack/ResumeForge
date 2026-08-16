import axios from "axios";

const Server = import.meta.env.VITE_SERVER_URL;

export const api = axios.create({
  baseURL: `${Server}`,
  withCredentials: true,
});
export const refreshtokenapi = axios.create({
  baseURL: `${Server}/auth/refreshtoken`,
  withCredentials: true,
});

//  access token variable to store the current access token
let accessToken = null;

/**
 * @name : setaccessToken
 * @description: Function to set the access token
 */
export const setaccessToken = (newToken) => {
  accessToken = newToken;
};

// -------------------------
// Request Interceptor
// -------------------------
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

// -------------------------
// Response Interceptor
// -------------------------
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "User is Unauthorized" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshtokenapi.post();

        const newAccessToken = res.data?.accessToken;

        setaccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshTokenError) {
        setaccessToken(null);

        throw refreshTokenError;
      }
    }

    throw error;
  },
);
