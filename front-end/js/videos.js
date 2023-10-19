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
        console.log(videos)
        videos.map(file =>{
            const  video = document.createElement('video');
           
            video.setAttribute("src" , `${baseUrl}/api/videos/uploads/${file.filename}/${file.type.split("/")[1]}`)
           
            video.width = 200
            videosListDiv.appendChild(video)

           // video.setAttribute("controls" , true)
          


           video.addEventListener("click" , ()=>{
            // select

            localStorage.setItem("file" , JSON.stringify(file))

           })
















        })
      }
    });
}
