import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});

  const [context, setContext] = useState({});
  const [video, setVideo] = useState({});
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [texts , setTexts] = useState([])


  const setInsertText = (insertText) =>{

    localStorage.setItem("insertText" , JSON.stringify(insertText))
  }

  const getInsertText = () =>{
    return JSON.parse(localStorage.getItem("insertText" ))
  }
  

  const addNewText = (x , y , text) =>{

  

    const initData = {
      text,
      styles : {
        'background-color' : "#ffffff00",
        'border' : "3px dashed white",
        'color' :  "#aa0000",
        'cursor' :  "move",
         'font-family':  "Croissant One",
        'position':  "absolute",
        'width':   "fit-content",
        'z-index' :  "998",
        'font-size' : '10',
        'left'  : x + "px",
        'top' : y + "px",
        'outline' :"none",
        'text-align' : "center",
        'white-space' : "nowrap",
        'display' : "inline-block",
        'word-break' : "keep-all"

      },
    
      from : 0,
      to : 3,
      id  : uuidv4()
    }


    setTexts([...texts , initData])

   
  }

  return (
    <TextContext.Provider value={{ file, setFile  , context , setContext , w , setW, h , setH , video , setVideo , getInsertText, setInsertText , addNewText , texts , setTexts}} displayName="TextContext">
      {children}
    </TextContext.Provider>
  );
};
