import { createContext, useState } from "react";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});

  return (
    <TextContext.Provider value={{ file, setFile }} displayName="TextContext">
      {children}
    </TextContext.Provider>
  );
};
