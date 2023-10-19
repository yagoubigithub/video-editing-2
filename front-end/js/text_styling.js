/*********************************************************************************************** */

const add_btn = document.getElementById("add-btn");
const remove_btn = document.getElementById("remove-btn");
const font_size_input = document.getElementById("font-size-input")

text_div.addEventListener("click" , ()=>{
  //placeCaretAtEnd( text_div );
})


font_size_input.addEventListener("input", (ev) => {
  const value = parseInt(ev.target.value)
  font_size = value
  font_size_input.value = value
  text_div.style.fontSize = value + "px"
  print()
})

add_btn.addEventListener("click", (ev) => {
  font_size++;
  font_size_input.value = font_size
  text_div.style.fontSize = font_size + "px"
  print()

})

remove_btn.addEventListener("click", (ev) => {
  if (font_size === 11) return
  font_size--;
  font_size_input.value = font_size
  text_div.style.fontSize = font_size + "px"
  print()

})

text_div.addEventListener("input", (ev) => {
  print()
})




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
    print()
  })
}


const colorInput  = document.getElementById("color-input")

colorInput.addEventListener("input" , (ev)=>{

  color = ev.target.value
  print()
})

const backgroundInput  = document.getElementById("background-color-input")

backgroundInput.addEventListener("input" , (ev)=>{
 
  backgroundColor = ev.target.value
  print()
})



