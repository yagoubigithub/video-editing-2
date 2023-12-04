import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});

  const [context, setContext] = useState({});
  const [video, setVideo] = useState({});
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [texts, setTexts] = useState([]);



  const [active, setActive] = useState("");

  const setInsertText = (insertText) => {
    setTimeout(() => {
      const elemts = document.getElementsByClassName("tempCanvas");

      [...elemts].forEach((el) => {
        if (
          !el.classList.contains("upper-canvas") &&
          !el.classList.contains("lower-canvas")
        ) {
          if (insertText) {
            el.style.zIndex = 999;
          } else {
            el.style.zIndex = -999;
          }
        }
      });
    }, 200);

    localStorage.setItem("insertText", JSON.stringify(insertText));
  };

  const getInsertText = () => {
    return JSON.parse(localStorage.getItem("insertText"));
  };

  const addNewText = (x, y, text) => {
    const initData = {
      text,
      styles: {
        backgroundColor: "#ffffff00",

        color: "#aa0000",
        cursor: "move",
        fontFamily: "Croissant One",
        position: "absolute",
        width: "fit-content",
        zIndex: "998",
        fontSize: 35,
        left: x,
        top: y,
        outline: "none",
        textAlign: "center",
        whiteSpace: "nowrap",
        display: "inline-block",
        wordBreak: "keep-all",
      },

      from: 0,
      to: 3,
      id: uuidv4(),
    };


    let textJson = {};
    if (localStorage.getItem("textJson")) {

      textJson = {...JSON.parse(localStorage.getItem("textJson"))};
      
    }
    const _texts = [...texts].map((text) => {
      if (textJson[text.id]) {
        console.log( {
          ...text,
          styles: {
            ...textJson[text.id],
          },
        })
        return {
          ...text,
          styles: {
            ...textJson[text.id],
          },
        };
      }

      return text;
    });

    setTexts([..._texts, initData]);
  };

  const setFabrixTextJSON = (fabricTextJson, id) => {
    let textJson = {};
    if (localStorage.getItem("textJson")) {
      textJson = {
        ...JSON.parse(localStorage.getItem("textJson")),
        [id]: {
          ...fabricTextJson,
        },
       
      };

      localStorage.setItem("textJson", JSON.stringify(textJson));
    } else {
      localStorage.setItem(
        "textJson",
        JSON.stringify({
          [id]: {
            ...fabricTextJson,
          },
        })
      );
    }
  };

  return (
    <TextContext.Provider
      value={{
        file,
        setFile,
        context,
        setContext,
        w,
        setW,
        h,
        setH,
        video,
        setVideo,
        getInsertText,
        setInsertText,
        addNewText,
        texts,
        setTexts,
        active,
        setActive,
        setFabrixTextJSON,
      }}
      displayName="TextContext"
    >
      {children}
    </TextContext.Provider>
  );
};
