const videosListDiv = document.getElementById("video-list");

function showVideosList() {
  fetch(`${baseUrl}/api/videos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const {videos} = result;
      videosListDiv.innerHTML = ""
      if(videos.length == 0){
        videosListDiv.innerHTML = "No Video Found please upload"
      }else{
        
        videos.map(file =>{
          const  videoItemContainer = document.createElement('div');
            const  video = document.createElement('video');
           
            video.setAttribute("src" , `${baseUrl}/api/videos/uploads/${file.filename}/${file.type.split("/")[1]}`)
           
            video.width = 200

            videoItemContainer.className = "video-item"

            if(localStorage.getItem("file")){
             if(JSON.parse( localStorage.getItem("file"))._id == file._id){
              videoItemContainer.className = "video-item-active"
             }
            }
            videoItemContainer.appendChild(video)
            videosListDiv.appendChild(videoItemContainer)


           // video.setAttribute("controls" , true)
          


           video.addEventListener("click" , async ()=>{
            // select
            document.getElementsByClassName('video-item-active')[0].className = "video-item"
            videoItemContainer.className = "video-item-active"
            localStorage.setItem("file" , JSON.stringify(file))
           await showFrame()

           })
















        })
      }
    });
}
