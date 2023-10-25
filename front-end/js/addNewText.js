//new-text-btn

const initStyle = {
  "position": "absolute",
   
    
   
    "background-color": "transparent",
    "border": "3px dashed white",
    "width": "fit-content",
    "z-index": "998",
    "cursor": "move",
}

const NewTextBtn = document.getElementById("new-text-btn");
let insertText = false;
NewTextBtn.addEventListener("click", () => {
  insertText = true;
});

function clickCanvas(canvas, context, x, y) {
  if (insertText) {
    addNewText(x,y , "New Text")
  }
}


function addNewText(x, y , text) {
  
  const input = document.createElement("div");

  input.setAttribute("contenteditable", "true");

  input.innerText = text;

  
  [...document.getElementsByClassName("selected-text-div")].forEach((el) => {
    // Do something with each element
    el.classList.add("not-selected");
  });

  input.addEventListener("click", () => {
    //select
    if(!input.classList.contains("not-selected")) return
    [...document.getElementsByClassName("selected-text-div")].forEach(
      (el) => {
        // Do something with each element
        el.classList.add("not-selected");
      }
    );
   
   

    

    input.classList.remove("not-selected");
    textDivEvents();
  });

  input.className = "selected-text-div";
  input.style.position = "absolute";
  input.style.zIndex = 100;
  input.style.cursor = "text";
  input.style.boxSizing = "border-box";
  input.style.width = "fit-content";
  input.style.outline = "none";
  input.style.textAlign = "center";
  input.style.whiteSpace = "nowrap";
  input.style.fontSize = "35px";
  input.style.padding = "10px";
  input.style.color = "white";
  input.style.display = "inline-block";
  input.style.wordBreak = "keep-all";

  input.style.left = x + "px";
  input.style.top = y + "px";



    const myDrag = document.createElement("div");
    const uid = uuid(8)
  
    myDrag.id = uid
    input.id = "input-"+uid;
    let myDragStyle = ""
    Object.keys(initStyle).map(key=>{
  
      myDragStyle += key + ": " + initStyle[key] + ";"
    })
  
    myDrag.setAttribute("style" , myDragStyle)
  
    dragElement(myDrag, w, h, print);

    myDrag.append(input);
    videoContainer.appendChild(myDrag);

    myDrag.style.left = input.offsetLeft + "px";
    myDrag.style.top = input.offsetTop + "px";
    input.style.top = "0px";
    input.style.left = "0px";
    input.style.position = "static";
    input.classList.remove("not-selected");
   
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(input);
    range.collapse(false);
    selection.addRange(range);
    input.focus();

   



 

  window.setTimeout(function () {
    input.focus();
  }, 33);

  input.addEventListener("blur", () => {
    const txtCanvas = document.createElement("canvas");
    txtCanvas.style.pointerEvents = "none";
    const textContext = txtCanvas.getContext("2d");
    txtCanvas.width = w;
    txtCanvas.height = h;
    insertText = false;
    document.body.style.cursor = "default";
    const textToWrite = input.innerText;

    textContext.fillStyle = "#ff0000"; //red color text
    //  canvasTxt.drawText(textContext, textToWrite, { x, y, width: input.offsetWidth + 10, height: input.offsetHeight + 10, fontSize: 25, font: "Calibri", align: "left" })

    theContext.fillStyle = "#ff0000"; //red color text
    //  canvasTxt.drawText(theContext, textToWrite, { x: x / scaleW, y: y / scaleH, width: (input.offsetWidth + 10) / scaleW, height: (input.offsetHeight + 10) / scaleH, fontSize: 25 / scaleW, font: "Calibri", align: "left" })

    // videoContainer.removeChild(input)
    // videoContainer.append(txtCanvas)
  }); 

  const data = {
    id :uid,
    input,
    myDrag,
    styles : {...initStyle}
      
  }

  texts.push(data)
}