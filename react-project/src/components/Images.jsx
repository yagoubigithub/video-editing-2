import React, { useContext, useEffect } from 'react'


import EmojiPicker from 'emoji-picker-react';


//mui
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


//context
import { TextContext } from "../context/TextContext"

import { isAuthenticated } from '../auth';


const Images = ({type}) => {


    const { setEmoji   ,setInsertText , setImages , images} = useContext(TextContext)

    const [progress, setProgress] = React.useState(0);

    const {token , user} = isAuthenticated()
 const onEmojiClick = (emoji) =>{ 

    
    setEmoji({...emoji , width : 64, height : 64})
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
   const file = JSON.parse(e.target.responseText).img;
   setImages([...images , file]);
   setProgress(0)
};
const ErrorHandler = () => {
   alert("upload failed!!");
};
const AbortHandler = () => {
   alert("upload aborted!!")

};

useEffect(()=>{

   if(type === "image"){
      fetch(`${process.env.REACT_APP_BASE_URL}/users/images/${user._id}`, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             Authorization: `Bearer ${token}`,

             
         },
     })
         .then((response) => response.json())
         .then((result) => {
           
            const  {images} = result;
             setImages(images)
             console.log(images)
             
         })
   }
}, [])



const handleClickImage = (image) => {
   setEmoji({
      ...image,
      imageUrl : `${process.env.REACT_APP_BASE_URL}/videos/uploads/${image.filename}/${image.type.split("/")[1]}`,
      width : 140,
      height : 140
   })
   setInsertText(true)
}
  return (
    <div >
     {type === "emoji"  &&  <EmojiPicker onEmojiClick={onEmojiClick} />}


     {type === "image"  &&  <>
     
     <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((image) => (
        <ImageListItem key={image.filename} sx={{
         border : "1px solid rgba(0,0,0,0.2)",
         cursor : "pointer"
        }}
        onClick={()=>handleClickImage(image)}
        >
          <img
            srcSet={`${process.env.REACT_APP_BASE_URL}/videos/uploads/${image.filename}/${image.type.split("/")[1]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${process.env.REACT_APP_BASE_URL}/videos/uploads/${image.filename}/${image.type.split("/")[1]}?w=164&h=164&fit=crop&auto=format`}
            alt={image.title}
            loading="lazy"
            
          />
        </ImageListItem>
      ))}
    </ImageList>

<input type="file" name="image"  onChange={onImageChange} multiple={false}/>

     </>}
  </div>
  )
}

export default Images