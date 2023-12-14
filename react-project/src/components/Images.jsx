import React, { useContext } from 'react'


import EmojiPicker from 'emoji-picker-react';



//context
import { TextContext } from "../context/TextContext"
import { API } from '../Config';
import { isAuthenticated } from '../auth';


const Images = ({type}) => {


    const { setEmoji   ,setInsertText} = useContext(TextContext)

    const {token} = isAuthenticated()
 const onEmojiClick = (emoji) =>{ 

    console.log(emoji)
    setEmoji(emoji)
    setInsertText(true)
 }

 const onImageChange = (e) => {

   const file = e.target.files[0];
   
   
   const data = new FormData() ;
   data.append('image', file);

   fetch( `${API}/users/upload` , {
      method : "POST",
      headers: {
       
         "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${token}`,
       },
      body : data
   }).then((data)=> {

   })
 }

  return (
    <div >
     {type === "emoji"  &&  <EmojiPicker onEmojiClick={onEmojiClick} />}


     {type === "image"  &&  <>
     
    
<input type="file" name="image"  onChange={onImageChange} multiple={false}/>

     </>}
  </div>
  )
}

export default Images