import React, { useContext } from 'react'


import EmojiPicker from 'emoji-picker-react';



//context
import { TextContext } from "../context/TextContext"
import { API } from '../Config';
import { isAuthenticated } from '../auth';


const Images = ({type}) => {


    const { setEmoji   ,setInsertText} = useContext(TextContext)

    const [progress, setProgress] = React.useState(0);

    const {token , user} = isAuthenticated()
 const onEmojiClick = (emoji) =>{ 

    console.log(emoji)
    setEmoji(emoji)
    setInsertText(true)
 }

 const onImageChange = (e) => {

   const file = e.target.files[0];
   
   
   const formData = new FormData() ;
   formData.append('image', file);
   


        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", ProgressHandler, false);
        xhr.addEventListener("load", SuccessHandler, false);
        xhr.addEventListener("error", ErrorHandler, false);
        xhr.addEventListener("abort", AbortHandler, false);
        xhr.open("POST", process.env.REACT_APP_BASE_URL + "/users/upload/" + user._id);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);

        xhr.send(formData);
 }


 const ProgressHandler = (e) => {

   setProgress((e.loaded / e.total) * 100)
};

const SuccessHandler = (e) => {
   //loaded
 //  const file = JSON.parse(e.target.responseText).vid;
  // setFile(file)
   setProgress(0)
};
const ErrorHandler = () => {
   alert("upload failed!!");
};
const AbortHandler = () => {
   alert("upload aborted!!")

};

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