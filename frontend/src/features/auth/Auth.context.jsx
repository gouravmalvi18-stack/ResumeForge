import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //states
  const [User, setUser] = useState(() => {
    const saved = localStorage.getItem("RegisterUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [Loading, setLoading] = useState(false);

  // User Persitent
  useEffect(() => {
    if (User) {
      localStorage.setItem("RegisterUser", JSON.stringify(User));
    } else {
      localStorage.removeItem("RegisterUser");
    }
  }, [User]);

  return (
    <AuthContext.Provider value={{ User, setUser, Loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
