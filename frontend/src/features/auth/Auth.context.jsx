import { createContext, useEffect, useState } from "react";

//axios api instance
import { api, setaccessToken } from "./services/Api.intances.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //states
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [AuthInitializing, setAuthInitializing] = useState(true);

  // -------------------------
  // Token updater
  // -------------------------
  const TokenUpdater = (newToken) => {
    setaccessToken(newToken);
  };

  // -------------------------
  // Initial Auth Check
  // -------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await api.get("/auth/getme");

        setUser(res.data?.AuthUser);
      } catch (error) {
        setUser(null);
        TokenUpdater(null);
      } finally {
        setAuthInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        User,
        setUser,
        Loading,
        setLoading,
        AuthInitializing,
        setAuthInitializing,
        TokenUpdater,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
