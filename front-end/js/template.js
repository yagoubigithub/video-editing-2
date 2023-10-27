const saveAsTemplateBtn = document.getElementById("save-as-template-btn");

const templateModel  = myModel(
  "save-template-model",
  "save-as-template-btn",
  "close-save-template-modal",
  () => {}
);

const form = document.getElementById("save-template-form");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const value = document.getElementById("save-template-input-name").value
  if (templates.filter(template=>value === template.name).length > 0) {
    //form-tmplate-error
    document.getElementById("form-tmplate-error").innerText = "This name alredy exist"
    return;
  }
  const template_id = uuid()
  templates.push({
    id :template_id,
    name: value,
    texts: texts.map((text) => {
      let input_styles = { };
      let drag_styles = {...text.styles}

      text.input
        .getAttribute("style")
        .split(";")
        .map((style) => {
          const [key, value] = style.trim().split(":");
          input_styles = {
            ...input_styles,
            [key]: value,
          };
        });


        text.myDrag
        .getAttribute("style")
        .split(";")
        .map((style) => {
          const [key, value] = style.trim().split(":");
          drag_styles = {
            ...drag_styles,
            [key]: value,
          };
        });
      const data = {
        ...text,
        innerText: text.input.innerText,
        input_styles,
        drag_styles
      };

      return data;
    }),
  });

  localStorage.setItem("templates" , JSON.stringify(templates))
  form.reset()

  templateModel.style.display = "none"
});
