//new-text-btn

const NewTextBtn = document.getElementById("new-text-btn");
let insertText = false;
NewTextBtn.addEventListener("click", () => {
  insertText = true;
});



function clickCanvas(canvas, context, x, y) {
  if (insertText) {
    const input = document.createElement("div");

    input.setAttribute("contenteditable", "true");

    [...document.getElementsByClassName("selected-text-div")].forEach((el) => {
      // Do something with each element
      el.classList.add("not-selected");
    });

    input.addEventListener("click", () => {
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

    videoContainer.appendChild(input);

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
  }
}
