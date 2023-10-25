/*********************************************************************************************** */

const add_btn = document.getElementById("add-btn");
const remove_btn = document.getElementById("remove-btn");
const font_size_input = document.getElementById("font-size-input")

function getTextDiv() {
  let text_div;
  [...document.getElementsByClassName('selected-text-div')].forEach(el => {
    // Do something with each element
    if(!el.classList.contains("not-selected")){
    
      text_div = el
    }
    
})

return text_div
}
function textDivEvents() {
 
  const text_div  = getTextDiv()
 

  if(!text_div) return
  
  
  
  text_div.removeEventListener("input",textDivInputEvent)
  font_size_input.removeEventListener("input", fontSizeInputEvent)
  

  add_btn.removeEventListener("click",addBtnEvent )
  
  remove_btn.removeEventListener("click", removeBtnEvent)
 
  
  text_div.addEventListener("input",textDivInputEvent)
  font_size_input.addEventListener("input", fontSizeInputEvent)
  

add_btn.addEventListener("click",addBtnEvent )

remove_btn.addEventListener("click", removeBtnEvent)
  
  
  
}

function textDivInputEvent() {
 
    showText() 
  
}
function fontSizeInputEvent(ev) {
   const text_div  = getTextDiv()
 
  const value = parseInt(ev.target.value)
  font_size = value
  font_size_input.value = value
  text_div.style.fontSize = value + "px"
  
  showText() 
}

function addBtnEvent() {
   const text_div  = getTextDiv()
 
    font_size++;
    font_size_input.value = font_size
    text_div.style.fontSize = font_size + "px"
    showText() 
  
  
}

function removeBtnEvent() {
   const text_div  = getTextDiv()
 
  if (font_size === 11) return
  font_size--;
  font_size_input.value = font_size
  text_div.style.fontSize = font_size + "px"
  showText() 
}
const fontlist = document.getElementById("font-list")

const fonts = ['Droid Sans', 'Croissant One' , 'Fuggles' , 'Bebas Neue' , 'Pacifico' , 'Great Vibes'  , 'Yellowtail' , 'Philosopher' , 'Passion One' , 'Kaushan Script']

WebFont.load({
  google: {
    families: fonts
  }
});

for (let i = 0; i < fonts.length; i++) {
  const font = fonts[i];
  const li = document.createElement("li")

  const h3 = document.createElement("h3")
  
  h3.innerText = font,
  h3.style.fontFamily  = font;
  li.append(h3)
  fontlist.append(li)
  li.addEventListener("click" , ()=>{

    fontFamily = font;
    showText() 
  })
}


const colorInput  = document.getElementById("color-input")

colorInput.addEventListener("input" , (ev)=>{

  color = ev.target.value
  showText() 
})

const backgroundInput  = document.getElementById("background-color-input")

backgroundInput.addEventListener("input" , (ev)=>{
 
  backgroundColor = ev.target.value
  showText() 
})


textDivEvents()

if(document.getElementsByClassName("selected-text-div")[0]){
  document.getElementsByClassName("selected-text-div")[0].addEventListener("click", () => {
    [...document.getElementsByClassName("selected-text-div")].forEach(
      (el) => {
        // Do something with each element
        el.classList.add("not-selected");
      }
    );
    document.getElementsByClassName("selected-text-div")[0].classList.remove("not-selected");
    textDivEvents();
  });
}

