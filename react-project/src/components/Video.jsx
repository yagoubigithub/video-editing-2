import React, { useContext, useEffect, useRef, useState } from 'react'


//context
import { TextContext } from "../context/TextContext"

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

            {file.filename && <div id='video' ref={videoContainer}></div>}

           
        </>
    )
}

export default Video

