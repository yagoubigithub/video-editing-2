import React, { useContext, useEffect, useRef, useState } from 'react'

import moment from 'moment';

//icons
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

//context
import { TextContext } from "../context/TextContext"
import { IconButton } from '@mui/material';


let fired = 0;

const Video = () => {

   
    const { file , context , w ,  h  ,  setH, setW ,   setContext , video , setVideo } = useContext(TextContext)

    const videoContainer = useRef()

    const [isPlaying , setIsPlaying]= useState(false)
    const [currentTime , setCurrentTime]= useState(0)
    const [duration , setDuration] = useState(0)

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

            setContext(context)

           let  w = document.body.getBoundingClientRect().width - 200;
           let  h = document.body.getBoundingClientRect().height - 200;
           setW(w)
           setH(h)
           canvas.width = w;
           canvas.height = h;
           setVideo(video)
            video.addEventListener("canplay", () => videoCanPlay(video, canvas, context , w ,h));


        }

        effect()
    }, [file])

    const videoCanPlay = (video, canvas, context , w , h) => {
      
       
        fired++;

        setDuration(video.duration)
      
        if(fired < 4){
            video.currentTime = 1;
            video.currentTime = 0;
            context.drawImage(video, 0, 0, w, h);
            videoContainer.current.append(canvas);


        }
    }
    const play = ( ) => {
      
        if(isPlaying){
            //puase
            video.pause()
            setIsPlaying(false)
        }else{
            //play
            video.play()
            setIsPlaying(true)
        }
     
        video.addEventListener('play', function() {
            var $this = this; //cache
            (function loop() {
              if (!$this.paused && !$this.ended) {
               
                context.drawImage(video, 0, 0, w, h);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
              }
            })();
          }, 0);
        
          video.addEventListener('timeupdate', function() {
          
            document.getElementById("rang-progress").style.width = ((w / duration) * video.currentTime)  +  "px"
            setCurrentTime(video.currentTime)
          });
    
    }
    return (
        <>


            {file.filename && <div id='video-container' ref={videoContainer}>
                
                
                <div id='rang-container'>
                    <div id="rang">
                        <div id='rang-progress'></div>
                    </div>

                    <IconButton style={{color : "white"}} onClick={play}>
                      
                        {isPlaying ? <PauseIcon />:   <PlayIcon></PlayIcon> }

                    </IconButton>

                   <b>{moment.utc(currentTime * 1000).format("HH:mm:ss")} / {moment.utc(duration * 1000).format("HH:mm:ss")}</b>
                </div>
                </div>}

           
        </>
    )
}

export default Video

