import { createContext, useState } from "react";

export const AiContext = createContext();

export const AiProvider = ({ children }) => {
  const [Ailoading, setAiloading] = useState(false);
  const [Report, setReport] = useState(null);
  const [AllReport, setAllReport] = useState([]);
  return (
    <AiContext.Provider
      value={{
        Ailoading,
        setAiloading,
        Report,
        setReport,
        AllReport,
        setAllReport,
      }}
    >
      {children}
    </AiContext.Provider>
  );
};
