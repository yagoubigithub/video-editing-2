import React, { useContext, useEffect, useRef, useState } from 'react'

//icons
import PlayIcon from '@mui/icons-material/PlayArrow';

//context
import { TextContext } from "../context/TextContext"
import { IconButton } from '@mui/material';


let fired = 0;

const Video = () => {

   
    const { file } = useContext(TextContext)

    const videoContainer = useRef()

    useEffect(() => {

        async function effect() {

            if (!file.filename) {
                //stop loading

                return;
            };

            console.log(document.getElementById("video"))
            if(document.getElementById("video")){
                document.removeChild(document.getElementById("video"))
            }

            let videoUrl = `${process.env.REACT_APP_BASE_URL}/api/videos/uploads/${file.filename}/${file.type.split("/")[1]
                }`;


            let videoBlob = await fetch(videoUrl).then((r) => r.blob());
            let videoObjectUrl = URL.createObjectURL(videoBlob);
            let video = document.createElement("video");
            video.src = videoObjectUrl;

            video.id = "video"
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");


           let  w = document.body.getBoundingClientRect().width - 200;
           let  h = document.body.getBoundingClientRect().height - 200;
           canvas.width = w;
           canvas.height = h;
            video.addEventListener("canplay", () => videoCanPlay(video, canvas, context , w ,h));


        }

        effect()
    }, [file])

    const videoCanPlay = (video, canvas, context , w , h) => {
      
       
        fired++;
      
        if(fired < 4){
            video.currentTime = 1;
            video.currentTime = 0;
            context.drawImage(video, 0, 0, w, h);
            videoContainer.current.append(canvas);


        }
    }
    return (
        <>
        

            {file.filename && <div id='video-container' ref={videoContainer}>
                
                
                <div id='rang-container'>
                    <div id="rang"></div>

                    <IconButton style={{color : "white"}}>
                        <PlayIcon></PlayIcon>

                    </IconButton>

                   <b>0:01 / 12:03</b>
                </div>
                </div>}

           
        </>
    )
}

export default Video

