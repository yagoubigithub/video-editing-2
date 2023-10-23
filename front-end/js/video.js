//elemnets

const dragContainer = document.getElementById("drag-container");
const videoContainer = document.getElementById("video-container");
const download_btn = document.getElementById("download_btn");
const theCanvas = document.createElement("canvas");
const theContext = theCanvas.getContext("2d");


const myRange = document.getElementById("myRange")
const play_btn =  document.getElementById("play-btn")

let toggele = 'pause'
let video, canvas, context;

//var

let precentageW, precentageH, w, h, scaleH, scaleW;
let fired = 0,
  from = 0,
  to = 3;

//font text
let font_size = 35;
let fontFamily = "Arial";
let color = "#ffffff";
let backgroundColor = "#ffffff00";

function init() {
   fired = 0,
  from = 0,
  to = 3;

//font text
 font_size = 35;
 fontFamily = "Arial";
 color = "#ffffff";
 backgroundColor = "#ffffff00";

}

async function showFrame() {
  if (!localStorage.getItem("file")) return;
  if(document.getElementById("video")){
    document.removeChild(document.getElementById("video"))
  }
  init()
  const file = JSON.parse(localStorage.getItem("file"));

  let videoUrl = `${baseUrl}/api/videos/uploads/${file.filename}/${
    file.type.split("/")[1]
  }`;
  let videoBlob = await fetch(videoUrl).then((r) => r.blob());
  let videoObjectUrl = URL.createObjectURL(videoBlob);
  video = document.createElement("video");
  video.src = videoObjectUrl;

  video.id="video"
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");

  video.addEventListener("canplay", videoCanPlay);

  myRange.value = 0
  video.currentTime = 0

  myRange.addEventListener("input", (event) => {
   
    video.currentTime = 1
   
    video.currentTime = parseInt(event.target.value)
    context.drawImage(video, 0, 0, w, h);
   
   
   
  })

  play_btn.addEventListener("click" , (ev)=>{
    if(toggele === 'pause'){
      video.play()
      toggele = 'play'
    }else{
      video.pause()
      toggele = 'pause'
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
    
     myRange.value = video.currentTime 
    });
   })

   canvas.addEventListener('click', (event) => clickCanvas(canvas, context, event.offsetX, event.offsetY))

   console.log("show")
}

async function videoCanPlay() {
  fired++;
  if (fired < 4) {
    console.log("fired");
    document.getElementById("splash-screen").style.display = "none";

    w = document.body.getBoundingClientRect().width - 450;
    h = document.body.getBoundingClientRect().height - 200;
    scaleW = video.videoWidth / w;
    scaleH = video.videoHeight / h;

    precentageW = (video.videoWidth / w) * 100;
    precentageH = (video.videoHeight / h) * 100;

    dragContainer.style.left = w / 2 - dragContainer.offsetWidth / 2 + "px";
    dragContainer.style.top = h / 2 - dragContainer.offsetHeight + "px";

    dragElement(dragContainer, w, h, print);
    canvas.width = w;
    canvas.height = h;

    theCanvas.width = video.videoWidth;
    theCanvas.height = video.videoHeight;

    myRange.max = video.duration;
    myRange.style.width = w + "px";

    video.currentTime = 1;
    video.currentTime = 0;

    one_second = w / video.duration;
    timing.style.width = one_second * 3 + "px";
    time.innerHTML =
      new Date(from * 1000).toISOString().substring(14, 19) +
      "---" +
      new Date(to * 1000).toISOString().substring(14, 19);

    duration = video.duration;
    context.drawImage(video, 0, 0, w, h);
    videoContainer.append(canvas);
    videoContainer.style.width = w + "px";
    videoContainer.style.height = h + "px";

    showText() 
  }
}

showFrame();
