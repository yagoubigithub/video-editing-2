const templatesModel = myModel(
  "templates-model",
  "templates-btn",
  "close-templates-modal",
  () => {
    const templates = JSON.parse(localStorage.getItem("templates"));

    const templateNameContainer = document.getElementById(
      "template-name-container"
    );
    const templateTextNumContainer = document.getElementById(
      "template-text-num-container"
    );
    const templateActionContainer = document.getElementById(
      "template-action-container"
    );
    templates.map((template) => {
      templateNameContainer.innerHTML += "<div>" + template.name + "</div>";
      templateTextNumContainer.innerHTML +=
        "<div>" + template.texts.length + "</div>";
      templateActionContainer.innerHTML += `<div>
            
            <button onclick="selectTemplate(${template.id})">Select</button>
            </div>`;
    });
  }
);

function selectTemplate(id) {
  const template = templates.filter((t) => t.id === id)[0];

  let childDivs = videoContainer.getElementsByTagName("div");

  for (i = 0; i < childDivs.length; i++) {
    let childDiv = childDivs[i];
    if (!isNaN(childDiv.id) || childDiv.id.indexOf("input-") > -1) {
      childDiv.remove();
    } else {
      console.log(childDiv.id);
    }
  }

  texts = template.texts.map((text) => {
    const myDrag = document.createElement("div");
    let drag_styles = JSON.stringify(text.drag_styles)
      .replaceAll(",", ";")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "");

    drag_styles += ";background-color:" + text.drag_styles["background-color"];

    drag_styles += ";color:" + text.drag_styles["color"];
    myDrag.setAttribute("style", drag_styles);
    myDrag.id = text.id;
    videoContainer.append(myDrag);

    const input = document.createElement("div");
    input.setAttribute("contenteditable", "true");

    input.innerText = text.innerText;

    input.id = "input-" + text.id;
    input.classList.add("selected-text-div", "not-selected") 

    input.addEventListener("click", () => {
        //select
        if(!input.classList.contains("not-selected")) return
        [...document.getElementsByClassName("selected-text-div")].forEach(
          (el) => {
            // Do something with each element
            el.classList.add("not-selected");
          }
        );
       
       
    
        font_size = window.getComputedStyle(input).fontSize;
        fontFamily = window.getComputedStyle(input).fontFamily;
        color = window.getComputedStyle(input).color;
        backgroundColor = window.getComputedStyle(input).backgroundColor;
       
        
    
        input.classList.remove("not-selected");
        textDivEvents();
      });
    let input_styles = JSON.stringify(text.input_styles)
      .replaceAll(",", ";")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "");

    input_styles +=
      ";background-color:" + text.input_styles["background-color"];

    input_styles += ";color:" + text.input_styles["color"];
    input.setAttribute("style", input_styles);
    dragElement(myDrag, w, h, print);
    myDrag.append(input);

    const data = {
      ...text,
      myDrag,
      input,
      drag_styles,
      input_styles,
     
    }
    return data
  });
}
