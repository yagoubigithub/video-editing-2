function print() {
  const text_div = document.getElementsByClassName("selected-text-div")[0]
  text_div.style.fontFamily = fontFamily;
  text_div.style.color = color;
  text_div.style.backgroundColor = backgroundColor;

  const clone = text_div.cloneNode(true);

  document.getElementById("trash").innerHTML = "";
  document.getElementById("trash").appendChild(clone);
  html2canvas(clone, { backgroundColor: null }).then((mynewCanvas) => {
    let x1 = dragContainer.offsetLeft * (precentageW / 100);
    let y1 = dragContainer.offsetTop * (precentageH / 100);

    
    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    theContext.drawImage(
      mynewCanvas,
      0,
      0,
      mynewCanvas.width,
      mynewCanvas.height,
      x1,
      y1,
      (dragContainer.offsetWidth - 5) * (precentageW / 100),
      (dragContainer.offsetHeight - 5) * (precentageH / 100)
    );
    //document.getElementById("trash").removeChild(clone)
  });

 
}

function dragElement(elmnt, w, h, print) {
  if(!elmnt) return
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.target !== e.currentTarget) return;
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    //  if(e.target !== e.currentTarget) return;
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;

    if (
      elmnt.offsetTop - pos2 < 0 ||
      elmnt.offsetLeft - pos1 < 0 ||
      elmnt.offsetTop - pos2 > h - elmnt.offsetHeight ||
      elmnt.offsetLeft - pos1 > w - elmnt.offsetWidth
    )
      return false;

    pos3 = e.clientX;
    pos4 = e.clientY;

   
    //   // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
 //   showText() 
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function showText() {
  const text_div  = getTextDiv()
  if(!text_div) return
 
  const uid = text_div.id.split("-")[1];
 
  texts =  texts.map(text=>{
    if(text.id == uid){

      return {
        ...text,
        styles :{
         ... text.styles,
         "font-family":fontFamily,
         "color":color,
         "background-color":backgroundColor


        }
      }

    }
    return text
  })

  text_div.style.fontFamily = fontFamily;
  text_div.style.color = color;
  text_div.style.backgroundColor = backgroundColor;
}