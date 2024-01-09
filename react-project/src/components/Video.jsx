import React, { useContext, useEffect, useRef, useState } from 'react'

import moment from 'moment';
import { fabric } from "fabric";

import FileDownloadIcon from '@mui/icons-material/FileDownload';


//icons
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

//context
import { TextContext } from "../context/TextContext"
import { IconButton } from '@mui/material';


let fired = 0,
    minwidth = 100;

const Video = () => {


    const { file, context, w, h, setH, setW, setContext, video, setVideo, setInsertText, getInsertText, addNewText,
        texts, setTexts, setActive, setFabrixTextJSON, download, active } = useContext(TextContext)

    const videoContainer = useRef()

    const [isPlaying, setIsPlaying] = useState(false)

    const [one_second, setOneSecond] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {

        console.log(file)
        async function effect() {


            if (!file.filename) {
                //stop loading

                return;
            };

            fired = 0;

            if (document.getElementById("video")) {
                document.removeChild(document.getElementById("video"))
            }
            if (document.getElementById("canvas-container")) {
                videoContainer.current.removeChild(document.getElementById("canvas-container"))
            }

            if (document.getElementById("canvas")) {
                videoContainer.current.removeChild(document.getElementById("canvas"))
            }
            if (document.getElementById("tempCanvas")) {

                try {
                    videoContainer.current.removeChild(document.getElementById("tempCanvas"))
                } catch (error) {
                    console.log(error)
                }

            }

            let videoUrl = `${process.env.REACT_APP_BASE_URL}/videos/uploads/${file.filename}/${file.type.split("/")[1]
                }`;


            let videoBlob = await fetch(videoUrl).then((r) => r.blob());
            let videoObjectUrl = URL.createObjectURL(videoBlob);
            let video = document.createElement("video");
            video.src = videoObjectUrl;

            video.id = "video"
            let canvas = document.createElement("canvas");
            let tempCanvas = document.createElement("canvas");
            let context = canvas.getContext("2d");

            setContext(context)

            let w = document.body.getBoundingClientRect().width - 250;
            let h = document.body.getBoundingClientRect().height - 200;
            setW(w)
            setH(h)
            canvas.width = w;
            canvas.height = h;
            canvas.id = "canvas"
            tempCanvas.width = w;
            tempCanvas.height = h;
            videoContainer.current.style.width = w + "px"
            videoContainer.current.style.height = h + "px"
            tempCanvas.id = "tempCanvas"
            tempCanvas.className = "tempCanvas";





            setVideo(video)
            video.currentTime = 1;
            video.addEventListener("loadeddata", () => videoCanPlay(video, canvas, context, w, h, tempCanvas));

            tempCanvas.addEventListener("click", (event) => {
                const insertText = getInsertText()
                if (insertText) {




                    addNewText(event.offsetX, event.offsetY, "New Text");
                    setInsertText(false)

                }
            })

        }

        effect()
    }, [file])


    useEffect(() => {
        if (document.getElementsByClassName("canvas-container")[0])
            videoContainer.current.removeChild(document.getElementsByClassName("canvas-container")[0])

        if (document.getElementById("tempCanvas")) {
            document.getElementById("tempCanvas").style.zIndex = 999;
        }
        if (!videoContainer.current) return;
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = w;
        tempCanvas.height = h;
        tempCanvas.id = "tempCanvas";
        tempCanvas.className = "tempCanvas"

        tempCanvas.addEventListener("click", (event) => {
            const insertText = getInsertText()
            if (insertText) {




                addNewText(event.offsetX, event.offsetY, "New Text");
                setInsertText(false)

            }
        })
        videoContainer.current.append(tempCanvas)
        window.tempCanvas = new fabric.Canvas('tempCanvas');
        texts.map(text => {




            let s = { ...text.styles }


            if (text.type === "emoji") {

                //if emoji

              
                fabric.Image.fromURL(text.url, function (fabricImage) {
                    //i create an extra var for to change some image properties
                    var img1 = fabricImage.set({ ...text.styles, width: text.width, height: text.height });

                    fabricImage.on('mousedown', function (e) {
                        // e.target should be the circle
                        setActive(text.id);
    
    
                    });
    
    
                    fabricImage.on("changed", (e) => {
                        const fabricTextJson = fabricImage.toJSON()
    
    
                        setFabrixTextJSON(fabricTextJson, text.id)
                    })
    
                    fabricImage.on("mouseup", (e) => {
    
                        const fabricTextJson = fabricImage.toJSON()
                        setFabrixTextJSON(fabricTextJson, text.id)
                    })
    
                    if (active === text.id) {
    
                        window.tempCanvas.setActiveObject(fabricImage);
    
    
    
    
                    }
                    window.tempCanvas.add(img1);
                });


            } else if (text.type === "text") {
                const tempFabrixText = new fabric.IText(text.text, s)


                const fabricText = new fabric.IText(text.text, { ...tempFabrixText })




                window.tempCanvas.add(fabricText);





                fabricText.on('mousedown', function (e) {
                    // e.target should be the circle
                    setActive(text.id);


                });


                fabricText.on("changed", (e) => {
                    const fabricTextJson = fabricText.toJSON()


                    setFabrixTextJSON(fabricTextJson, text.id)
                })

                fabricText.on("mouseup", (e) => {

                    const fabricTextJson = fabricText.toJSON()
                    setFabrixTextJSON(fabricTextJson, text.id)
                })

                if (active === text.id) {

                    window.tempCanvas.setActiveObject(fabricText);




                }

            }






        })


    }, [texts])
    const videoCanPlay = (video, canvas, context, w, h, tempCanvas) => {


        console.log("can")
        fired++;

        setOneSecond(w / video.duration)
        setDuration(video.duration)

        video.currentTime = 0;
        context.drawImage(video, 0, 0, w, h);
        videoContainer.current.append(canvas);
        videoContainer.current.append(tempCanvas);
    }
    const play = () => {

        if (isPlaying) {
            //puase
            video.pause()
            setIsPlaying(false)
        } else {
            //play
            video.play()
            setIsPlaying(true)
        }

        video.addEventListener('play', function () {
            var $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {

                    context.drawImage(video, 0, 0, w, h);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, 0);

        video.addEventListener('timeupdate', function () {

            document.getElementById("rang-progress").style.width = ((w / duration) * video.currentTime) + "px"
            setCurrentTime(video.currentTime)
        });

    }


    const timing_right_mousedown = (e, id) => {
        e.preventDefault();
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", resize);
        });

        function resize(e) {
            if (w - e.pageX + 200 <= 0) {
                return;
            }

            const timing = document.getElementById(`timing-${id}`);
            const time = document.getElementById(`time-${id}`);

            if (e.pageX - timing.getBoundingClientRect().left <= minwidth) return;

            timing.style.width = e.pageX - timing.getBoundingClientRect().left + "px";

            let to = (e.pageX - 200) / one_second;

            let _texts = texts.map((text) => {
                if (text.id === id) {
                    time.innerHTML =
                        new Date(text.from * 1000).toISOString().substring(14, 19) +
                        "---" +
                        new Date(to * 1000).toISOString().substring(14, 19);
                    return {
                        ...text,
                        to,
                    };
                }
                return text;
            });

            setTexts([..._texts])


        }
    }

    const timing_left_mousedown = (e, id, orignal_from, orignal_to) => {
        e.preventDefault();
        const timing = document.getElementById(`timing-${id}`);
        const time = document.getElementById(`time-${id}`);


        let original_width = parseFloat(
            getComputedStyle(timing, null).getPropertyValue("width").replace("px", "")
        );
        let original_x = timing.getBoundingClientRect().left;

        let original_mouse_x = e.pageX;

        let from = 0;
        let to = 3;

        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", () => {
            orignal_from = from;
            orignal_to = to;
            window.removeEventListener("mousemove", resize);
        });

        function resize(e) {
            if (e.pageX - original_mouse_x < 0) {
                return;
            }


            if (original_width - (e.pageX - original_mouse_x) <= minwidth) return;

            timing.style.width = original_width - (e.pageX - original_mouse_x) + "px";

            timing.style.left = ((e.pageX - original_mouse_x) + orignal_from * one_second) + "px";

            from = orignal_from + (e.pageX - original_mouse_x) / one_second;


            let _texts = texts.map((text) => {
                if (text.id === id) {
                    time.innerHTML =
                        new Date(from * 1000).toISOString().substring(14, 19) +
                        "---" +
                        new Date(text.to * 1000).toISOString().substring(14, 19);
                    return {
                        ...text,
                        from,
                    };
                }
                return text;
            });


            setTexts([..._texts])
        }

    }
    return (
        <div id='Video'>


            {file.filename && <div id='video-container' ref={videoContainer}>


                <div id='rang-container'>
                    <div id="rang">
                        <div id='rang-progress'></div>
                    </div>

                    <IconButton style={{ color: "white" }} onClick={play}>

                        {isPlaying ? <PauseIcon /> : <PlayIcon></PlayIcon>}

                    </IconButton>

                    <b>{moment.utc(currentTime * 1000).format("HH:mm:ss")} / {moment.utc(duration * 1000).format("HH:mm:ss")}</b>


                    <IconButton style={{ color: "white" }} onClick={download}>

                        <FileDownloadIcon />
                    </IconButton>
                </div>
            </div>}

            <div id="timeline">
                <div id="timeline-container">
                    {
                        texts.map((text, index) => {
                            return (
                                <div className="timing" id={`timing-${text.id}`} style={{
                                    width: one_second * (text.to - text.from),
                                    left: one_second * text.from,
                                    top: index * 54
                                }}>
                                    <div className="timing-left" onMouseDown={(event) => timing_left_mousedown(event, text.id, text.from, text.to)}>

                                    </div>

                                    <div className="time" id={`time-${text.id}`}>
                                        <span>
                                            {new Date(text.from * 1000).toISOString().substring(14, 19)}/{new Date(text.to * 1000).toISOString().substring(14, 19)}
                                        </span>
                                    </div>
                                    <div className="timing-right" onMouseDown={(event) => timing_right_mousedown(event, text.id)}></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Video

