function print() {
  text_div.style.fontFamily = fontFamily;
  text_div.style.color = color;
  text_div.style.backgroundColor = backgroundColor;

  const clone = text_div.cloneNode(true);

  document.getElementById("trash").innerHTML = "";
  document.getElementById("trash").appendChild(clone);
  html2canvas(clone, { backgroundColor: null }).then((mynewCanvas) => {
    let x1 = dragContainer.offsetLeft * (precentageW / 100);
    let y1 = dragContainer.offsetTop * (precentageH / 100);

    console.log(mynewCanvas.width, mynewCanvas.height);
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

  // theContext.fillStyle = backgroundColor //background color text
  // theContext.fillRect(x1 , y1, width1, height1);
  // theContext.fillStyle = color // color text
  // canvasTxt.drawText(theContext, text_div.innerText, { x:x1, y:y1 , width:width1 + 10 , height:height1 +10, fontSize: font_size / scaleW, font: fontFamily, align: "center" })
}

function dragElement(elmnt, w, h, print) {
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

    console.log(elmnt.offsetTop - pos2, elmnt.offsetLeft - pos1);
    //   // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    print();
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
