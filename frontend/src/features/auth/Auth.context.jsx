import { createContext, useState, useEffect } from "react";

//api
import { api } from "./services/Auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //states
  const [User, setUser] = useState(() => {
    const saved = localStorage.getItem("RegisterUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [Loading, setLoading] = useState(false);
  const [Token, setToken] = useState(null);

  // User Persitent
  useEffect(() => {
    if (User) {
      localStorage.setItem("RegisterUser", JSON.stringify(User));
    } else {
      localStorage.removeItem("RegisterUser");
    }
  }, [User]);

  return (
    <AuthContext.Provider
      value={{ User, setUser, Loading, setLoading, Token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
