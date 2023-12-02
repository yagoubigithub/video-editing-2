import { createContext, useState } from "react";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});

  const [context, setContext] = useState({});
  const [video, setVideo] = useState({});
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  return (
    <TextContext.Provider value={{ file, setFile  , context , setContext , w , setW, h , setH , video , setVideo}} displayName="TextContext">
      {children}
    </TextContext.Provider>
  );
};
