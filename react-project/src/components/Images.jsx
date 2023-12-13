import React, { useContext } from 'react'


import EmojiPicker from 'emoji-picker-react';



//context
import { TextContext } from "../context/TextContext"


const Images = () => {
    const { setEmoji   ,setInsertText} = useContext(TextContext)
 const onEmojiClick = (emoji) =>{ 

    console.log(emoji)
    setEmoji(emoji)
    setInsertText(true)
 }
  return (
    <div >
     <EmojiPicker onEmojiClick={onEmojiClick} />
  </div>
  )
}

export default Images