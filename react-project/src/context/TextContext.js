import { createContext, useState } from "react";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});

  const [context, setContext] = useState({});
  const [video, setVideo] = useState({});
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);


  const [insertText, setInsertText] = useState(false);
  const addNewText = (x , y , text) =>{

    console.log(x , y , text)
  }

  return (
    <TextContext.Provider value={{ file, setFile  , context , setContext , w , setW, h , setH , video , setVideo , insertText, setInsertText , addNewText}} displayName="TextContext">
      {children}
    </TextContext.Provider>
  );
};
