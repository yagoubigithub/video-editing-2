import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";
import { API } from "../Config";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [file, setFile] = useState({});
  const [images, setImages] = useState([]);

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

  const setEmoji = (emoji) => {
    localStorage.setItem("emoji", JSON.stringify(emoji));
  };
  const addNewText = (x, y, text) => {
    const emoji = JSON.parse(localStorage.getItem("emoji"));
    if (emoji.imageUrl) {
      //add emoji

      const initData = {
        type: "emoji",
        url: emoji.imageUrl,
        width : emoji.width , 
        height : emoji.height,
        styles: {
          cursor: "move",

          left: x,
          top: y,
        },

        from: 0,
        to: 3,
        id: uuidv4(),
      };

      let textJson = {};
      if (localStorage.getItem("textJson")) {
        textJson = { ...JSON.parse(localStorage.getItem("textJson")) };
      }
      const _texts = [...texts].map((text) => {
        if (textJson[text.id]) {
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

      setEmoji({});

      return;
    } else {
      const initData = {
        type: "text",
        text,
        styles: {
          backgroundColor: "#ffffff00",

          color: "#aa0000",
          cursor: "move",
          fontFamily: "Croissant One",
          position: "absolute",
          width: "fit-content",
          zIndex: "998",
          fontSize: 45,
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
        textJson = { ...JSON.parse(localStorage.getItem("textJson")) };
      }
      const _texts = [...texts].map((text) => {
        if (textJson[text.id]) {
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
    }
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

    if (localStorage.getItem("textJson")) {
      textJson = { ...JSON.parse(localStorage.getItem("textJson")) };
    }

    const _texts = [...texts].map((text) => {
      if (textJson[text.id]) {
        return {
          ...text,
          styles: {
            ...text.styles,
            ...textJson[text.id],
          },
        };
      }

      return text;
    });

    setInsertText(false);

    setTexts([..._texts]);
  };

  const setStyle = (style) => {
    console.log(style)
    let textJson = {};
    if (localStorage.getItem("textJson")) {
      textJson = { ...JSON.parse(localStorage.getItem("textJson")) };
    }

    const _texts = [...texts].map((text) => {
      if (text.id === active) {
        if (textJson[active]) {
          const _textJson = {...textJson}
          _textJson[active] = {
            ...text.styles,
              ...textJson[text.id],
              ...style
          }
          localStorage.setItem("textJson" , JSON.stringify(
            _textJson
            ))
         
          return {
            ...text,
            styles: {
              ...text.styles,
              ...textJson[text.id],
              ...style,
            },
          };
        }
        return {
          ...text,
          styles: {
            ...text.styles,

            ...style,
          },
        };
      }

      return text;
    });

    setInsertText(false);

    setTexts([..._texts]);
  };

  const onResize = (size, id) => {
    console.log(size);

    const _texts = [...texts].map((text) => {
      if (text.id === id) {
      }
      return text;
    });
    setInsertText(false);

    setTexts([..._texts]);
  };

  const download = () => {
    const data = [];
    let count = 0;

    texts.map((text) => {
      let newCanvas = document.createElement("canvas");

      const scaleW = video.videoWidth / w;
      const scaleH = video.videoHeight / h;

      newCanvas.width = video.videoWidth;
      newCanvas.height = video.videoHeight;
      newCanvas.style.backgroundColor = "transparent";

      newCanvas.id = "newCanvas-" + text.id;
      newCanvas = new fabric.Canvas("newCanvas-" + text.id);

      let s = {
        ...text.styles,

        top: text.styles.top * scaleH,
        left: text.styles.left * scaleW,
      };

      if (text.styles.width && !isNaN(text.styles.width))
        s = { ...s, width: text.styles.width * scaleW };

      if (text.styles.height && !isNaN(text.styles.height))
        s = { ...s, height: text.styles.height * scaleH };
      if (text.styles.scaleX) s = { ...s, scaleX: text.styles.scaleX * scaleW };

      if (text.styles.scaleY) s = { ...s, scaleY: text.styles.scaleY * scaleW };

      if (text.type === "text") {
        const fabricText = new fabric.Text(text.text, s);

        newCanvas.add(fabricText);

        const dataURL = newCanvas.toDataURL({
          width: video.videoWidth,
          height: video.videoHeight,
          left: 0,
          top: 0,
          format: "png",
        });

        const textData = {
          to: text.to,
          from: text.from,
          imgBase64: dataURL,
          left: 0,
          top: 0,
          width: video.videoWidth,
          height: video.videoHeight,
        };

        data.push(textData);

        count++;
          
        if (count > texts.length - 1) {
          fetch(
            `${API}/merge`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
  
              body: JSON.stringify({
                data,
                file,
                socketSessionId : localStorage.getItem("thisSessionId")
              }),
            },
            50000
          )
            .then((response) => response.json())
            .then((result) => {
              //  download_btn.innerText = "download";
              if (result.success) {
             
  
                setTimeout(()=>{
                  const a = document.createElement("a");
                  document.body.appendChild(a);
                  a.download = "output.mp4";
                  a.href = "http://localhost:3001/download";
                  a.click();
                }, 3000)
              }
            });
        }
        

      } else {
        const imgObj = new Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.src = text.url;
        imgObj.onload = function () {
          const image = new fabric.Image(imgObj);
          image.set({
            ...s,
          });

          newCanvas.add(image);
          const dataURL = newCanvas.toDataURL({
            width: video.videoWidth,
            height: video.videoHeight,
            left: 0,
            top: 0,
            format: "png",
          });

          const textData = {
            to: text.to,
            from: text.from,
            imgBase64: dataURL,
            left: 0,
            top: 0,
            width: video.videoWidth,
            height: video.videoHeight,
          };

          data.push(textData);
          count++;
          
      if (count > texts.length - 1) {
        fetch(
          `${API}/merge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },

            body: JSON.stringify({
              data,
              file,
              socketSessionId : localStorage.getItem("thisSessionId")
            }),
          },
          50000
        )
          .then((response) => response.json())
          .then((result) => {
            //  download_btn.innerText = "download";
            if (result.success) {
           

              setTimeout(()=>{
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.download = "output.mp4";
                a.href = "http://localhost:3001/download";
                a.click();
              }, 3000)
            }
          });
      }
        };
      }

     

      // const link = document.createElement("a");
      // link.download = `image-${text.id}.png`;
      // link.href = dataURL;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    });
  };

  const deleteActiveText = () => {
    const _texts = texts.filter((text) => text.id !== active);

    setTexts([..._texts]);
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
        setStyle,
        onResize,
        download,
        deleteActiveText,

        setEmoji,
        images,
         setImages
      }}
      displayName="TextContext"
    >
      {children}
    </TextContext.Provider>
  );
};
